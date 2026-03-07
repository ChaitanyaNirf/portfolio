import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  @Output() openGame = new EventEmitter<void>();

  text = 'Welcome to my portfolio,';
  typedText = '';
  index = 0;

  ngOnInit() {
    this.typeText();
  }

  typeText() {
    if (this.index < this.text.length) {
      this.typedText += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.typeText(), 100);
    }
  }

  launchGame() {
    this.openGame.emit();
  }
}