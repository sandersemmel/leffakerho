import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IMovie } from '../Interfaces/IMovie';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
@Injectable() 
export class TestComponent implements OnInit {
  private _http: HttpClient;
  private _movieUrl = 'http://localhost:50898/api/movie';
  movies: IMovie[];

  constructor(http: HttpClient) {
    this._http = http;
  }

  ngOnInit() {
  }

}
