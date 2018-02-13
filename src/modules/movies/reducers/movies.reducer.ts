import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Movie } from '../models/movie.model';
import { MoviesActions, MovieActionTypes } from '../actions/movies.action';

export interface State {
  loaded: boolean;
  loading: boolean;
  movies: Movie[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  movies: [],
};



export function reducer(
  state = initialState,
  action: MoviesActions
): State {
  switch (action.type) {
    case MovieActionTypes.Load: {
      return {
        loaded: false,
        loading: true,
        movies: [],
      };
    }

    case MovieActionTypes.LoadSuccess: {
      return {
        loaded: true,
        loading: false,
        movies: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

