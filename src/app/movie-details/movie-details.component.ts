import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { IMovie } from '../Interfaces/IMovie';
import { CurrentMovieService } from '../services/current-movie.service';
import { Observable } from 'rxjs/Observable';
import { MovieService } from '../services/movie.service';
import { IMovieReviewDetails } from '../Interfaces/IMovieReviewDetails';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers: [MovieService,CurrentMovieService]
})
export class MovieDetailsComponent implements OnInit {
  private _currentMovieService: CurrentMovieService;
  private _movieService: MovieService;
  movie: IMovie;
  movieReviews: IMovieReviewDetails[] = [];
  movieReview: IMovieReviewDetails;
  selectedMovie: number;

  constructor(currentMovieService: CurrentMovieService, movieService: MovieService) {
    this._currentMovieService = currentMovieService;
    this._movieService = movieService;
  }

  ngOnInit() {
    this.getSelectedMovie();
    this.getMovie(this.selectedMovie);
    this.getMovieReviews(this.selectedMovie);
  }
  getMovie(selectedMovie: number) {
    this._movieService.getSingleMovieById(selectedMovie).subscribe(value => this.movie = value);
    console.log(this.movie);
  }
  getMovieReviews(selectedMovie: number) {
    this._movieService.getMovieReviewsByMovieID(selectedMovie).subscribe(value => this.movieReviews = value);
  }
  getSelectedMovie() {
    this.selectedMovie = this._movieService.getSelectedMovie();
  }
}
