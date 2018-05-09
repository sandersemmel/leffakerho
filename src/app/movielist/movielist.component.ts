import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { IMovie } from '../Interfaces/IMovie';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
  providers: [MovieService]
})
export class MovielistComponent implements OnInit {
  private _movieService: MovieService;
  movies: IMovie[] = [];
  movie: IMovie;
  newMovie: IMovie;

  movieName: string = null;
  movieDetails: string = null;
  meetingDate: Date = null;
  movieId: number = null;

  selectedMovie: IMovie = null;
  update: number = 0;


  constructor(movieService: MovieService) {
    this._movieService = movieService;
  }

  ngOnInit(): void {
    this.getMovies();
  }
  getMovies(): void {
    this._movieService.getMovies().subscribe(movies => {
                                                        this.movies = movies;
                                                        })
  }
  refreshData(): void {
    this.getMovies();
  }
  createNewMovie() {
    this.newMovie = { Name: this.movieName, Details: this.movieDetails, MeetingDate: this.meetingDate, MovieID: this.movieId }
  }
  sendNewMovie() {
    this.createNewMovie();
    this._movieService.sendNewMovie(this.newMovie);
    this.refreshData();
  }
  editMovie(movie: IMovie): void {
    this.selectedMovie = movie;
  }
  updateMovie() {
    this._movieService.updateMovie(this.selectedMovie)
  }

}
