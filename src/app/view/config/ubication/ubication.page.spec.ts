import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicationPage } from './ubication.page';

describe('UbicationPage', () => {
  let component: UbicationPage;
  let fixture: ComponentFixture<UbicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
