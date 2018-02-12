import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Movie } from '../models/movie.model';
import { MoviesActions, MovieActionTypes } from '../actions/movies.action';



export const adapter: EntityAdapter<Movie> = createEntityAdapter<Movie>({
  selectId: (movie: Movie) => movie.id,
  sortComparer: false,
});

export function reducer(
  state = [],
  action: MoviesActions
): State {
  switch (action.type) {

    case MovieActionTypes.LoadSuccess: {
      return action.payload
    }

    default: {
      return state;
    }
  }
}

