import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'book-rating',
  template: `
    <div class="book-rating">
      <mat-icon
        *ngFor="let star of starStates;let starIndex=index"
        [ngClass]="{'filled-star': star}"
        (click)="handleClick(starIndex)"
      >
        star
      </mat-icon>
    </div>
  `,
  styleUrls: ['./book-rating.component.css'],
})
export class BookRatingComponent implements OnInit, OnChanges {
  starStates: boolean[];
  private starRating = 1;

  @Input()
  get rating() {
    return this.starStates;
  }
  set rating(newRating: any) {
    this.starRating = parseInt(newRating, 10);
  }
  @Output() ratingChange = new EventEmitter();

  ngOnInit() {
    this.updateRating();
  }

  ngOnChanges(changes) {
    this.updateRating();
  }

  handleClick(newRating) {
    this.ratingChange.emit(newRating);
  }

  updateRating() {
    this.starStates = Array.from({ length: 5 }).map(
      (state, index) => index < this.starRating + 1,
    );
  }
}
