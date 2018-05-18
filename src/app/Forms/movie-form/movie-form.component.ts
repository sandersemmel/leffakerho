import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IMovie } from '../../Interfaces/IMovie';
import { NgForm } from '@angular/forms';
import { IPerson } from '../../Interfaces/IPerson';


@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css'],
  providers: [MovieService]
})
export class MovieFormComponent implements OnInit {
  private _movieService: MovieService;
  movie: IMovie = { MovieName: '', MovieID: null, AmountOfRatings: null, BroughtBy: null,Director: '', Rating: null, RatingSum: null };
  submitted: boolean = false;
  people: IPerson[] = [];
  selectedPerson: IPerson;
  
  constructor(movieService: MovieService) {
    this._movieService = movieService;
  }
  ngOnInit() {
    this.getPersonList();
  }
  sendNewMovie(movieForm: NgForm): void {

    this.movie = {
      MovieID: null,
      AmountOfRatings: null,
      MovieName: movieForm.value.movieName,
      BroughtBy: movieForm.value.person,
      Director: '',
      Rating: null,
      RatingSum: null
    }
    this._movieService.sendNewMovie(this.movie);
  }
  submitMovie(movieForm: NgForm): void {
    this.sendNewMovie(movieForm);
    this.submitted = true;
    movieForm.reset();
  }
  getPersonList() {
    this._movieService.getPersonList().subscribe((value) => this.people = value);
    console.log(this.people);
  }
}
