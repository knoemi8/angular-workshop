import {
  Component,
  Input,
  Output,
  OnChanges,
  EventEmitter,
} from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
  selector: 'book-item',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>
          {{book.title}}
        </mat-card-title>
        <mat-card-subtitle>
          by {{book.author}}
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content fxLayout="row" class="details">
        <div fxFlex="30">
          <img [src]="book.poster" imageFallback="assets/noImage2.png">
        </div>
        <div fxFlex="70">
          {{book.description}}
        </div>
      </mat-card-content>
      <mat-card-content>
        <p class="comment">Rating:</p>
        <book-rating [(rating)]="bookRating"></book-rating>
        <div *ngIf="!commentSaved" class="form">
          <mat-form-field>
            <textarea
              [(ngModel)]="bookComment"
              placeholder="Comment"
              matInput
              matTextareaAutosize
              matAutosizeMinRows="1"
              matAutosizeMaxRows="4"
            ></textarea>
          </mat-form-field>
          <br />
          <span [ngStyle]="{color: bookComment.length === 0 ? 'firebrick' : 'lightseagreen'}">
            {{bookComment | wordCount: 'words'}}
          </span>
        </div>
        <div *ngIf="commentSaved">
          <p>
            Comment:
          </p>
          <p class="comment">
            {{bookComment}}
          </p>
        </div>
        <br />
        <button (click)="toggleComment()" [disabled]="bookComment.length===0" mat-raised-button>
          {{commentSaved ? 'Edit Comment' : 'Save Comment'}}
        </button>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" [routerLink]="['./', book.id]">Edit</button>
        <button mat-raised-button color="warn" (click)="handleDeleteBook(book.id)">Delete</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./book-item.component.css'],
})
export class BookItemComponent implements OnChanges {
  @Input() book: Book;

  @Output()
  saveComment = new EventEmitter<{ bookId: number; comment: string }>();
  @Output() deleteBook = new EventEmitter<number>();

  private commentSaved = false;
  private bookRating = 2;
  private bookComment: string;

  ngOnChanges(changes) {
    this.bookComment = changes.book && changes.book.currentValue.comment;
    this.commentSaved = this.bookComment && this.bookComment.length > 0;
  }

  toggleComment() {
    if (this.commentSaved) {
      this.commentSaved = false;
    } else {
      this.saveComment.emit({
        bookId: this.book.id,
        comment: this.bookComment,
      });
    }
  }

  handleDeleteBook(bookId) {
    this.deleteBook.emit(bookId);
  }
}
