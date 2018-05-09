import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IMovie } from '../Interfaces/IMovie';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MovieService {
  private _movieUrl: string = 'http://localhost:50898/api/movie';
  private _sendMovieUrl: string = 'http://localhost:50898/api/movie/post';
  private _editMovieUrl: string = 'http://localhost:50898/api/movie/';


  private _contentType: string = 'application/x-www-form-urlencoded';
  private _headers = new HttpHeaders({ 'Content-Type': this._contentType })
  private _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
  }

  getMovies(): Observable<IMovie[]> {
    return this._http.get<IMovie[]>(this._movieUrl);
  }
  sendNewMovie(movie: IMovie) {

    const body = new HttpParams()
      .set('name', movie.Name)
      .set('details', movie.Details).toString();

    let headers = this._headers;
    this._http.post<IMovie>(this._sendMovieUrl, body, {headers} ).subscribe();
  }
  updateMovie(movie: IMovie): void {
    this._editMovieUrl = this._editMovieUrl + movie.MovieID.toString();

    const body = new HttpParams()
      .set('name', movie.Name)
      .set('details', movie.Details)
      .set('movieid', movie.MovieID.toString());

    let headers = this._headers;
    this._http.post(this._editMovieUrl, body, { headers }).subscribe();
  }

}
