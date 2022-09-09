import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CryptogramResult } from 'src/app/models/CryptogramResult';
import { SolverService } from 'src/app/services/solver/solver.service';

@Component({
    selector: 'app-cryptogram-result',
    templateUrl: './cryptogram-result.component.html',
    styleUrls: ['./cryptogram-result.component.scss'],
})
export class CryptogramResultComponent implements OnInit {
    @Output() reset = new EventEmitter<void>();
    result: CryptogramResult = { words: [] };

    constructor(private solverService: SolverService) {}

    ngOnInit(): void {
        this.solverService.result.subscribe(
            (result: CryptogramResult) => (this.result = result)
        );
    }

    resetCryptogram() {
        this.reset.emit();
    }
}
