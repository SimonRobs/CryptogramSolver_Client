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
    @Input() focused: 'value' | 'key' | null = null;

    @Input() value: string | undefined;
    @Output() valueChange = new EventEmitter<string>();

    @Input() key: string | undefined;
    @Output() keyChange = new EventEmitter<string>();

    @Output() click = new EventEmitter<void>();

    handleLetterClick() {
        this.click.emit();
    }
}
