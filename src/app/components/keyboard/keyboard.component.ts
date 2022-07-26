import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from '@angular/core';
import KeyboardKey from 'src/app/models/KeyboardKey';

@Component({
    selector: 'app-keyboard',
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent {
    @Input() actionTitle: string = 'Enter';
    @Output('keyup') keyUp = new EventEmitter<string>();

    keyboardRows: string[][] = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['s1', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 's1'],
        ['s2', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
    ];

    getKeyClasses(key: string): string[] {
        const classes = ['keyboard-key'];
        if (key === 's1') classes.push('spacer1');
        if (key === 's2') classes.push('spacer2');
        if (key === '⌫') classes.push('delete');
        return classes;
    }
    getKeyContent(key: string): string {
        if (key !== 's1' && key !== 's2') return key;
        return '';
    }

    handleKeyPress(key: string) {
        console.log(key);
    }

    @HostListener('window:keyup', ['$event'])
    onKeyUp(event: KeyboardEvent) {
        if (this.isAlphabet(event.key) || event.key === ' ')
            this.handleKeyPress(event.key);
    }

    private isAlphabet(value: string): boolean {
        return value.match(/^[A-Za-z]$/) !== null;
    }
}
