import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { IPerson } from '../Interfaces/IPerson';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [PersonService]
})
export class PersonComponent implements OnInit {
  private _personService: PersonService;
  persons: IPerson[] = [];
  person: IPerson;

  constructor(personService: PersonService) {
    this._personService = personService;
  }

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(): void {
    this._personService.getPersons().subscribe(persons => this.persons = persons);
  }

}
