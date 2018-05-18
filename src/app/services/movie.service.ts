import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IMovie } from '../Interfaces/IMovie';
import { Observable } from 'rxjs/Observable';
import { IMovieReviewDetails } from '../Interfaces/IMovieReviewDetails';
import { IPerson } from '../Interfaces/IPerson';

@Injectable()
export class MovieService {
  private _movieUrl: string = 'http://localhost:49579/api/movies/getall';
  private _sendMovieUrl: string = 'http://localhost:49579/api/movies/add';
  private _editMovieUrl: string = 'http://localhost:50898/api/movie/';
  private _singleMovieUrl: string = 'http://localhost:49579/api/moviedetails/';
  private _movieReviewDetailsUrl: string = 'http://localhost:49579/api/moviereviewdetails/';
  private _getPersonListUrl: string = 'http://localhost:49579/api/person/getall';


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
    this._http.post(this._sendMovieUrl,this._headers);
  }
  getPersonList(): Observable<IPerson[]> {
    return this._http.get<IPerson[]>(this._getPersonListUrl);
  }

}
