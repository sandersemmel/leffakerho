import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { IMovie } from '../Interfaces/IMovie';
import { CurrentMovieService } from '../services/current-movie.service';
import { Observable } from 'rxjs/Observable';
import { MovieService } from '../services/movie.service';
import { IMovieReviewDetails } from '../Interfaces/IMovieReviewDetails';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { IPerson } from '../Interfaces/IPerson';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers: [CurrentMovieService, FormBuilder]
})
export class MovieDetailsComponent implements OnInit {
  private _currentMovieService: CurrentMovieService;
  private _movieService: MovieService;
  people: IPerson[];
  movie: IMovie;
  movieReviews: IMovieReviewDetails[] = [];
  movieReview: IMovieReviewDetails;
  selectedMovie: number;
  shownMovie: IMovie;
  ObservableMovie: Observable<IMovie>;
  message: string;
  currentMovie: IMovie;
  movieWithReviews: IMovie;
  

  //Form for reviewer
  private formbuilder: FormBuilder;
  private formGroupMovieReview: FormGroup;
  movieReviewText: string ='';
  movieRating: number;
  reviewer: number;


  constructor(currentMovieService: CurrentMovieService, movieService: MovieService, formbuilder: FormBuilder) {
    this._currentMovieService = currentMovieService;
    this._movieService = movieService;
    this.formbuilder = formbuilder;

  }

  handleSubmit(formGroupMovieReview: NgForm){
    console.log("works");
    console.log(formGroupMovieReview);
    this._movieService.sendNewMovieReview(formGroupMovieReview);
    // Send new review -->
  }

  ngOnInit() {
    this.getPeople();
    this.formGroupMovieReview = this.formbuilder.group({
      'movieReviewText': [null, Validators.required],
      'reviewer': [null, Validators.required],
      'movieRating': [null, Validators.required]
    })
    // TESTI, REMOVE AFTER
    this.getCurrentMovie2();

    // this.getSelectedMovie();
    // this.getMovie(this.selectedMovie);
    // this.getMovieReviews(this.selectedMovie);
  }
  getMovie(selectedMovie: number) {
    this._movieService.getSingleMovieById(selectedMovie).subscribe(value => this.movie = value);
    console.log(this.movie);
  }
  getMovieReviews(selectedMovie: number) {
    this._movieService.getMovieReviewsByMovieID(selectedMovie).subscribe(value => this.movieReviews = value);
  }
  getPeople(){
    this._movieService.getPersonList().subscribe((value)=> this.people = value);
  }
  //TESTI, Remove after
  getCurrentMovie2(){
    this._movieService.getSingleMovieById2().subscribe((value)=> this.movieWithReviews = value);
  }
}
