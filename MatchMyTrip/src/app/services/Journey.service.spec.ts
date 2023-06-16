/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JourneyService } from './Journey.service';

describe('Service: Journey', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JourneyService]
    });
  });

  it('should ...', inject([JourneyService], (service: JourneyService) => {
    expect(service).toBeTruthy();
  }));
});
