import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyPage } from './fly.page';

describe('FlyPage', () => {
  let component: FlyPage;
  let fixture: ComponentFixture<FlyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
