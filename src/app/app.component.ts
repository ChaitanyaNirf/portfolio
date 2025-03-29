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
  openTabs: string[] = ['none','welcome'];
  activeTab: string = 'welcome';

  contentMap: { [key: string]: string } = {
    'welcome': `
      <h2>Welcome</h2>
      <p>Hi, I'm <strong>Chaitanya Nirfarake</strong>, a backend developer specializing in <strong>Node.js</strong>. 
      I work on designing, building, and optimizing backend systems to deliver scalable and efficient applications. 
      My expertise lies in writing clean, maintainable code and solving complex problems in distributed systems.</p>
      <p>Explore the sections in the sidebar to learn more about my work, projects, and contributions.</p>
    `,
  
    'experience': `
      <h2>Experience</h2>
      <h3>xyz Software</h3>
      <p><strong>Associate Product Developer</strong> (2023 - Present)</p>
      <ul>
        <li>Develop and maintain backend services using <strong>Node.js</strong>, ensuring high performance and scalability.</li>
        <li>Write comprehensive <strong>unit tests</strong> to ensure reliability and maintainability of the codebase.</li>
        <li>Design and implement <strong>new features</strong> while addressing customer requirements and product enhancements.</li>
        <li>Investigate and resolve complex <strong>bugs</strong> and <strong>customer escalations</strong>, providing direct support via customer calls.</li>
        <li>Work on <strong>security defect remediation</strong> to ensure compliance with industry best practices.</li>
        <li>Handle <strong>distributed systems</strong> and event-driven architectures using <strong>Kafka, Redis, and PostgreSQL</strong>.</li>
        <li>Deploy and manage applications in <strong>Kubernetes</strong>, ensuring seamless scalability.</li>
        <li>Recognized with the <strong>DSOM Pride Award</strong> in <strong>FY 25 Q3</strong> for outstanding contributions.</li>
      </ul>
    `,
  
    'projects': `
      <h2>Projects</h2>
  
      <h3>FlashCards</h3>
      <p>A web application designed to help users memorize information in a fun and interactive way.</p>
      <ul>
        <li>Backend built using <strong>Java Spring Boot</strong>, providing a robust and scalable API.</li>
        <li>Users can create <strong>flashcards</strong> with questions on the front and answers on the back.</li>
        <li>Supports self-assessment by allowing users to flip cards to check their answers.</li>
        <li>UI development is currently in progress using <strong>Angular</strong>.</li>
      </ul>
  
      <h3>Redis Client Tracking</h3>
      <p>A proof-of-concept (PoC) project aimed at solving cache invalidation challenges using Redis Client Tracking.</p>
      <ul>
        <li>Implemented a <strong>cache invalidation mechanism</strong> that automatically updates cached data when the underlying data changes.</li>
        <li>Utilized Redis’s built-in <strong>client tracking feature</strong> to improve efficiency.</li>
        <li>Presented the solution in a <strong>Tech Connect session</strong> to multiple teams at xyz Software.</li>
        <li>Open-source repository: <a href="https://github.com/ChaitanyaNirf/redis-client-tracking" target="_blank">GitHub Link</a></li>
      </ul>
    `,
  
    'publications': `
      <h2>Publications</h2>
      <p>I have contributed to technical discussions and internal knowledge-sharing sessions. One of my key presentations was on <strong>Redis Client Tracking</strong> during a Tech Connect session, where I demonstrated an efficient cache invalidation strategy.</p>
    `,
  
    'contact': `
      <h2>Contact</h2>
      <p><strong>Email:</strong> chaitanya@example.com</p>
      <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/chaitanyanirfarake" target="_blank">linkedin.com/in/chaitanyanirfarake</a></p>
      <p><strong>GitHub:</strong> <a href="https://github.com/ChaitanyaNirf" target="_blank">github.com/ChaitanyaNirf</a></p>
    `,
    'resume': `Handled by the resume component`,
    'github': `Handled by the github component`,
    'leetcode': `Handled by the leetcode component`,
    'skills' : `Handled by the skills component`,
    'none' : `<p>Nothing to see 🤷‍♂️</p>`
  };
  
  

  editorContent: string = this.contentMap['welcome'];

  openSection(section: string) {
    if (!this.openTabs.includes(section.toLowerCase())) {
      this.openTabs.push(section.toLowerCase());
    }
    this.switchTab(section.toLowerCase());
  }

  updateOpenTabs(closedTab: string) {
    this.openTabs = this.openTabs.filter(tab => tab !== closedTab);
    if (this.activeTab === closedTab) {
      this.activeTab = this.openTabs.length > 0 ? this.openTabs[0] : 'none';
      console.log('Switch tab ' + this.activeTab + ' after closing ' + closedTab);
    }
    if(this.openTabs.length == 1){
      console.log('TESTTTTT');
      this.activeTab = 'none';
      this.editorContent = 'Empty empty ';
    }
  }

  switchTab(section: string)  {
    console.log('Switch tab ' + section + '  open tabs : ' + this.openTabs);
    if(this.openTabs.includes(section.toLowerCase())){
      this.activeTab = section.toLowerCase();
      
      this.editorContent = this.contentMap[section.toLowerCase()] || '<p>No content available.</p>';
    }else{
      this.activeTab = this.openTabs[this.openTabs.length - 1];
      this.editorContent = this.contentMap[this.activeTab.toLowerCase()] || '<p>No content available.</p>';
    }
  }
}
