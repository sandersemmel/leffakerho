import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovie } from '../../Interfaces/IMovie';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
  providers: [MovieService]
})
export class MovieFormComponent implements OnInit {
  private _movieService: MovieService;
  movie: IMovie = { Name: '', Details: '', MeetingDate: null, MovieID: null };
  submitted: boolean = false;
 


  constructor(movieService: MovieService) {
    this._movieService = movieService;
  }
  ngOnInit() {
  }
  sendNewMovie(): void {
    this._movieService.sendNewMovie(this.movie);
    this.submitted = true;
  }
  submitMovie(movieForm: NgForm): void {
    console.log(NgForm);
  }
}
