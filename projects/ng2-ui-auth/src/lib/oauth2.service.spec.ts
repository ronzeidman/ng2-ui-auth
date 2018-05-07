import { TestBed, inject } from '@angular/core/testing';

import { Oauth2Service } from './oauth2.service';

describe('Oauth2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Oauth2Service]
    });
  });

  it('should be created', inject([Oauth2Service], (service: Oauth2Service) => {
    expect(service).toBeTruthy();
  }));
});
