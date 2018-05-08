import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { ICar } from '../Interfaces/ICar';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  providers: [CarService]
})
export class CarComponent implements OnInit {
  private _carService: CarService;
  cars: ICar[] = [];
  car: ICar;

  constructor(carService: CarService) {
    this._carService = carService;
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this._carService.getCars().subscribe(cars => this.cars = cars);
  }

}
