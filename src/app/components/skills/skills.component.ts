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
    { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', level: 9 },
    { name: 'Java', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', level: 9 },
    { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', level: 9 },
    { name: 'Angular', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg', level: 8 },
    { name: 'Kubernetes', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', level: 9 },
    { name: 'Kafka', iconUrl: 'https://img.icons8.com/?size=100&id=fOhLNqGJsUbJ&format=png&color=000000', level: 8 },
    { name: 'Redis', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', level: 8 },
    { name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', level: 8 },
    { name: 'Verdaccio', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg', level: 8 },
    { name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', level: 9 }
  ];
}
