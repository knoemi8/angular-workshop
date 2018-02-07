import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';

import { BooksService } from './../../services/books.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'books-component',
  template: `
    <div class="container" fxLayout="column" fxLayoutAlign="center center" >
      <button mat-raised-button routerLink="new">Add new</button>
      <div class="search">
        <mat-form-field class="example-full-width">
          <input matInput placeholder="Search books" #searchField>
        </mat-form-field>
      </div>
      <book-item
        *ngFor="let book of books$ | async"
        [book]="book"
        (saveComment)="handleCommentSave($event)"
        (deleteBook)="handleDeleteBook($event)"
      ></book-item>
    </div>
  `,
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books$: Observable<Book[]>;
  @ViewChild('searchField') searchField;

  constructor(private booksService: BooksService) {}

  loadBooks() {
    this.books$ = this.books$.merge(this.booksService.getBooks().first());
  }

  ngOnInit() {
    const keypress$ = Observable.fromEvent(
      this.searchField.nativeElement,
      'input',
    );
    const filter$ = keypress$
      .debounceTime(300)
      .map((event: any) => event.target.value)
      .mergeMap(searchTerm =>
        this.booksService.searchBooks(searchTerm).takeUntil(keypress$),
      );

    this.books$ = this.booksService
      .getBooks()
      .first()
      .merge(filter$);
  }

  handleCommentSave({ comment, bookId }) {
    this.booksService
      .saveComment(bookId, comment)
      .subscribe(data => this.loadBooks());
  }

  handleDeleteBook(bookId) {
    this.booksService.deleteBook(bookId).subscribe(data => this.loadBooks());
  }
}
