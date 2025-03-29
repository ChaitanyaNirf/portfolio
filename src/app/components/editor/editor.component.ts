import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ResumeComponent } from '../resume/resume.component';
import { CommonModule } from '@angular/common';
import { LeetcodeComponent } from '../leetcode/leetcode.component';
import { SkillsComponent } from '../skills/skills.component';
import { GithubComponent } from "../github/github.component";

@Component({
  selector: 'app-editor',
  imports: [ResumeComponent, CommonModule, LeetcodeComponent, SkillsComponent, GithubComponent],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @Input() content: string = '<p>Select a section to view details.</p>';
  @Input() activeTab: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  get sanitizedContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.content);
  }
}
