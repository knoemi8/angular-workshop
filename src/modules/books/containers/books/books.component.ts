import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';

import { BooksService } from './../../services/books.service';
import { Book } from '../../models/book.model';
import * as fromBooks from '../../reducers';
import * as books from '../../actions/books.action';

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

  constructor(private store: Store<any>, private booksService: BooksService) {
    this.books$ = this.store.select(state => {
      return state.app.bookReducer.books;
    });
  }

  loadBooks() {
    this.books$ = this.books$.merge(this.booksService.getBooks().first());
  }

  ngOnInit() {
    this.store.dispatch(new books.Load());
    // const keypress$ = Observable.fromEvent(
    //   this.searchField.nativeElement,
    //   'input',
    // );
    // const filter$ = keypress$
    //   .debounceTime(300)
    //   .map((event: any) => event.target.value)
    //   .mergeMap(searchTerm =>
    //     this.booksService.searchBooks(searchTerm).takeUntil(keypress$),
    //   );

    // this.books$ = this.booksService
    //   .getBooks()
    //   .first()
    //   .merge(filter$);
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
