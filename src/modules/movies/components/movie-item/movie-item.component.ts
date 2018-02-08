import {Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'movie-item',
  template: `
    <mat-card class="movie-item">
      <mat-card-header>
        <mat-card-title>
          {{movie.title}} <span class="movie-year">({{movie.year}})</span>
        </mat-card-title>
        <mat-card-subtitle>
          {{movie.genre}}
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content fxLayout="row" class="details">
        <div fxFlex="30">
          <img src="{{movie.poster}}" imageFallback="assets/noImage2.png">
        </div>
        <div fxFlex="70">
          {{movie.plot}}
        </div>
      </mat-card-content>
      <div *ngIf="!commentSaved" class="form">
          <mat-form-field>
            <textarea
              [(ngModel)]="movieComment"
              placeholder="Comment"
              matInput
              matTextareaAutosize
              matAutosizeMinRows="1"
              matAutosizeMaxRows="4"
            ></textarea>
          </mat-form-field>
          <br />
          <span [ngStyle]="{color: movieComment.length === 0 ? 'firebrick' : 'lightseagreen'}">
            {{movieComment | wordCount: 'words'}}
          </span>
        </div>
        <div *ngIf="commentSaved">
          <p>
            Comment:
          </p>
          <p class="comment">
            {{movieComment}}
          </p>
        </div>
        <br />
        <button (click)="toggleComment()" [disabled]="movieComment.length===0" mat-raised-button>
          {{commentSaved ? 'Edit Comment' : 'Save Comment'}}
        </button>
        <p class="comment">Rating:</p>
        <movie-rating [(rating)]="movieRating"></movie-rating>
        <button mat-raised-button color="primary" [routerLink]="['./', movie.id]">Edit</button>
        <button mat-raised-button color="warn" (click)="handleDeleteMovie(movie.id)">Delete</button>
    </mat-card>
  `,
  styleUrls: ['./movie-item.component.css'],
})

export class MovieItemComponent implements OnChanges {
  @Input() movie: Movie;

  @Output() saveComment = new EventEmitter<{ movieId: number; comment: string }>();
  @Output() deleteMovie = new EventEmitter<number>();

  private commentSaved = false;
  private movieRating = 2;
  private movieComment: string;

  ngOnChanges(changes) {
    this.movieComment = changes.movie && changes.movie.currentValue.comment;
    this.commentSaved = this.movieComment && this.movieComment.length > 0;
  }

  toggleComment() {
    if (this.commentSaved) {
      this.commentSaved = false;
    } else {
      this.saveComment.emit({
        movieId: this.movie.id,
        comment: this.movieComment,
      });
    }
  }

  handleDeleteMovie(movieId) {
    this.deleteMovie.emit(movieId);
  }
}
