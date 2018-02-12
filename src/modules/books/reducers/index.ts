import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromBooks from './books.reducer';


export interface BooksState {
  fromBooks: fromBooks.State;
}

export interface State {
  books: BooksState;
}

export const reducers = {
  books: fromBooks.reducer
};


export const getBooksState = createFeatureSelector<BooksState>('books');


export const getbooksEntitiesState = createSelector(
  getBooksState,
  state => this.books.books
);

export const getCollectionState = createSelector(
  getBooksState,
  (state: BooksState) => state.fromBooks
);




