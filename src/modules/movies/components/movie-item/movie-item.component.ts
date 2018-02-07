import {Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'movie-item',
  template: `
    <mat-card class="movie-item">
      <mat-card-header>
        <mat-card-title>
          {{title}} <span class="movie-year">({{year}})</span>
        </mat-card-title>
        <mat-card-subtitle>
          {{genre}}
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content fxLayout="row" class="details">
        <div fxFlex="30">
          <img src="{{poster}}" imageFallback="assets/noImage2.png">
        </div>
        <div fxFlex="70">
          {{plot}}
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
        <button mat-raised-button color="warn" (click)="handleDeleteMovie(id)">Delete</button>
    </mat-card>
  `,
  styleUrls: ['./movie-item.component.css'],
})

export class MovieItemComponent implements OnChanges {
  @Input() id: number;
  @Input() title: string;
  @Input() year: number;
  @Input() genre: string;
  @Input() plot: string;
  @Input() poster: string;
  @Input() comment: string;

  private movieComment;
  private commentSaved;

  @Output() saveComment = new EventEmitter<{ movieId: number; comment: string }>();
  @Output() deleteMovie = new EventEmitter<number>();

  ngOnChanges(changes) {
    this.movieComment = changes.comment && changes.comment.currentValue;
    this.commentSaved = this.movieComment && this.movieComment.length > 0;
  }

  handleDeleteMovie(movieId) {
    console.log(movieId);
    this.deleteMovie.emit(movieId);
  }

  toggleComment() {
    if (this.commentSaved) {
      this.commentSaved = false;
    } else {
      this.saveComment.emit({
        movieId: this.id,
        comment: this.movieComment,
      });

      this.commentSaved = true;
    }
  }

   // saveEditComment (e, index) {
   //   if(!this.movies[index].commentSaved) {
   //     this.movies[index].commentSaved = true;
   //   }
   //   else {
   //     this.movies[index].commentSaved = false;
   //   }
   // }

   // countWords (str) {
   //   if(str !== ''){
   //     return str.trim().split(/\s+/).length;
   //   }
   //   else return 0;
   // }

}
