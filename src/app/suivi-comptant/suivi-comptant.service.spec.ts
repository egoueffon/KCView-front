import { TestBed, inject } from '@angular/core/testing';

import { SuiviComptantService } from './suivi-comptant.service';

describe('SuiviComptantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuiviComptantService]
    });
  });

  it('should ...', inject([SuiviComptantService], (service: SuiviComptantService) => {
    expect(service).toBeTruthy();
  }));
});
