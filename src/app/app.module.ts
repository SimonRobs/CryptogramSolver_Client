import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { EncryptedLetterInputComponent } from './components/encrypted-letter-input/encrypted-letter-input.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';
import { APP_URL, PORT } from './constants';

const config: SocketIoConfig = { url: `${APP_URL}:${PORT}`, options: {} };
AngularSvgIconModule.forRoot();

@NgModule({
    declarations: [
        AppComponent,
        EncryptedLetterInputComponent,
        KeyboardComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AngularSvgIconModule.forRoot(),
        SocketIoModule.forRoot(config),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
