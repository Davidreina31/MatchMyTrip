/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Filter_ActivityService } from './Filter_Activity.service';

describe('Service: Filter_Activity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Filter_ActivityService]
    });
  });

  it('should ...', inject([Filter_ActivityService], (service: Filter_ActivityService) => {
    expect(service).toBeTruthy();
  }));
});
