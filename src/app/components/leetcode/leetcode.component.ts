import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LeetcodeService } from '../../services/leetcode.service';
import { ILeetCodeStatus } from '../../model/interface/ILeetcode';

@Component({
  selector: 'app-leetcode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leetcode.component.html',
  styleUrls: ['./leetcode.component.css']
})
export class LeetcodeComponent implements OnInit {
  leetcodeData: ILeetCodeStatus | undefined;
  isLoading: boolean = true;
  lastYearSubmissions: { date: string; count: number }[] = [];
  weeks: { date: string; count: number }[][] = [];
  monthLabels: { name: string; position: number }[] = [];

  constructor(private leetcodeService: LeetcodeService) {}

  ngOnInit() {
    this.fetchLeetcodeData();
  }

  fetchLeetcodeData() {
    this.leetcodeService.getUserData().subscribe({
      next: (data) => {
        this.leetcodeData = data;
        this.processSubmissionData();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching LeetCode data', err);
        this.isLoading = false;
      }
    });
  }

  processSubmissionData() {
    if (!this.leetcodeData || !this.leetcodeData.submissionCalendar) return;
  
    const submissionCalendar = this.leetcodeData.submissionCalendar;
    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);
  
    this.lastYearSubmissions = [];
  
    // Step 1: Convert API data (UNIX timestamp -> Date)
    for (const [timestamp, count] of Object.entries(submissionCalendar)) {
      const date = new Date(Number(timestamp) * 1000); // Convert UNIX timestamp (s) to JS Date (ms)
      if (date >= oneYearAgo && date <= today) {
        this.lastYearSubmissions.push({
          date: date.toISOString().split('T')[0], // Format: YYYY-MM-DD
          count: Number(count)
        });
      }
    }
  
    // Step 2: Fill missing days with 0 submissions
    const filledData = new Map<string, number>();
  
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
  
      filledData.set(dateString, this.lastYearSubmissions.find(d => d.date === dateString)?.count || 0);
    }
  
    this.lastYearSubmissions = Array.from(filledData.entries()).map(([date, count]) => ({
      date,
      count
    })).reverse(); // Reverse to maintain chronological order
  
    // Step 3: Organize into weeks
    this.weeks = [];
    let currentWeek: { date: string; count: number }[] = [];
    
    for (let i = 0; i < this.lastYearSubmissions.length; i++) {
      const entry = this.lastYearSubmissions[i];
      currentWeek.push(entry);
      
      if (currentWeek.length === 7 || i === this.lastYearSubmissions.length - 1) {
        this.weeks.push(currentWeek);
        currentWeek = [];
      }
    }
  
    // Step 4: Generate month labels with better alignment
    this.monthLabels = [];
    let lastMonth = '';
  
    for (let weekIndex = 0; weekIndex < this.weeks.length; weekIndex++) {
      const firstDayOfWeek = new Date(this.weeks[weekIndex][0].date);
      const monthName = firstDayOfWeek.toLocaleString('default', { month: 'short' });
  
      if (monthName !== lastMonth) {
        this.monthLabels.push({
          name: monthName,
          position: weekIndex
        });
        lastMonth = monthName;
      }
    }
  }
  
  

  getHeatmapColor(count: number): string {
    if (count === 0) return '#525452'; // Gray for 0
  
    // Generate a shade of green from dark to light based on count (1 to 10)
    const greenShades = [
      '#064e1f', // 1 - Darkest green
      '#0a6b2b', // 2
      '#0e8837', // 3
      '#12a543', // 4
      '#16c14f', // 5
      '#3edc6f', // 6
      '#64e389', // 7
      '#8aec9e', // 8
      '#b1f3b5', // 9
      '#d7fad0'  // 10 - Lightest green
    ];
  
    return greenShades[Math.min(count, 10) - 1]; // Ensure count stays within bounds
  }
  
  isMonthChange(weekIndex: number): boolean {
    if (weekIndex === 0) return false;
    const prevWeek = this.weeks[weekIndex - 1];
    const currentWeek = this.weeks[weekIndex];
  
    const prevMonth = new Date(prevWeek[0].date).getMonth();
    const currentMonth = new Date(currentWeek[0].date).getMonth();
  
    return prevMonth !== currentMonth;
  }
  
}
