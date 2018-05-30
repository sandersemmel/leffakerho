import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PersonserviceService} from '../../services/personservice.service';

@Component({
  selector: 'app-personform',
  templateUrl: './personform.component.html',
  styleUrls: ['./personform.component.css']
})
export class PersonformComponent implements OnInit {
  private _formBuilder: FormBuilder;
  private _personService: PersonserviceService;
  personForm: FormGroup;
  isAddedBoolean: boolean;


  constructor(formBuilder: FormBuilder, personService: PersonserviceService) {
    this._formBuilder = formBuilder;
    this._personService = personService;
    this.createForm();
   }

  ngOnInit() {
  }
  createForm(){
    this.personForm = this._formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['', Validators.required]
    })
  }
  handleSubmit(personForm: FormGroup){
    if(personForm.valid){
      this._personService.addNewPerson(personForm.value.firstName,personForm.value.lastName)
      .subscribe((value)=>this.handleResponse(value), (error)=>this.handleResponse(error));
       console.log("valid"); 
    }
    else{
      console.log("invalid");
    }
  }
  handleResponse(responseValue){
    if(responseValue == "Person was added."){
      this.setIsAddedTrue();
    }else{
      this.setIsAddedFalse();
    }
  }
  setIsAddedTrue(){
    this.isAddedBoolean = true;
  }
  setIsAddedFalse(){
    this.isAddedBoolean = false;
  }

}
