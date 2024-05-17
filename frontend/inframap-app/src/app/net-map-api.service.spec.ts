import { TestBed } from '@angular/core/testing';

import { NetMapAPIService } from './net-map-api.service';

describe('NetMapAPIService', () => {
  let service: NetMapAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetMapAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
