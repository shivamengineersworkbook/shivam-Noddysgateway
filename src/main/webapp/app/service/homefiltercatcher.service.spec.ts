import { TestBed, inject } from '@angular/core/testing';

import { HomefiltercatcherService } from './homefiltercatcher.service';

describe('HomefiltercatcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomefiltercatcherService]
    });
  });

  it('should be created', inject([HomefiltercatcherService], (service: HomefiltercatcherService) => {
    expect(service).toBeTruthy();
  }));
});
