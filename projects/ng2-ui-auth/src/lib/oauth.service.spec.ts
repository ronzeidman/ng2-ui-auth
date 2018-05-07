import { TestBed, inject } from '@angular/core/testing';

import { OauthService } from './oauth.service';

describe('OauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OauthService]
    });
  });

  it('should be created', inject([OauthService], (service: OauthService) => {
    expect(service).toBeTruthy();
  }));
});
