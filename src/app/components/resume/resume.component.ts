import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  resumeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.resumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://drive.google.com/file/d/1zIM9yVUZo3tfAzsgbM7JnpkT-cHay3T0/preview');
  }
}
