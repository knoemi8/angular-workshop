import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { BookActionTypes, LoadSuccess} from '../actions/books.action';
import { BooksService } from '../services/books.service';
import { switchMap, map} from 'rxjs/operators';
import { Book } from '../models/book.model';


@Injectable()
export class BookEffects {

  @Effect()
  loadBooks$: Observable<Action> = this.actions$.pipe(
    ofType(BookActionTypes.Load),
    switchMap(() =>
      this.booksService.getBooks().pipe(map((Books: Book[]) => new LoadSuccess(Books)))
    )
  );

  constructor(private actions$: Actions, private booksService: BooksService) {}
}

