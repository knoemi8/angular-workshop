import {Component, Input, ViewChild} from '@angular/core';

import { MovieItemComponent } from '../components/movie-item/movie-item.component';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/movie.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/merge';

@Component({
  selector: 'movies-component',
  template: `
    <button mat-raised-button routerLink="new">Add new</button>
    <input placeholder="Search movies" #searchField>
    <movie-item
      *ngFor="let movie of movies$ | async"
        [movie]="movie"
        (saveComment)="handleCommentSave($event)"
        (deleteMovie)="handleDeleteMovie($event)">
    </movie-item>
    <div *ngIf="(movies$ | async)?.length==0">
      No movies found
    </div>
  `
})

export class MoviesComponent {
  movies$: Observable<Movie[]>;
  @ViewChild('searchField') searchField;

  constructor(private moviesService: MoviesService) {}

  loadMovies() {
    this.movies$ = this.movies$.merge(this.moviesService.getMovies().first());
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
        this.moviesService.searchMovies(searchTerm).takeUntil(keypress$),
      );

    this.movies$ = this.moviesService
      .getMovies()
      .first()
      .merge(filter$);
  }

  handleCommentSave({ comment, movieId }) {
    this.moviesService
      .saveComment(movieId, comment)
      .subscribe(data => this.loadMovies());
  }

  handleDeleteMovie(movieId) {
    this.moviesService.deleteMovie(movieId).subscribe(data => this.loadMovies());
  }
}
