import { Component, HostListener, Output, EventEmitter, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Constants } from '../../../constants/Constants';

interface Command {
  id: string;
  title: string;
  category: string;
  icon: string;
  action: () => void;
}

@Component({
  selector: 'app-command-palette',
  exportAs: 'commandPalette',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './command-palette.component.html',
  styleUrls: ['./command-palette.component.css']
})
export class CommandPaletteComponent implements OnInit {
  @Output() commandNavigate = new EventEmitter<string>();
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  isVisible = false;
  searchQuery = '';
  selectedIndex = 0;
  
  commands: Command[] = [];
  filteredCommands: Command[] = [];

  ngOnInit() {
    this.initCommands();
    this.filteredCommands = [...this.commands];
  }

  initCommands() {
    // Generate navigation commands from ALL_TABS
    const navCommands = Constants.ALL_TABS.map((tab: string) => ({
      id: `nav-${tab.toLowerCase()}`,
      title: `View ${tab}`,
      category: 'Navigation',
      icon: 'fas fa-file-code',
      action: () => this.commandNavigate.emit(tab.toLowerCase())
    }));

    // Add external actions
    const actionCommands: Command[] = [
      {
        id: 'action-github',
        title: 'Open GitHub Profile',
        category: 'External',
        icon: 'fab fa-github',
        action: () => globalThis.open('https://github.com/ChaitanyaNirf', '_blank')
      },
      {
        id: 'action-linkedin',
        title: 'Open LinkedIn Profile',
        category: 'External',
        icon: 'fab fa-linkedin',
        action: () => globalThis.open('https://www.linkedin.com/in/chaitanya-nirfarake-175570222', '_blank')
      },
      {
        id: 'action-email',
        title: 'Send Email',
        category: 'External',
        icon: 'fas fa-envelope',
        action: () => globalThis.location.href = 'mailto:chaitanya.nirfarake@gmail.com'
      }
    ];

    this.commands = [...navCommands, ...actionCommands];
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'p') {
      event.preventDefault();
      this.togglePalette();
    } else if (event.key === 'Escape' && this.isVisible) {
      this.closePalette();
    } else if (this.isVisible) {
      this.handleNavigation(event);
    }
  }

  handleNavigation(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.filteredCommands.length;
      this.scrollToSelected();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + this.filteredCommands.length) % this.filteredCommands.length;
      this.scrollToSelected();
    } else if (event.key === 'Enter' && this.filteredCommands.length > 0) {
      event.preventDefault();
      this.executeCommand(this.filteredCommands[this.selectedIndex]);
    }
  }

  scrollToSelected() {
    setTimeout(() => {
      const activeEl = document.querySelector('.command-item.selected');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  }

  togglePalette() {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.searchQuery = '';
      this.filterCommands();
      setTimeout(() => this.searchInput?.nativeElement.focus(), 50);
    }
  }

  closePalette() {
    this.isVisible = false;
  }

  onSearchChange() {
    this.filterCommands();
  }

  filterCommands() {
    const query = this.searchQuery.toLowerCase().trim();
    if (query) {
      this.filteredCommands = this.commands.filter(cmd => 
        cmd.title.toLowerCase().includes(query) || 
        cmd.category.toLowerCase().includes(query)
      );
    } else {
      this.filteredCommands = [...this.commands];
    }
    this.selectedIndex = 0;
  }

  executeCommand(command: Command) {
    command.action();
    this.closePalette();
  }
}
