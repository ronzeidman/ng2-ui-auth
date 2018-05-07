import { TestBed, inject } from '@angular/core/testing';

import { Oauth1Service } from './oauth1.service';

describe('Oauth1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Oauth1Service]
    });
  });

  it('should be created', inject([Oauth1Service], (service: Oauth1Service) => {
    expect(service).toBeTruthy();
  }));
});
