/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Profile_FilterService } from './Profile_Filter.service';

describe('Service: Profile_Filter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Profile_FilterService]
    });
  });

  it('should ...', inject([Profile_FilterService], (service: Profile_FilterService) => {
    expect(service).toBeTruthy();
  }));
});
