import { Component } from '@angular/core';

@Component({
  selector: 'book-details',
  template: `
    <div class="book-details">
      <mat-tab-group class="demo-tab-group">
        <mat-tab label="Template driven form">
          <book-form-template></book-form-template>
        </mat-tab>
        <mat-tab label="Reactive form">
          <book-form-reactive></book-form-reactive>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styleUrls: ['book-detail.component.css'],
})
export class BookDetailsComponent {}
