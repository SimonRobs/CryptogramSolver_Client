import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KeyboardKeys } from 'src/app/enums/KeyboardKeys.enum';
import EncryptedWord from 'src/app/models/EncryptedWord';

@Component({
    selector: 'app-cryptogram-input',
    templateUrl: './cryptogram-input.component.html',
    styleUrls: ['./cryptogram-input.component.scss'],
})
export class CryptogramInputComponent implements OnInit {
    @Input() words!: EncryptedWord[];
    @Output() wordsChange = new EventEmitter<EncryptedWord[]>();

    @Output() submit: EventEmitter<void> = new EventEmitter();

    focusedWordIndex = 0;
    focusedLetterIndex = 0;
    focusedField: 'value' | 'key' = 'value';

    ngOnInit(): void {
        if (this.words.length > 0) {
            this.focusedWordIndex = this.words.length - 1;
            this.focusedLetterIndex =
                this.words[this.focusedWordIndex].letters.length - 1;
        }
    }

    handleKeyUp(key: KeyboardKeys) {
        if (typeof key === 'object') return; // It's the event triggering twice
        switch (key) {
            case KeyboardKeys.BACKSPACE:
                this.handleBackspaceKey();
                break;
            case KeyboardKeys.SPACE:
                this.handleSpaceKey();
                break;
            case KeyboardKeys.LOCK:
                this.handleLockKey();
                break;
            case KeyboardKeys.ENTER:
                this.handleEnterKey();
                break;
            default:
                this.setFocusedLetterContent(key);
                this.addEncryptedLetter();
        }
    }

    private handleSpaceKey() {
        if (this.focusedLetterIndex === 0) return;
        this.removeFocusedLetter();
        this.addEncryptedWord();
        this.focusedWordIndex++;
        this.focusedLetterIndex = 0;
    }

    private handleLockKey() {
        this.focusedField = this.focusedField === 'key' ? 'value' : 'key';
    }

    private handleBackspaceKey() {
        this.removeFocusedLetter();
        this.decreaseFocusIndex();
    }

    private handleEnterKey() {
        this.submit.emit();
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
