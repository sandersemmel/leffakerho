import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { MovielistComponent } from './movielist/movielist.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieFormComponent } from './Forms/movie-form/movie-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieService } from './services/movie.service';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';
import { PersonformComponent } from './Forms/personform/personform.component';

@NgModule({
  declarations: [
    AppComponent,
    MovielistComponent,
    NavbarComponent,
    MovieFormComponent,
    HomeComponent,
    MovieDetailsComponent,
    PersonformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot([
      { path: 'movielist', component: MovielistComponent },
      { path: 'add', component: MovieFormComponent },
      { path: 'home', component: HomeComponent },
      {path: 'details', component:MovieDetailsComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ])
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
