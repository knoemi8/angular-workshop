import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

import { AppComponent } from './containers/app/app.component';
import { HomeModule } from '../modules/home/home.module';
import { HomeComponent } from '../modules/home/containers';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'books',
    loadChildren: '../modules/books/books.module#BooksModule',
  },

  {
    path: 'movies',
    loadChildren: '../modules/movies/movies.module#MoviesModule',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HomeModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
