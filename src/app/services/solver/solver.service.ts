import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import SocketMessages from 'src/app/enums/SocketMessages';
import { CryptogramResult } from 'src/app/models/CryptogramResult';
import EncryptedWord from 'src/app/models/EncryptedWord';

@Injectable({
    providedIn: 'root',
})
export class SolverService {
    private _result: BehaviorSubject<CryptogramResult>;

    constructor(private socket: Socket) {
        this._result = new BehaviorSubject<CryptogramResult>({ words: [] });
        this.socket
            .fromEvent<string>(SocketMessages.ANSWER)
            .subscribe((data: string) => this.parseResult(data));
    }

    get result(): Observable<CryptogramResult> {
        return this._result.asObservable();
    }

    sendCryptogram(words: EncryptedWord[]) {
        this.socket.emit(SocketMessages.CRYPTOGRAM, words);
    }

    private parseResult(result: string): void {
        const wordsSplit = result.split(' ');
        wordsSplit.pop(); // Remove the 'Enter' character

        const foundWords = [...this._result.value.words];
        if (foundWords.length === 0) {
            wordsSplit.forEach((word: string) =>
                foundWords.push({ values: [word] })
            );
        } else {
            wordsSplit.forEach((word: string, index: number) => {
                if (!foundWords[index].values.includes(word))
                    foundWords[index].values.push(word);
            });
        }
        this._result.next({ words: foundWords });
    }
}
