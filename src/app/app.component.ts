import { Component } from '@angular/core';
import { cryptogramEasy } from 'src/assets/cryptograms/cryptogramEasy';
import { KeyboardKeys } from './enums/KeyboardKeys.enum';
import EncryptedWord from './models/EncryptedWord';
import { SolverService } from './services/solver/solver.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(private solverService: SolverService) {
      solverService.getAnswers().subscribe((answer:string)=>{
        console.log(answer);
      })
    }
    words: EncryptedWord[] = cryptogramEasy;

    focusedWordIndex = 0;
    focusedLetterIndex = 0;
    focusedField: 'value' | 'key' = 'value';

    handleKeyUp(key: KeyboardKeys) {
        if (typeof key === 'object') return; // It's the event triggering twice
        if (key === KeyboardKeys.BACKSPACE) {
            this.removeFocusedLetter();
            this.decreaseFocusIndex();
        } else if (key === KeyboardKeys.ENTER) {
            this.solverService.sendCryptogram(this.words);
        } else if (key === KeyboardKeys.LOCK) {
            this.focusedField = this.focusedField === 'key' ? 'value' : 'key';
        } else if (key === KeyboardKeys.SPACE) {
            if (this.focusedLetterIndex === 0) return;
            this.removeFocusedLetter();
            this.addEncryptedWord();
            this.focusedWordIndex++;
            this.focusedLetterIndex = 0;
        } else {
            this.setFocusedLetterContent(key);
            this.addEncryptedLetter();
        }
    }

    private setFocusedLetterContent(content?: string): void {
        const focusedWord = this.words[this.focusedWordIndex];
        const focusedLetter = focusedWord.letters[this.focusedLetterIndex];
        if (this.focusedField === 'value') {
            focusedLetter.value = content;
            focusedLetter.key = '';
        } else {
            focusedLetter.key = content;
            focusedLetter.value = '';
        }
    }

    private addEncryptedLetter() {
        const focusedWord = this.words[this.focusedWordIndex];
        focusedWord.letters.push({ value: '', key: '' });
        this.focusedLetterIndex++;
    }

    private addEncryptedWord() {
        this.words.push({ letters: [{ value: '', key: '' }] });
    }

    private removeFocusedLetter() {
        if (this.focusedWordIndex === 0 && this.focusedLetterIndex === 0) {
            this.setFocusedLetterContent();
            return;
        }
        this.words[this.focusedWordIndex].letters.splice(
            this.focusedLetterIndex,
            1
        );
    }

    private decreaseFocusIndex() {
        if (this.focusedLetterIndex > 0) {
            this.focusedLetterIndex--;
        } else if (this.focusedWordIndex > 0) {
            this.removeEncryptedWord();
            this.focusedWordIndex--;
            const focusedWord = this.words[this.focusedWordIndex];
            this.focusedLetterIndex = focusedWord.letters.length - 1;
        }
    }

    private removeEncryptedWord() {
        this.words.splice(this.focusedWordIndex, 1);
    }
}
