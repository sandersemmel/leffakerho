import { TestBed, inject } from '@angular/core/testing';

import { CurrentMovieService } from './current-movie.service';

describe('CurrentMovieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentMovieService]
    });
  });

  it('should be created', inject([CurrentMovieService], (service: CurrentMovieService) => {
    expect(service).toBeTruthy();
  }));
});
