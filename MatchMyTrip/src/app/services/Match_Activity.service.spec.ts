/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Match_ActivityService } from './Match_Activity.service';

describe('Service: Match_Activity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Match_ActivityService]
    });
  });

  it('should ...', inject([Match_ActivityService], (service: Match_ActivityService) => {
    expect(service).toBeTruthy();
  }));
});
