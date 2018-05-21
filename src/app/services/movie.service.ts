import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IMovie } from '../Interfaces/IMovie';
import { Observable } from 'rxjs/Observable';
import { IMovieReviewDetails } from '../Interfaces/IMovieReviewDetails';
import { IPerson } from '../Interfaces/IPerson';
import { NgForm } from '@angular/forms';

@Injectable()
export class MovieService {
  private _movieUrl: string = 'http://localhost:49579/api/movies/getall';
  private _sendMovieUrl: string = 'http://localhost:49579/api/movies/add'; 
  private _editMovieUrl: string = 'http://localhost:50898/api/movie/';
  private _singleMovieUrl: string = 'http://localhost:49579/api/moviedetails/';
  private _movieReviewDetailsUrl: string = 'http://localhost:49579/api/moviereviewdetails/';
  private _getPersonListUrl: string = 'http://localhost:49579/api/person/getall';
  private _sendMovieReviewUrl: string = 'http://localhost:49579/api/moviereviewdetails/add';


  private _contentType: string = 'application/x-www-form-urlencoded';
  private _headers = new HttpHeaders({ 'Content-Type': this._contentType })
  private _http: HttpClient;
  private movie: IMovie;

  constructor(http: HttpClient) {
    this._http = http;
  }

  getMovies(): Observable<IMovie[]> {
    return this._http.get<IMovie[]>(this._movieUrl);
  }
  getSingleMovieById(movieId: number): Observable<IMovie>{
    let urlWithId: string = this._singleMovieUrl.concat(movieId.toString());
    return this._http.get<IMovie>(urlWithId);
  }
  getMovieReviewsByMovieID(movieID: number): Observable<IMovieReviewDetails[]>  {
    let urlWithId: string = this._movieReviewDetailsUrl.concat(movieID.toString());
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
      .set('MovieReviewText', formData.movieReviewText)
      .set('MovieRating', formData.movieRating)
      .set('Reviewer', formData.reviewer)
      .set('MovieID', "11") // Change later to the correct movie
    let headers = this._headers;

    this._http.post(this._sendMovieReviewUrl,body,{headers}).subscribe();
  }

}
