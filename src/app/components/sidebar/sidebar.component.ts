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
  }

  toggleSidebar(section: string) {
    if (window.innerWidth <= 768) {
      this.isCollapsed = !this.isCollapsed;
    }
    this.openSection(section);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.updateSidebarVisibility();
  }

  updateSidebarVisibility() {
    this.isCollapsed = window.innerWidth <= 768;
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
        return 'github'; // No extension needed
      case 'skills':
        return 'skills.css';
      case 'projects':
        return 'projects.ts';
      case 'leetcode':
        return 'leetcode.code';
      default:
        return tab; // Fallback to the original name if not mapped
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


}
