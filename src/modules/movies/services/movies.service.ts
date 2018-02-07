import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

import { Movie } from '../models/movie.model';

@Injectable()
export class MoviesService {
  private apiUrl = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(this.apiUrl)
      .retry(3)
      .catch((error: any) => Observable.throw(error.json()));
  }

  getMovie(movieId): Observable<Movie> {
    if (!movieId) {
      return Observable.of({
        id: null,
        title: '',
        year: null,
        genre: '',
        plot: '',
        comment: '',
        poster: ''
      });
    }
    return this.http
      .get<Movie>(`${this.apiUrl}/${movieId}`)
      .retry(3)
      .catch((error: any) => Observable.throw(error.json()));
  }

  createMovie(movie) {
    return this.http
      .post(`${this.apiUrl}`, movie)
      .catch((error: any) => Observable.throw(error.json()));
  }

  updateMovie(movie) {
    return this.http
      .put(`${this.apiUrl}/${movie.id}`, movie)
      .catch((error: any) => Observable.throw(error.json()));
  }


  deleteMovie(movieId) {
    return this.http
      .delete(`${this.apiUrl}/${movieId}`)
      .catch((error: any) => Observable.throw(error.json()));
  }

  saveComment(movieId: number, comment: string): Observable<any> {
    return this.http
      .patch(`${this.apiUrl}/${movieId}`, { comment })
      .catch((error: any) => Observable.throw(error.json()));
  }

  searchMovies(searchTerm): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}?q=${searchTerm}`);
  }
}
