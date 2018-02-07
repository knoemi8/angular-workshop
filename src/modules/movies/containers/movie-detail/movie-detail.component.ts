import { Component } from '@angular/core';

@Component({
  selector: 'movie-details',
  template: `
    <button mat-raised-button [routerLink]="['../']">Back</button>
    <div class="movie-details">
      <mat-tab-group class="demo-tab-group">
        <mat-tab label="Template driven form">
          <movie-form-template></movie-form-template>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
})
export class MovieDetailsComponent {}
