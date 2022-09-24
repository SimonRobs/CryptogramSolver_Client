import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';
import SocketMessages from 'src/app/enums/SocketMessages';
import {
    CryptogramResult,
    CryptogramResultWord,
} from 'src/app/models/CryptogramResult';
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

    get programTimeout(): Observable<void> {
        return this.socket.fromEvent<void>(SocketMessages.TIMEOUT);
    }

    get programExit(): Observable<void> {
        return this.socket.fromEvent<void>(SocketMessages.DONE);
    }

    sendCryptogram(words: EncryptedWord[]) {
        this._result.next({ words: [] });
        if (words.length > 0) {
            const lastWord = words[words.length - 1];
            const lastLetter = lastWord.letters[lastWord.letters.length - 1];

            // Pop the last letter if empty
            if (lastLetter.value === '' && lastLetter.key === '') {
                words[words.length - 1].letters.pop();
            }

            // Pop the last word if empty
            if (words[words.length - 1].letters.length === 0) {
                words.pop();
            }
        }
        this.socket.emit(SocketMessages.CRYPTOGRAM, words);
    }

    cancelSolving() {
        this.socket.emit(SocketMessages.CANCEL);
    }

    private parseResult(result: string): void {
        const wordsSplit = result.split(' ');
        wordsSplit.pop(); // Remove the 'Enter' character

        const foundWords: CryptogramResultWord[] = [
            ...this._result.value.words,
        ];
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
