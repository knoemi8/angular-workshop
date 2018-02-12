import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../../app/material.module';
import { BookEffects } from './effects/books.effect';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromDirectives from './directives';
import * as fromPipes from './pipes';
import * as fromServices from './services';

import { reducers } from './reducers';

export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.BooksComponent,
  },
  {
    path: 'new',
    component: fromContainers.BookDetailsComponent,
  },
  {
    path: ':id',
    component: fromContainers.BookDetailsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forFeature('booksFeatureState', reducers),
    EffectsModule.forFeature([BookEffects]),
  ],
  exports: [...fromContainers.containers],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    ...fromDirectives.directives,
    ...fromPipes.pipes,
  ],
  providers: [...fromServices.services],
})
export class BooksModule {}
