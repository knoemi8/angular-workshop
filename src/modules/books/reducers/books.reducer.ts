import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Book } from '../models/book.model';
import { BooksActions, BookActionTypes } from '../actions/books.action';

export interface State {
  loaded: boolean;
  loading: boolean;
  books: Book[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  books: [],
};



export function reducer(
  state = initialState,
  action: BooksActions
): State {
  switch (action.type) {
    case BookActionTypes.Load: {
      return {
        loaded: false,
        loading: true,
        books: [],
      };
    }

    case BookActionTypes.LoadSuccess: {
      return {
        loaded: true,
        loading: false,
        books: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getBooks = (state: State) => state.books;
