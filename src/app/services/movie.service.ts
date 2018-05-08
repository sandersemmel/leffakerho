import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IMovie } from '../Interfaces/IMovie';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MovieService {
  private _movieUrl: string = 'http://localhost:50898/api/movie';
  private _sendMovieUrl: string = 'http://localhost:50898/api/movie/post';

  private _contentType: string = 'application/x-www-form-urlencoded';
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

    let headers = new HttpHeaders({'Content-Type': this._contentType} )
    this._http.post<IMovie>(this._sendMovieUrl, body, {headers} ).subscribe();
  }

}
