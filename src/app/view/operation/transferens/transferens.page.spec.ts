import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferensPage } from './transferens.page';

describe('TransferensPage', () => {
  let component: TransferensPage;
  let fixture: ComponentFixture<TransferensPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferensPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
