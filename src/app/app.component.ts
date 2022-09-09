import { Component } from '@angular/core';
import { cryptogramEasy } from 'src/assets/cryptograms/cryptogramEasy';
import { KeyboardKeys } from './enums/KeyboardKeys.enum';
import { ScreenStates } from './enums/ScreenStates';
import { CryptogramResult } from './models/CryptogramResult';
import EncryptedWord from './models/EncryptedWord';
import { SolverService } from './services/solver/solver.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    ScreenStates = ScreenStates;
    screen: ScreenStates = ScreenStates.RESULT;

    constructor(private solverService: SolverService) {}

    handleCryptogramSubmit(cryptogram: EncryptedWord[]) {
        this.solverService.sendCryptogram(cryptogram);
        this.screen = ScreenStates.LOADING;
    }

    handleCryptogramSolved() {
        this.screen = ScreenStates.RESULT;
    }

    handleCryptogramReset() {
        this.screen = ScreenStates.INPUT;
    }
}
