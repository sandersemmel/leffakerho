import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { IMovie } from '../Interfaces/IMovie';
import { CurrentMovieService } from '../services/current-movie.service';
import { Observable } from 'rxjs/Observable';
import { MovieService } from '../services/movie.service';


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

  constructor(currentMovieService: CurrentMovieService, movieService: MovieService) {
    this._currentMovieService = currentMovieService;
    this._movieService = movieService;
  }

  ngOnInit() {
    this.getMovie();
  }
  getMovie() {
    this._movieService.getSingleMovieById(3).subscribe(value => this.movie = value);
    console.log(this.movie);
  }
}
