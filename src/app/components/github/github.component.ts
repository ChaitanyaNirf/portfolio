import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { Root } from '../../model/interface/IGithub';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-github',
  imports: [CommonModule],
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {
  githubData: Root | null = null;

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.githubService.getUserData().subscribe((data) => {
      this.githubData = data;
      console.log('GitHub Data:', this.githubData);
    });
  }

  // Function to determine color based on contribution count
  getContributionColor(contributionCount: number): string {
    if (contributionCount === 0) return '#161b22'; // Default GitHub gray
    if (contributionCount <= 2) return '#0e4429'; // Light green
    if (contributionCount <= 5) return '#006d32'; // Medium green
    if (contributionCount <= 10) return '#26a641'; // Darker green
    return '#39d353'; // Brightest green
  }

  getStartMonthYear(): string {
    const weeks = this.githubData?.data?.viewer?.contributionsCollection?.contributionCalendar?.weeks;
    if (!weeks || weeks.length === 0) return '';
  
    // First contribution day (earliest date)
    const firstDate = weeks[0].contributionDays[0].date;
    return this.getMonthYearFromDate(firstDate);
  }
  
  getEndMonthYear(): string {
    const weeks = this.githubData?.data?.viewer?.contributionsCollection?.contributionCalendar?.weeks;
    if (!weeks || weeks.length === 0) return '';
  
    // Last contribution day (latest date)
    const lastWeek = weeks[weeks.length - 1];
    const lastDate = lastWeek.contributionDays[lastWeek.contributionDays.length - 1].date;
    return this.getMonthYearFromDate(lastDate);
  }
  
  getMonthYearFromDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' }); // Returns "Mar 2024", "Jan 2025", etc.
  }
  
  
}
