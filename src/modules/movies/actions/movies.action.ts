import { Action } from '@ngrx/store';
import { Movie } from '../models/movie.model';

export enum MovieActionTypes {
  Load = '[Movie] Load',
  LoadSuccess = '[Movie] LoadSuccess',
}

export class Load implements Action {
  readonly type = MovieActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = MovieActionTypes.LoadSuccess;

  constructor(public payload: any) {}
}

export type MoviesActions = Load | LoadSuccess;
