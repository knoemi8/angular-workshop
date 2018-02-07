import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { BooksService } from './../../services/books.service';
import { Book } from './../../models/book.model';

@Component({
  selector: 'book-form-reactive',
  template: `
  <div class="book-form" fxLayout="column">
    <mat-card>
      <form novalidate [formGroup]="bookForm" (ngSubmit)="onSubmit(bookForm)">
        <mat-card-title>
          Book Form
        </mat-card-title>
        <mat-card-content fxLayout="row">
          <div fxFlex="70">
            <mat-form-field>
              <input matInput placeholder="Title" formControlName="title">
              <mat-error *ngIf="bookForm.get('title').invalid">Title required</mat-error>
            </mat-form-field>
            <mat-form-field>
              <input matInput placeholder="Author" formControlName="author">
              <mat-error *ngIf="bookForm.get('author').invalid">Author required</mat-error>
            </mat-form-field>
            <mat-form-field>
              <textarea  matInput formControlName="description" placeholder="Description (at least {{descriptionWordLength}} words)">
              </textarea>
              <mat-error *ngIf="bookForm.get('description').errors?.required">Description required</mat-error>
              <mat-error *ngIf="bookForm.get('description').errors?.minDescriptionWords">Description needs at least {{descriptionWordLength}} words</mat-error>
            </mat-form-field>
            <mat-form-field>
              <input matInput formControlName="poster" placeholder="Poster">
            </mat-form-field>
          </div>
          <div class="previewImage" fxFlex="30" style="text-align: center;">
            <img [src]="bookForm.get('poster').value" imageFallback="assets/noImage2.png">
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button type="submit" color="primary" [disabled]="bookForm.invalid">Save</button>
          <button mat-raised-button [routerLink]="['../']">Cancel</button>
        </mat-card-actions>
      </form>
    </mat-card>
    <br>
    <br>
    <mat-card>
      <mat-card-title>
        Google books metadata lookup
      </mat-card-title>
      <mat-card-content>
        <form novalidate [formGroup]="searchForm" (ngSubmit)="doSearch(searchForm);searchForm.reset();">
          <mat-form-field>
            <input matInput placeholder="Google Book Id" formControlName="googleBookId">
          </mat-form-field>
          <button mat-raised-button type="submit" color="primary" [disabled]="searchForm.invalid">Search</button>
        </form>
      </mat-card-content>
    </mat-card>
  </div>
  `,
  styleUrls: ['./book-form-reactive.component.css'],
})
export class BookFormReactiveComponent implements OnInit {
  bookForm: FormGroup;
  searchForm: FormGroup;
  bookId;
  descriptionWordLength = 4;

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: [
        '',
        [
          Validators.required,
          this.descriptionLengthValidator(this.descriptionWordLength),
        ],
      ],
      poster: '',
    });
    this.searchForm = this.fb.group({
      googleBookId: ['', Validators.required],
    });
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.booksService.getBook(params.get('id')).first(),
      )
      .subscribe(({ id, title, author, description, poster }) => {
        this.bookForm.setValue({ title, author, description, poster });
        this.bookId = id;
      });
  }

  onSubmit({ value }) {
    console.log(value);
    if (this.bookId) {
      this.booksService
        .updateBook(this.formatBook({ id: this.bookId, ...value }))
        .first()
        .subscribe(this.goBack);
    } else {
      this.booksService
        .createBook(this.formatBook(value))
        .first()
        .subscribe(this.goBack);
    }
  }

  formatBook(bookInfo): Book {
    return {
      id: bookInfo.id,
      comment: '',
      ...bookInfo,
    };
  }

  doSearch({ value }) {
    this.booksService
      .getGoogleBook(value.googleBookId)
      .first()
      .subscribe(({ title, author, description, poster }) =>
        this.bookForm.setValue({ title, author, description, poster }),
      );
  }

  goBack = () => {
    this.router.navigate(['/books']);
  };

  descriptionLengthValidator(minWords: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let wordCount = 0;
      if (control && control.value) {
        wordCount = control.value
          .trim()
          .replace(/  +/g, ' ')
          .split(' ').length;
      }
      return wordCount < minWords ? { minDescriptionWords: true } : null;
    };
  }

  sameAsValidator(sameAs: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return control.value !== sameAs ? { sameAs: true } : null;
    };
  }
}
