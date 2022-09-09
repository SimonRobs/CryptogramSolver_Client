import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomEncryptedLetterComponent } from './random-encrypted-letter.component';

describe('RandomEncryptedLetterComponent', () => {
  let component: RandomEncryptedLetterComponent;
  let fixture: ComponentFixture<RandomEncryptedLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomEncryptedLetterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomEncryptedLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
