import { Component } from '@angular/core';
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

    handleKeyUp(key: string) {
        // console.log(key);
    }
}
