import {Component, Input} from '@angular/core';

import { MovieItemComponent } from '../components/movie-item/movie-item.component';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'movies-component',
  template: `
    <movie-item *ngFor="let movie of movies; let i = index"
      [id]= i
      [title]="movie.title"
      [year]="movie.year"
      [genre]="movie.genre"
      [plot]="movie.plot"
      [poster]="movie.poster"
      [comment]="movie.comment"
      (deleteMovie)="handleDeleteMovie($event)">
    </movie-item>
  `
})

export class MoviesComponent {
  private movies;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.movies = this.moviesService.getMovies();
  }

  handleCommentSave({ comment, movieId }) {
    this.movies[movieId].comment = comment;
  }

  handleDeleteMovie(movieId) {
    console.log('in movie component');
    this.moviesService.deleteMovie(movieId);
    this.movies = this.moviesService.getMovies();
  }
}
