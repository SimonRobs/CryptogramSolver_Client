import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { KeyboardKeys } from 'src/app/enums/KeyboardKeys.enum';
import { convertToKeyboardKey } from 'src/app/helpers/convertToKeyboardKey';

@Component({
    selector: 'app-keyboard',
    templateUrl: './keyboard.component.html',
    styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent {
    @Input() actionTitle: string = 'Enter';
    @Output('keyup') keyUp = new EventEmitter<KeyboardKeys>();
    keyboardKeys = KeyboardKeys;
    keyboardRows: string[][] = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', "'"],
        ['s1', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
    ];

    constructor(private _: SvgIconRegistryService) {}

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

    handleKeyPress(key: KeyboardKeys | string) {
        if (typeof key === 'string')
            this.keyUp.emit(convertToKeyboardKey(key)!);
        else this.keyUp.emit(key);
    }

    @HostListener('window:keyup', ['$event'])
    onKeyUp(event: KeyboardEvent) {
        if (!event || !event.key) return;
        const keyPressed = convertToKeyboardKey(event.key.toLocaleLowerCase());
        if (!keyPressed) return;
        event.preventDefault();
        event.stopPropagation();
        this.handleKeyPress(keyPressed);
    }
}
