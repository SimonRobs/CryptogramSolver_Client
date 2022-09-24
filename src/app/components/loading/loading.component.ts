import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SolverService } from 'src/app/services/solver/solver.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnDestroy {
    @Output() solved = new EventEmitter<void>();
    @Output() timeout = new EventEmitter<void>();
    @Output() canceled = new EventEmitter<void>();

    private N_LETTERS = 9;

    letters: number[] = [];

    subscriptions: Subscription[] = [];

    constructor(private solverService: SolverService) {
        this.populateLetters();
        this.subscriptions.push(
            this.solverService.programExit.subscribe(() => this.solved.emit())
        );
        this.subscriptions.push(
            this.solverService.programTimeout.subscribe(() =>
                this.timeout.emit()
            )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    cancelSolving() {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
        this.solverService.cancelSolving();
        this.canceled.emit();
    }

    private populateLetters() {
        for (let i = 0; i < this.N_LETTERS; ++i) {
            this.letters.push(i);
        }
    }
}
