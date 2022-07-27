import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { EncryptedLetterInputComponent } from './components/encrypted-letter-input/encrypted-letter-input.component';
import { KeyboardComponent } from './components/keyboard/keyboard.component';

AngularSvgIconModule.forRoot();
@NgModule({
    declarations: [
        AppComponent,
        EncryptedLetterInputComponent,
        KeyboardComponent,
    ],
    imports: [BrowserModule, HttpClientModule, AngularSvgIconModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
