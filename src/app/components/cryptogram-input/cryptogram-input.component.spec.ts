import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptogramInputComponent } from './cryptogram-input.component';

describe('CryptogramInputComponent', () => {
    let component: CryptogramInputComponent;
    let fixture: ComponentFixture<CryptogramInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CryptogramInputComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CryptogramInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
