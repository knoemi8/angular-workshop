import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { MoviesService } from './../../services/movies.service';
import { Movie } from '../../models/movie.model';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'movie-form-template',
  templateUrl: './movie-form-template.component.html',
  styleUrls: ['./movie-form-template.component.css'],
})
export class MovieFormTemplateComponent implements OnInit {
  private descriptionWordLength = 4;
  movieModel: Movie;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService,
  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.moviesService.getMovie(params.get('id')).first(),
      )
      .first()
      .subscribe(movie => (this.movieModel = movie));
  }

  onSubmit() {
    if (this.movieModel.id) {
      this.moviesService
        .updateMovie(this.movieModel)
        .first()
        .subscribe(this.goBack);
    } else {
      this.moviesService
        .createMovie(this.movieModel)
        .first()
        .subscribe(this.goBack);
    }
  }

  goBack = () => {
    this.router.navigate(['/movies']);
  }
}
