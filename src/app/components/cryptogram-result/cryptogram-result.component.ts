import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import SolverResultStatus from 'src/app/enums/SolverResultStatus';
import { CryptogramResult } from 'src/app/models/CryptogramResult';
import { SolverService } from 'src/app/services/solver/solver.service';

@Component({
    selector: 'app-cryptogram-result',
    templateUrl: './cryptogram-result.component.html',
    styleUrls: ['./cryptogram-result.component.scss'],
})
export class CryptogramResultComponent implements OnInit, OnDestroy {
    @Input() resultStatus!: SolverResultStatus;

    @Output() reset = new EventEmitter<void>();
    @Output() retry = new EventEmitter<void>();

    result: CryptogramResult = { words: [] };
    ResultStatuses = SolverResultStatus;

    resultSubscription!: Subscription;

    constructor(private solverService: SolverService) {}

    ngOnInit(): void {
        this.resultSubscription = this.solverService.result.subscribe(
            (result: CryptogramResult) => (this.result = result)
        );
    }

    ngOnDestroy(): void {
        this.resultSubscription.unsubscribe();
    }

    resetCryptogram() {
        this.reset.emit();
    }

    reenterCryptogram() {
        this.retry.emit();
    }
}
