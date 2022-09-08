import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptogramResultComponent } from './cryptogram-result.component';

describe('CryptogramResultComponent', () => {
    let component: CryptogramResultComponent;
    let fixture: ComponentFixture<CryptogramResultComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CryptogramResultComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CryptogramResultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
