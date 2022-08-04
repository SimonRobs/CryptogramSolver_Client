import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import SocketMessages from 'src/app/enums/SocketMessages';
import EncryptedLetter from 'src/app/models/EncryptedLetter';
import EncryptedWord from 'src/app/models/EncryptedWord';

@Injectable({
    providedIn: 'root',
})
export class SolverService {
    constructor(private socket: Socket) {}

    sendCryptogram(words: EncryptedWord[]) {
        this.socket.emit(SocketMessages.CRYPTOGRAM, words);
    }

    getAnswers(): Observable<string> {
        return this.socket.fromEvent(SocketMessages.ANSWER);
    }
}
