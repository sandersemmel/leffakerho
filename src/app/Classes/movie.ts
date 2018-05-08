import { IMovie } from '../Interfaces/IMovie';

export class Movie implements IMovie {
  MovieID: number;
  Name: string;
  Details: string;
  MeetingDate: Date;

}
