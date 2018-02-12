import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { MovieActionTypes, LoadSuccess} from '../actions/movies.action';
import { MoviesService } from '../services/movies.service';
import { switchMap, map} from 'rxjs/operators';
import { Movie } from '../models/movie.model';
import * as fromMovies from '../services/movies.service';

@Injectable()
export class MovieEffects {

  @Effect()
  loadMovies$: Observable<Action> = this.actions$.pipe(
    ofType(MovieActionTypes.Load),
    switchMap(() =>
      this.moviesService.getMovies().pipe(map((movies: Movie[]) => new LoadSuccess(movies)))
    )
  );

  constructor(private actions$: Actions, private moviesService: MoviesService) {}
}

