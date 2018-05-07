import { TestBed, inject } from '@angular/core/testing';

import { BrowserStorageService } from './browser-storage.service';

describe('BrowserStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserStorageService]
    });
  });

  it(
    'should be created',
    inject([BrowserStorageService], (service: BrowserStorageService) => {
      expect(service).toBeTruthy();
    })
  );
});
