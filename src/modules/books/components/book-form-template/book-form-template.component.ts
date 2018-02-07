import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { BooksService } from './../../services/books.service';
import { Book } from '../../models/book.model';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'book-form-template',
  templateUrl: './book-form-template.component.html',
  styleUrls: ['./book-form-template.component.css'],
})
export class BookFormTemplateComponent implements OnInit {
  private descriptionWordLength = 4;
  bookModel: Book;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.booksService.getBook(params.get('id')).first(),
      )
      .first()
      .subscribe(book => (this.bookModel = book));
  }

  onSubmit() {
    if (this.bookModel.id) {
      this.booksService
        .updateBook(this.bookModel)
        .first()
        .subscribe(this.goBack);
    } else {
      this.booksService
        .createBook(this.bookModel)
        .first()
        .subscribe(this.goBack);
    }
  }

  doSearch({ controls }) {
    this.booksService
      .getGoogleBook(controls.bookId.value)
      .first()
      .subscribe(book => (this.bookModel = book));
  }

  goBack = () => {
    this.router.navigate(['/books']);
  };
}
