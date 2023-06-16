/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Journey_ActivityService } from './Journey_Activity.service';

describe('Service: Journey_Activity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Journey_ActivityService]
    });
  });

  it('should ...', inject([Journey_ActivityService], (service: Journey_ActivityService) => {
    expect(service).toBeTruthy();
  }));
});
