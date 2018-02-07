import { Injectable } from '@angular/core';

import { Movie } from '../models/movie.model';

@Injectable()
export class MoviesService {
  private movies = [
    {
      id: 0,
      title: 'Star Wars: The Last Jedi',
      year: 2017,
      genre: 'Action, Adventure, Fantasy',
      plot: 'Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.',
      poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ1MzcxNjg4N15BMl5BanBnXkFtZTgwNzgwMjY4MzI@._V1_SX300.jpg',
      comment: 'Movie comment 1',
      commentSaved: false
    },
    {
      id: 1,
      title: 'Black Swan',
      year: 2010,
      genre: 'Drama, Thriller',
      plot: 'A committed dancer wins the lead role in a production of Tchaikovskys \"Swan Lake\" only to find herself struggling to maintain her sanity.',
      poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNzY2NzI4OTE5MF5BMl5BanBnXkFtZTcwMjMyNDY4Mw@@._V1_SX300.jpg',
      comment: 'Movie comment 2',
      commentSaved: false
    },
    {
      id: 2,
      title: 'Fight Club',
      year: 1999,
      genre: 'Drama',
      plot: 'An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soapmaker, forming an underground fight club that evolves into something much, much more.',
      poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMzFjMWNhYzQtYTIxNC00ZWQ1LThiOTItNWQyZmMxNDYyMjA5XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
      comment: 'Movie comment 3',
      commentSaved: false
    },
    {
      id: 3,
      title: 'The Godfather: Part II',
      year: 1974,
      genre: 'Crime, Drama',
      plot: 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
      poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjZiNzIxNTQtNDc5Zi00YWY1LThkMTctMDgzYjY4YjI1YmQyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
      comment: 'Movie comment 4',
      commentSaved: false
    }
  ];

  getMovies() {
    return this.movies;
  }

  deleteMovie(movieId) {
    let  moviesArray = this.movies;
    console.log(movieId);
    console.log(moviesArray.splice(movieId, 1));
    this.movies = moviesArray;
    console.log('in service');
  }
}
