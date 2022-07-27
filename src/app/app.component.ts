import {
    AfterViewInit,
    Component,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { EncryptedLetterInputComponent } from './components/encrypted-letter-input/encrypted-letter-input.component';
import { KeyboardKeys } from './enums/KeyboardKeys.enum';
import EncryptedLetter from './models/EncryptedLetter';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    letters: EncryptedLetter[] = [
        { value: '', key: 'K' },
        { value: 'O', key: '' },
        { value: '', key: 'P' },
        { value: '', key: 'A' },
        { value: 'S', key: '' },
    ];

    focusedLetterIndex = 0;
    focusedField: 'value' | 'key' = 'value';

    handleKeyUp(key: KeyboardKeys) {
        if (typeof key === 'object') return; // It's the event triggering twice
        if (key === KeyboardKeys.BACKSPACE) {
            // TODO: Handle backspace
        } else if (key === KeyboardKeys.ENTER) {
            // TODO: Handle enter
        } else if (key === KeyboardKeys.TAB) {
            // TODO: Handle tab
        } else if (key === KeyboardKeys.SPACE) {
            // TODO: Handle space
        } else {
            const focusedLetter = this.letters[this.focusedLetterIndex];
            if (this.focusedField === 'value') {
                focusedLetter.value = key;
                focusedLetter.key = '';
                this.focusedField = 'key';
            } else {
                focusedLetter.key = key;
                focusedLetter.value = '';
                this.focusedLetterIndex++;
                this.focusedField = 'value';
            }
        }
    }
}
