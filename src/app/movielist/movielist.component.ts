import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { IMovie } from '../Interfaces/IMovie';
import { CurrentMovieService } from '../services/current-movie.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';


@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
  providers: [CurrentMovieService]
})
export class MovielistComponent implements OnInit {
  private _movieService: MovieService;
  private _currentMovieService: CurrentMovieService;
  private _spinner: Ng4LoadingSpinnerService;
  movies: IMovie[] = [];
  filteredMovies: IMovie[];
  movie: IMovie;
  newMovie: IMovie;
  currentMovie: IMovie;
  search: string = "";
  showSpinnerBoolean: boolean = false;

  selectedMovie: IMovie = null;
  selectedMovieID: number;


  constructor(movieService: MovieService, currentMovieService: CurrentMovieService, spinner: Ng4LoadingSpinnerService) {
    this._movieService = movieService;
    this._currentMovieService = currentMovieService;
    this._spinner = spinner;
  }

  ngOnInit(): void {
    this.getMovies();
    this.filterMovies()
  }
  ngDoCheck(){
    this.showSpinner();
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
    this._movieService.getSingleMovieById(movie.MovieID);
  }
  // TEST, REMOVE AFTER
  setCurrentMovie2(movie: IMovie){
    this._movieService.setCurrentMovie2(movie.MovieID);
  }
  filterMovies(){
    this.movies = this.movies.filter(movie=> movie.MovieName == "The Wizard Of Oz");
  }
  showSpinner(){
    if(this.movies.length == 0 ){
      this.showSpinnerBoolean = true;
      this._spinner.show();
    }else{
      this.showSpinnerBoolean = false;
      this._spinner.hide();
    }
  }
}
