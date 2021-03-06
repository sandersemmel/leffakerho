import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IMovie } from '../Interfaces/IMovie';
import { Observable } from 'rxjs/Observable';
import { IMovieReviewDetails } from '../Interfaces/IMovieReviewDetails';
import { IPerson } from '../Interfaces/IPerson';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MovieService {
  private _movieUrl: string = 'http://localhost:49579/api/movies/getall';
  private _sendMovieUrl: string = 'http://localhost:49579/api/movies/add'; 
  private _editMovieUrl: string = 'http://localhost:50898/api/movie/';
  private _singleMovieUrl: string = 'http://localhost:49579/api/movies/';
  private _movieReviewDetailsUrl: string = 'http://localhost:49579/api/moviereviews/';
  private _getPersonListUrl: string = 'http://localhost:49579/api/person/getall';
  private _sendMovieReviewUrl: string = 'http://localhost:49579/api/moviereviews/add';
  private _deleteMovieUrl: string = 'http://localhost:49579/api/movie/remove/';
  private _deleteMovieReviewsUrl: string = 'http://localhost:49579/api/moviereviews/remove/';
  _currentMovie: IMovie;
  subjectMovie: BehaviorSubject<IMovie>;

  private _contentType: string = 'application/x-www-form-urlencoded';
  private _headers = new HttpHeaders({ 'Content-Type': this._contentType })
  private _http: HttpClient;
  private movie: IMovie;

  private movieID: number;

  private currentMovieBehaviourSubject = new BehaviorSubject<IMovie>(null);
  currentMovie = this.currentMovieBehaviourSubject.asObservable();

  constructor(http: HttpClient) {
    this._http = http;
    
  }

  getMovies(): Observable<IMovie[]> {
    return this._http.get<IMovie[]>(this._movieUrl);
  }
  getSingleMovieById(movieId: number): Observable<IMovie>{
    let urlWithId: string = this._singleMovieUrl.concat(movieId.toString());
    this._http.get<IMovie>(urlWithId).subscribe(m=>this.subjectMovie.next(m));
    return null;
  }
  getMovieReviewsByMovieID(): Observable<IMovieReviewDetails[]>  {
    let urlWithId: string = this._movieReviewDetailsUrl.concat(this.movieID.toString());
    return this._http.get<IMovieReviewDetails[]>(urlWithId);
  }
  sendNewMovie(movie: IMovie) {
    const body = new HttpParams()
      .set('MovieName', movie.MovieName)
      .set('BroughtBy', movie.BroughtBy.toString());

    let headers = this._headers;  
    this._http.post(this._sendMovieUrl,body,{headers}).subscribe();
  }
  getPersonList(): Observable<IPerson[]> {
    return this._http.get<IPerson[]>(this._getPersonListUrl);
  }
  sendNewMovieReview(formData: any){
    console.log(formData.movieReviewText);
    const body = new HttpParams()
      .set('MovieReviewText', formData.value.movieReviewText)
      .set('MovieRating', formData.value.movieRating)
      .set('Reviewer', formData.value.reviewer)
      .set('MovieID', this.movieID.toString()) // Change later to the correct movie
    let headers = this._headers;

    this._http.post(this._sendMovieReviewUrl,body,{headers}).subscribe();
  }

  // TEST
  setCurrentMovie2(Id: number){
    this.movieID = Id;
    console.log("movieid", this.movieID);
  }
  getSingleMovieById2(): Observable<IMovie>{
    let urlWithId: string = this._singleMovieUrl.concat(this.movieID.toString());
    return this._http.get<IMovie>(urlWithId); 
  }
  removeSingleMovie(movie: IMovie): Observable<Object>{
    let removable = this._deleteMovieUrl + movie.MovieID.toString();
    return this._http.delete(removable);
  }
  removeMovieReviews(movieID: number): Observable<Object>{
    // REMOVE MOVIEREVIEWS
    let removable = this._deleteMovieReviewsUrl+movieID.toString();
    return this._http.delete(removable);
  }

}
