import { Component } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
    private N_LETTERS = 9;

    letters: number[] = [];

    constructor() {
        for (let i = 0; i < this.N_LETTERS; ++i) {
            this.letters.push(i);
        }
    }
}
