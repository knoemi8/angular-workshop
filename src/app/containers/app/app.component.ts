import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <mat-toolbar color="primary">
    <button (click)="sidenav.toggle()" mat-mini-fab>
      <mat-icon>menu</mat-icon>
    </button>
    <span>
      {{title}}
    </span>
  </mat-toolbar>
  <mat-sidenav-container>
  <mat-sidenav #sidenav mode="side" class="app-sidenav">
    <nav>
      <a mat-button
        class="nav-link"
        *ngFor="let link of links"
        [routerLink]="link.path"
        routerLinkActive="active"
        (click)="sidenav.toggle()"
      >
        <mat-icon>{{link.icon}}</mat-icon>
        {{link.label}}
      </a>
    </nav>
  </mat-sidenav>

  <div class="app-content">
    <router-outlet></router-outlet>
  </div>
</mat-sidenav-container>


`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'NgInventory';
  links = [
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/books', icon: 'import_contacts', label: 'Books' },
    { path: '/movies', icon: 'theaters', label: 'Movies' },
  ];
}
