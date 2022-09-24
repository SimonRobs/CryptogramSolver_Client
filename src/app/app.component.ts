import { Component } from '@angular/core';
import { ScreenStates } from './enums/ScreenStates';
import SolverResultStatus from './enums/SolverResultStatus';
import EncryptedWord from './models/EncryptedWord';
import { SolverService } from './services/solver/solver.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    ScreenStates = ScreenStates;
    screen: ScreenStates = ScreenStates.INPUT;
    resultStatus = SolverResultStatus.NONE;

    cryptogram: EncryptedWord[] = [{ letters: [{ key: '', value: '' }] }];

    constructor(private solverService: SolverService) {}

    handleCryptogramSubmit() {
        this.solverService.sendCryptogram(this.cryptogram);
        this.screen = ScreenStates.LOADING;
    }

    handleCryptogramSolved() {
        this.resultStatus = SolverResultStatus.SUCCESS;
        this.screen = ScreenStates.RESULT;
    }

    handleSolverTimeout() {
        this.resultStatus = SolverResultStatus.TIMEOUT;
        this.screen = ScreenStates.RESULT;
    }

    handleSolvingCanceled() {
        this.screen = ScreenStates.INPUT;
    }

    handleCryptogramReset() {
        this.cryptogram = [{ letters: [{ key: '', value: '' }] }];
        this.screen = ScreenStates.INPUT;
    }

    handleCryptogramRetry() {
        this.screen = ScreenStates.INPUT;
    }
}
