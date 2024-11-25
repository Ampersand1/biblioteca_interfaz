import { TestBed } from '@angular/core/testing';

import { BusquedaService } from './services/busqueda.service';

describe('BusquedaService', () => {
  let service: BusquedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
