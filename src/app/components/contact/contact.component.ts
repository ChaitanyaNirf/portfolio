import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactInfo = {
    name: "Chaitanya Nirfarake",
    email: "chaitunirfarake@gmail.com",
    linkedin: "https://www.linkedin.com/in/chaitanya-nirfarake-82b3b3217/",
    github: "https://github.com/ChaitanyaNirf"
  };

  copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
  }

  isLink(value: string): boolean {
    return value.startsWith("http");
  }
}
