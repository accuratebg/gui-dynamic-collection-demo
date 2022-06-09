import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDocumentsComponent } from './dynamic-documents.component';

describe('DynamicDocumentsComponent', () => {
  let component: DynamicDocumentsComponent;
  let fixture: ComponentFixture<DynamicDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
