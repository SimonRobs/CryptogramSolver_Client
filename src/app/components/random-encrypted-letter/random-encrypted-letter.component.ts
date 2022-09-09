import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeyboardKeys } from 'src/app/enums/KeyboardKeys.enum';
import EncryptedLetter from 'src/app/models/EncryptedLetter';

@Component({
    selector: 'app-random-encrypted-letter',
    templateUrl: './random-encrypted-letter.component.html',
    styleUrls: ['./random-encrypted-letter.component.scss'],
})
export class RandomEncryptedLetterComponent implements OnInit, OnDestroy {
    letter: EncryptedLetter;
    animationDelay!: number;

    private animationTimer!: NodeJS.Timeout;

    constructor() {
        this.animationDelay = 300 + Math.random() * 500;
        this.letter = { key: '', value: '' };
    }

    ngOnInit() {
        this.animationTimer = setInterval(
            () => this.resetLetter(),
            this.animationDelay
        );
    }

    ngOnDestroy(): void {
        clearInterval(this.animationTimer);
    }

    private resetLetter() {
        const isKey = Math.random() > 0.5;
        const val = this.getRandomLetter();
        this.letter[isKey ? 'key' : 'value'] = val;
        this.letter[isKey ? 'value' : 'key'] = '';
    }

    private getRandomLetter(): string {
        let letter: string;
        const allLetters = Object.keys(KeyboardKeys);
        do {
            letter = allLetters[Math.floor(Math.random() * allLetters.length)];
        } while (letter.length > 1);
        return letter;
    }
}
