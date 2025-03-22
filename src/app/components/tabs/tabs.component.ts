import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
[x: string]: any;
  @Input() openTabs: string[] = []; 
  @Input() activeTab: string = '';

  @Output() tabChanged = new EventEmitter<string>();
  @Output() tabClosed = new EventEmitter<string>();

  switchTab(tab: string) {
    this.tabChanged.emit(tab);
  }

  closeTab(tab: string) {
    this.tabClosed.emit(tab);
  }
}
