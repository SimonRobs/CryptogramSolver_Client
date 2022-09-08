import { Component, Input, OnInit } from '@angular/core';
import { CryptogramResultWord } from 'src/app/models/CryptogramResult';

@Component({
  selector: 'app-word-select',
  templateUrl: './word-select.component.html',
  styleUrls: ['./word-select.component.scss']
})
export class WordSelectComponent implements OnInit {

  @Input('word') word!: CryptogramResultWord;

  constructor() { }

  ngOnInit(): void {
  }

}
