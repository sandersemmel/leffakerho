import { Component, OnInit } from '@angular/core';
import { IMovie } from '../Interfaces/IMovie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [MovieService]
})
export class MovieComponent implements OnInit {
  _movieService: MovieService;
  movies: IMovie[];
  movie: IMovie;

  constructor(movieService: MovieService) {
    this._movieService = movieService;
  }

  ngOnInit() {
    this._movieService.getMovies();
  }


}
