import { Component } from '@angular/core';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TabsComponent } from "./components/tabs/tabs.component";
import { EditorComponent } from "./components/editor/editor.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [SidebarComponent, TabsComponent, EditorComponent]
})
export class AppComponent {
  openTabs: string[] = ['welcome'];
  activeTab: string = 'welcome';

  contentMap: { [key: string]: string } = {
    'welcome': '<h2>Welcome</h2><p>Select a section from the sidebar to view details.</p>',
    'experience': '<h2>Experience</h2><p>Details about work experience...</p>',
    'projects': '<h2>Projects</h2><p>Details about projects...</p>',
    'publications': '<h2>Publications</h2><p>Details about publications...</p>',
    'contact': '<h2>Contact</h2><p>Email: example@example.com</p>'
  };

  editorContent: string = this.contentMap['welcome'];

  openSection(section: string) {
    if (!this.openTabs.includes(section)) {
      this.openTabs.push(section);
    }
    this.switchTab(section);
  }

  updateOpenTabs(closedTab: string) {
    this.openTabs = this.openTabs.filter(tab => tab !== closedTab);
    if (this.activeTab === closedTab) {
      this.activeTab = this.openTabs.length > 0 ? this.openTabs[0] : '';
    }
  }

  switchTab(section: string) {
    this.activeTab = section;
    this.editorContent = this.contentMap[section.toLowerCase()] || '<p>No content available.</p>';
  }
}
