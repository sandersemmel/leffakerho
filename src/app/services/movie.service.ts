import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovie } from '../Interfaces/IMovie';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MovieService {
  private _movieUrl = 'http://localhost:50898/api/movie';
  private _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
  }

  getMovies(): Observable<IMovie[]> {
    return this._http.get<IMovie[]>(this._movieUrl);
  }

}
