import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptedLetterInputComponent } from './encrypted-letter-input.component';

describe('EncryptedLetterInputComponent', () => {
    let component: EncryptedLetterInputComponent;
    let fixture: ComponentFixture<EncryptedLetterInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EncryptedLetterInputComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EncryptedLetterInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
