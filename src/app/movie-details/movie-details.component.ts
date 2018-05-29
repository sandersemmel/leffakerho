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
  showForm: boolean = false;
  editingBoolean: boolean = false;
  noReviewsToShow: boolean = false;
  hideCurrentMovieBoolean: boolean = false;
  newReviewAdded: boolean = true;
  noReviews: boolean = true;
  reviewNotSent: boolean = true;
  

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

  handleSubmit(formGroupMovieReview: NgForm): void{
    console.log("values from movie-details add new review form:");
    console.log("ReviewText", formGroupMovieReview.value.movieReviewText);
    console.log("reviewer", formGroupMovieReview.value.reviewer);
    console.log("movieRating",formGroupMovieReview.value.movieRating);
    this._movieService.sendNewMovieReview(formGroupMovieReview); // Send new review
    this.displayNewReviewAdded();
    formGroupMovieReview.reset();
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
    this.getMovieReviews();

  }
  getMovie(selectedMovie: number) {
    this._movieService.getSingleMovieById(selectedMovie).subscribe(value => this.movie = value);
    console.log(this.movie);
  }
  getMovieReviews() {
    this._movieService.getMovieReviewsByMovieID().subscribe(value =>{this.movieReviews = value
    console.log(value);}, (error)=>{this.setnoReviewsToShow()} );
  }
  getPeople(){
    this._movieService.getPersonList().subscribe((value)=> this.people = value);
  }
  //TESTI, Remove after
  getCurrentMovie2(){
    this._movieService.getSingleMovieById2().subscribe((value)=> this.movieWithReviews = value);
  }
  showFormToggle(){
    this.showForm = !this.showForm;
  }
  editing(){
    this.editingBoolean = !this.editingBoolean;
    console.log("The value is ", this.editingBoolean);
  }
  save(){
    // Send movie with new details to edit it
  }
  remove(){
    this._movieService.removeSingleMovie(this.movieWithReviews).subscribe((value)=>console.log(value));
    this.removeMovieReviews();

    this.hideCurrentMovie();
  }
  removeMovieReviews(){
    this._movieService.removeMovieReviews(this.movieWithReviews.MovieID).subscribe((value)=>console.log(value));
  }
  setnoReviewsToShow(){
    this.noReviewsToShow = !this.noReviewsToShow;
    console.log(this.noReviewsToShow);
  }
  hideCurrentMovie(){
    this.hideCurrentMovieBoolean = !this.hideCurrentMovieBoolean;
  }
  displayNewReviewAdded(){
    this.reviewNotSent = !this.reviewNotSent;
    console.log("reviewnotsent", this.reviewNotSent);
  }
}
