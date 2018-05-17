import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IMovie } from '../Interfaces/IMovie';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MovieService {
  private _movieUrl: string = 'http://localhost:50898/api/movie';
  private _sendMovieUrl: string = 'http://localhost:50898/api/movie/post';
  private _editMovieUrl: string = 'http://localhost:50898/api/movie/';
  private _singleMovieUrl: string = 'http://localhost:49579/api/moviedetails/';


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

}
