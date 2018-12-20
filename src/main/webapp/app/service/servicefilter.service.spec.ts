import { TestBed, inject } from '@angular/core/testing';

import { ServicefilterService } from './servicefilter.service';

describe('ServicefilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicefilterService]
    });
  });

  it('should be created', inject([ServicefilterService], (service: ServicefilterService) => {
    expect(service).toBeTruthy();
  }));
});
