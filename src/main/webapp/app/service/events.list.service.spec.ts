import { TestBed, inject } from '@angular/core/testing';

import { EventsService } from './events.list.service';

describe('Events.ListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsService]
    });
  });

  it('should be created', inject([EventsService], (service: EventsService) => {
    expect(service).toBeTruthy();
  }));
});
