import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICar } from '../Interfaces/ICar';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CarService {
  private _http: HttpClient;
  private _url: string = 'http://localhost:50898/api/car';

  constructor(http: HttpClient) {
    this._http = http;
  }

  getCars(): Observable<ICar[]>{
    return this._http.get<ICar[]>(this._url);
  }

}
