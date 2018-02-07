import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

import { Book, parseGoogleBook } from '../models/book.model';

@Injectable()
export class BooksService {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>(this.apiUrl)
      .retry(3)
      .catch((error: any) => Observable.throw(error.json()));
  }

  getBook(bookId): Observable<Book> {
    if (!bookId) {
      return Observable.of({
        id: null,
        title: '',
        author: '',
        description: '',
        comment: '',
        poster: '',
      });
    }
    return this.http
      .get<Book>(`${this.apiUrl}/${bookId}`)
      .retry(3)
      .catch((error: any) => Observable.throw(error.json()));
  }

  createBook(book) {
    return this.http
      .post(`${this.apiUrl}`, book)
      .catch((error: any) => Observable.throw(error.json()));
  }

  updateBook(book) {
    return this.http
      .put(`${this.apiUrl}/${book.id}`, book)
      .catch((error: any) => Observable.throw(error.json()));
  }

  deleteBook(bookId) {
    return this.http
      .delete(`${this.apiUrl}/${bookId}`)
      .catch((error: any) => Observable.throw(error.json()));
  }

  saveComment(bookId: number, comment: string): Observable<any> {
    return this.http
      .patch(`${this.apiUrl}/${bookId}`, { comment })
      .catch((error: any) => Observable.throw(error.json()));
  }

  // filterBooks(filterTerm) {
  //   if (!filterTerm || filterTerm === '') {
  //     return this.getBooks();
  //   }
  //   return this.books.filter(book => book.title.toLowerCase().includes(filterTerm.toLowerCase()));
  // }

  searchBooks(searchTerm): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?q=${searchTerm}`);
  }

  getGoogleBook(bookId) {
    const googleApiUrl = 'https://www.googleapis.com/books/v1/volumes';
    return this.http
      .get(`${googleApiUrl}/${bookId}`)
      .map(parseGoogleBook)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
