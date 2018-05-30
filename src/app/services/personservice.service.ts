import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs'; 

@Injectable()
export class PersonserviceService {
  private _http: HttpClient;
  private _addNewPersonUrl: string = "http://localhost:49579/api/person/add";
  constructor(http: HttpClient) {
    this._http = http; 
   }

   addNewPerson(firstName:string,lastName:string): Observable<any>{
     const body = new HttpParams()
     .set('FirstName', firstName)
     .set('LastName', lastName)

      return this._http.post(this._addNewPersonUrl,body);
   }
}
