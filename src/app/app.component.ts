import { Component, HostListener } from '@angular/core';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TabsComponent } from "./components/tabs/tabs.component";
import { EditorComponent } from "./components/editor/editor.component";
import { CommonModule } from '@angular/common';
import { CommandPaletteComponent } from "./components/command-palette/command-palette.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [SidebarComponent, TabsComponent, EditorComponent, CommonModule, CommandPaletteComponent]
})
export class AppComponent {
  openTabs: string[] = ['none','welcome'];
  activeTab: string = 'welcome';
  isSidebarCollapsed: boolean = false;
  isMobileSidebarOpen: boolean = false;
  isMobile: boolean = false;

  contentMap: { [key: string]: string } = {
    'welcome': `Handled by welcome component`,
    'experience': `Handled by experience component`,
    'projects': `Handled by projects component`,
    'publications': `Handled by publications component`,
    'contact': `Handled by contact component`,
    'resume': `Handled by the resume component`,
    'github': `Handled by the github component`,
    'leetcode': `Handled by the leetcode component`,
    'skills' : `Handled by the skills component`,
    'game' : `Handled by the game component`,
    'none' : `<p>Nothing to see 🤷‍♂️</p>`
  };

  editorContent: string = this.contentMap['welcome'];

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const width = window.innerWidth;
    this.isMobile = width <= 768;
    
    if (width <= 1024) {
      this.isSidebarCollapsed = true;
    } else {
      this.isSidebarCollapsed = false;
    }

    if (!this.isMobile) {
      this.isMobileSidebarOpen = false;
    }
  }

  openSection(section: string) {
    if (!this.openTabs.includes(section.toLowerCase())) {
      this.openTabs.push(section.toLowerCase());
    }
    this.switchTab(section.toLowerCase());

    // Close mobile sidebar after selection
    if (this.isMobile) {
      this.isMobileSidebarOpen = false;
    }
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpen = false;
  }

  updateOpenTabs(closedTab: string) {
    this.openTabs = this.openTabs.filter(tab => tab !== closedTab);
    if (this.activeTab === closedTab) {
      this.activeTab = this.openTabs.length > 0 ? this.openTabs[0] : 'none';
    }
    if(this.openTabs.length == 1){
      this.activeTab = 'none';
      this.editorContent = 'Empty empty ';
    }
  }

  switchTab(section: string)  {
    if(this.openTabs.includes(section.toLowerCase())){
      this.activeTab = section.toLowerCase();
      this.editorContent = this.contentMap[section.toLowerCase()] || '<p>No content available.</p>';
    }else{
      this.activeTab = this.openTabs[this.openTabs.length - 1];
      this.editorContent = this.contentMap[this.activeTab.toLowerCase()] || '<p>No content available.</p>';
    }
  }
}
