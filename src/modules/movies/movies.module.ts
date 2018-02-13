import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from './../../app/material.module';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieRatingComponent } from './components/movie-rating/movie-rating.component';
import { MoviesComponent } from './containers/movies.component';
import { MovieDetailsComponent } from './containers/movie-detail/movie-detail.component';
import { MovieFormTemplateComponent } from './components/movie-form-template/movie-form-template.component';
import { MovieEffects } from './effects/movies.effect';
import * as fromPipes from './pipes';
import * as fromServices from './services';

import { reducers } from './reducers';

import { Routes, RouterModule } from '@angular/router';
export const ROUTES: Routes = [
  {
    path: '',
    component: MoviesComponent,
  },
  {
    path: 'new',
    component: MovieDetailsComponent,
  },
  {
    path: ':id',
    component: MovieDetailsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(ROUTES),

    EffectsModule.forFeature([MovieEffects]),
  ],
  exports: [],
  declarations: [MovieItemComponent, MoviesComponent, MovieRatingComponent, MovieDetailsComponent, MovieFormTemplateComponent, ...fromPipes.pipes],
  providers: [...fromServices.services],
})
export class MoviesModule {}
