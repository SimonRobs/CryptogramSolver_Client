import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-encrypted-letter-input',
    templateUrl: './encrypted-letter-input.component.html',
    styleUrls: ['./encrypted-letter-input.component.scss'],
})
export class EncryptedLetterInputComponent {
    @Input() value: string | undefined;
    @Output() valueChange = new EventEmitter<string>();

    @Input() key: string | undefined;
    @Output() keyChange = new EventEmitter<string>();

    handleKeyUp(key: string, changeEmitter: EventEmitter<string>) {
        const isBackspace = key === 'Backspace';
        if (!isBackspace && !this.isAlphabet(key)) return;
        changeEmitter.emit(isBackspace ? '' : key);
    }

    private isAlphabet(value: string): boolean {
        return value.match(/^[A-Za-z]$/) !== null;
    }
}
