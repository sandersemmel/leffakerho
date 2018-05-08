import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPerson } from '../Interfaces/IPerson';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonService {
  private _http: HttpClient;
  private _url: string = 'http://localhost:50898/api/person';

  constructor(http: HttpClient) {
    this._http = http;
  }

  getPersons(): Observable<IPerson[]> {
    return this._http.get <IPerson[]>(this._url);
  }
}
