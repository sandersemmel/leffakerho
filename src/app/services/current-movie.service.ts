import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { IMovie } from '../Interfaces/IMovie';


@Injectable()
export class CurrentMovieService {

  private _subject: Subject<string> = new Subject();
  private movie: IMovie;
  private movieBehaviourSubject = new BehaviorSubject<IMovie>(null);
  currentMovieObservable = this.movieBehaviourSubject.asObservable();

  private testBehaviourSubject = new BehaviorSubject<string>("Test Message");
  currentMessage = this.testBehaviourSubject.asObservable();

  constructor() { }

  ngOnInit() {
  }

  setValue(text: string) {
    this._subject.next(text);
  }
  getValue(): Subject<string> {
    return this._subject;
  }
  setCurrentMovie(movie: IMovie): void{
    this.movieBehaviourSubject.next(movie);
  }
  setCurrentMessage(message: string){
    this.testBehaviourSubject.next(message);
  }
  getCurrentMovie(): Observable<IMovie>{
    return this.currentMovieObservable;
  }

}
