import { Action } from '@ngrx/store';
import { Book } from '../models/book.model';

export enum BookActionTypes {
  Load = '[Book] Load',
  LoadSuccess = '[Book] LoadSuccess',
}

export class Load implements Action {
  readonly type = BookActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = BookActionTypes.LoadSuccess;

  constructor(public payload: Book[]) {}
}

export type BooksActions = Load | LoadSuccess;

