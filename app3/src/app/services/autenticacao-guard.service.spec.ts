/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutenticacaoGuardService } from './autenticacao-guard.service';

describe('Service: AutenticacaoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutenticacaoGuardService]
    });
  });

  it('should ...', inject([AutenticacaoGuardService], (service: AutenticacaoGuardService) => {
    expect(service).toBeTruthy();
  }));
});
