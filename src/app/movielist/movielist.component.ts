import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { IMovie } from '../Interfaces/IMovie';
import { CurrentMovieService } from '../services/current-movie.service';


@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
  providers: [MovieService, CurrentMovieService]
})
export class MovielistComponent implements OnInit {
  private _movieService: MovieService;
  private _currentMovieService: CurrentMovieService;
  movies: IMovie[] = [];
  filteredMovies: IMovie[];
  movie: IMovie;
  newMovie: IMovie;
  currentMovie: IMovie;

  selectedMovie: IMovie = null;
  selectedMovieID: number;


  constructor(movieService: MovieService, currentMovieService: CurrentMovieService) {
    this._movieService = movieService;
    this._currentMovieService = currentMovieService;
  }

  ngOnInit(): void {
    this.getMovies();
  }
  getMovies(): void {
    this._movieService.getMovies().subscribe(value => this.movies = value );
  }
  refreshData(): void {
    this.getMovies();
  }
  editMovie(movie: IMovie): void {
    this.selectedMovie = movie;
  }
  setCurrentMovie(movie: IMovie){
    this._currentMovieService.setCurrentMovie(movie);
  }
  setMessage(){
    this._currentMovieService.setCurrentMessage("Message");
  }
}
