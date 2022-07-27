import { Component } from '@angular/core';
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

    handleKeyUp(key: KeyboardKeys) {
        if (typeof key === 'object') return; // It's the event triggering twice
        // TODO: Handle keyboard key press
    }
}
