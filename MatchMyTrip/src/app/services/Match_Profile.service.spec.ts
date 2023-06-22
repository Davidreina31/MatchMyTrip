/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Match_ProfileService } from './Match_Profile.service';

describe('Service: Match_Profile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Match_ProfileService]
    });
  });

  it('should ...', inject([Match_ProfileService], (service: Match_ProfileService) => {
    expect(service).toBeTruthy();
  }));
});
