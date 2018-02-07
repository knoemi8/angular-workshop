import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../app/material.module';
import { MovieItemComponent } from './components/movie-item/movie-item.component';
import { MovieRatingComponent } from './components/movie-rating/movie-rating.component';
import { MoviesComponent } from './containers/movies.component';

import * as fromPipes from './pipes';
import * as fromServices from './services';

import { Routes, RouterModule } from '@angular/router';
export const ROUTES: Routes = [
  {
    path: 'movies',
    component: MoviesComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [],
  declarations: [MovieItemComponent, MoviesComponent, MovieRatingComponent, ...fromPipes.pipes],
  providers: [...fromServices.services],
})
export class MoviesModule {}
