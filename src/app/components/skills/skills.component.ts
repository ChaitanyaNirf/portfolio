import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  skills = [
    { name: 'Node.js', icon: 'fab fa-node', level: 9 },
    { name: 'Java', icon: 'fab fa-java', level: 9 },
    { name: 'TypeScript', icon: 'fab fa-js', level: 9 },
    { name: 'Angular', icon: 'fab fa-angular', level: 8 },
    { name: 'Kubernetes', icon: 'fas fa-network-wired', level: 9 },
    { name: 'Kafka', icon: 'fas fa-stream', level: 8 },
    { name: 'Redis', icon: 'fas fa-memory', level: 8 },
    { name: 'PostgreSQL', icon: 'fas fa-database', level: 8 },
    { name: 'Verdaccio (NPM Registry)', icon: 'fas fa-box-open', level: 8 },
    { name: 'Git', icon: 'fab fa-git-alt', level: 9 }
  ];
}