import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSelectComponent } from './word-select.component';

describe('WordSelectComponent', () => {
  let component: WordSelectComponent;
  let fixture: ComponentFixture<WordSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
