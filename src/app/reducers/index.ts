

import * as fromMovies from '../../modules/movies/reducers/movies.reducer';
import * as fromBooks from '../../modules/books/reducers/books.reducer';

import { ActionReducerMap, combineReducers } from '@ngrx/store'


import { InjectionToken } from '@angular/core';

export interface State {
    app: {
        moviesState: fromMovies.State,
        booksState: fromBooks.State,
    }
}

export const reducers = combineReducers({
    movieReducer: fromMovies.reducer,
    bookReducer: fromBooks.reducer,
});

export const reducerToken = new InjectionToken<ActionReducerMap<State>>('Reducers');

export function getReducers() {
    return {
      app: reducers,
    };
}

export const reducerProvider = [
    { provide: reducerToken, useFactory: getReducers }
];

