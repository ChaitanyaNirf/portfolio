import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
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
      setTimeout(() => this.typeText(), 100); // Adjust speed here
    }
  }
}