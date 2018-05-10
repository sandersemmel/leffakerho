import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { MovielistComponent } from './movielist/movielist.component';
import { PersonComponent } from './person/person.component';
import { CarComponent } from './car/car.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieFormComponent } from './Forms/movie-form/movie-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MovielistComponent,
    PersonComponent,
    CarComponent,
    NavbarComponent,
    MovieFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: 'movielist', component: MovielistComponent },
      { path: 'cars', component: CarComponent },
      { path: 'add', component: MovieFormComponent},
      {path: '', redirectTo: 'cars', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
