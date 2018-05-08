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
  refreshData() {
    this.getMovies();
  }

}
