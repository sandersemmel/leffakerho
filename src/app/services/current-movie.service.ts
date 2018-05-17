import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";



@Injectable()
export class CurrentMovieService {

  private _subject: Subject<string> = new Subject();

  constructor() { }

  ngOnInit() {
  }

  setValue(text: string) {
    this._subject.next(text);
  }
  getValue(): Subject<string> {
    return this._subject;
  }
}
