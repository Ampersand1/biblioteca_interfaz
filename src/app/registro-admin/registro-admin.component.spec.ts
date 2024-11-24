import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAdminComponent } from './registro-admin.component';

describe('RegistroAdminComponent', () => {
  let component: RegistroAdminComponent;
  let fixture: ComponentFixture<RegistroAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
