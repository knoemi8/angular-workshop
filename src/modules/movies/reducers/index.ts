import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromMovies from './movies.reducer';


export interface MoviesState {
  fromMovies: fromMovies.State;
}

export interface State {
  movies: MoviesState;
}

export const reducers = {
  movies: fromMovies.reducer
};


export const getMoviesState = createFeatureSelector<MoviesState>('movies');


export const getmoviesEntitiesState = createSelector(
  getMoviesState,
  state => this.movies.movies
);

export const getCollectionState = createSelector(
  getMoviesState,
  (state: MoviesState) => state.fromMovies
);




