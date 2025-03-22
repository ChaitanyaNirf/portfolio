import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
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

  openSection(section: string) {
    this.sectionSelected.emit(section);
  }
  
}
