import { CommonModule } from '@angular/common';
import { Component, HostListener, EventEmitter, Output } from '@angular/core';
import { Constants } from '../../../constants/Constants';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() sectionSelected = new EventEmitter<string>();
  isCollapsed: boolean = false;
  allTabs: string[] = Constants.ALL_TABS;
  isFileListHidden = false;
  isOutLineHidden = true;
  isTimeLineHidden = true;

  constructor() {
    this.updateSidebarVisibility();
  }

  openSection(section: string) {
    this.sectionSelected.emit(section);
    // On mobile, close the sidebar panel after selection
    if (window.innerWidth <= 768) {
      this.isCollapsed = true;
    }
  }

  toggleSidebar(section: string) {
    if (window.innerWidth <= 768) {
      // On mobile, toggle the sidebar drawer and also navigate
      this.isCollapsed = !this.isCollapsed;
    }
    this.sectionSelected.emit(section);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.updateSidebarVisibility();
  }

  updateSidebarVisibility() {
    this.isCollapsed = window.innerWidth <= 1024;
  }

  getFormattedTabName(tab: string): string {
    const lowerTab = tab.toLowerCase();

    switch (lowerTab) {
      case 'welcome':
        return 'Welcome';
      case 'contact':
        return 'contact.json';
      case 'experience':
        return 'experience.md';
      case 'publications':
        return 'publications.html';
      case 'resume':
        return 'resume.pdf';
      case 'github':
        return 'github';
      case 'skills':
        return 'skills.css';
      case 'projects':
        return 'projects.ts';
      case 'leetcode':
        return 'leetcode';
      case 'game':
        return 'game.exe';
      default:
        return tab;
    }
  }

  toggleFileList() {
    this.isFileListHidden = !this.isFileListHidden;
  }

  toggleOutlineList() {
    this.isOutLineHidden = !this.isOutLineHidden;
  }

  toggleTimelineList() {
    this.isTimeLineHidden = !this.isTimeLineHidden;
  }

  handleKey(event: KeyboardEvent, section: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleSidebar(section);
      event.preventDefault();
    }
  }
}
