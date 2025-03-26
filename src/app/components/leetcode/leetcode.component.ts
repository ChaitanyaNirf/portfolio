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
  userProfile: any = {}; 
  isLoading: boolean = true;
  monthlyData: Map<string, { date: string; count: number }[]> = new Map();

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
  
        //calculate progress percentages
        this.userProfile = {
          username: data.username,
          globalRank: data.ranking || 'N/A',
          easySolved: data.easySolved || 0,
          mediumSolved: data.mediumSolved || 0,
          hardSolved: data.hardSolved || 0,
          totalEasy: data.totalEasy || 1,
          totalMedium: data.totalMedium || 1,
          totalHard: data.totalHard || 1,
          reputation: data.reputation || 0,
          contributionPoints: data.contributionPoints || 0,
          profileUrl: `https://leetcode.com/${data.username}`,
        };
        
        //calculate completion percentages
        this.userProfile.easyPercentage = (this.userProfile.easySolved / this.userProfile.totalEasy) * 100;
        this.userProfile.mediumPercentage = (this.userProfile.mediumSolved / this.userProfile.totalMedium) * 100;
        this.userProfile.hardPercentage = (this.userProfile.hardSolved / this.userProfile.totalHard) * 100;
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
    oneYearAgo.setDate(oneYearAgo.getDate() + 1);

    const submissionMap = new Map<string, number>();

    //convert API data (UNIX timestamp -> Date)
    for (const [timestamp, count] of Object.entries(submissionCalendar)) {
      const date = new Date(Number(timestamp) * 1000).toISOString().split('T')[0];
      submissionMap.set(date, Number(count));
    }

    this.monthlyData.clear();

    for (let d = new Date(oneYearAgo); d <= today; d = new Date(d.getTime() + 86400000)) {
      const dateString = d.toISOString().split('T')[0];
      const count = submissionMap.get(dateString) || 0;
      // Subtract 1 day because for the value of d is incrementing even before the iteration ends 
      let temp = new Date(d.getTime() - 86400000); 
      const monthKey = `${temp.getFullYear()}-${temp.getMonth()}`; 
      if (!this.monthlyData.has(monthKey)) {
        this.monthlyData.set(monthKey, []);
      }
      this.monthlyData.get(monthKey)!.push({ date: dateString, count });
    }
  }

  getMonthView(monthKey: string): { date: string; count: number }[][] {
    const days = this.monthlyData.get(monthKey) || [];
    if (days.length === 0) return [];

    const firstDayOfMonth = new Date(days[0].date);
    const startDay = firstDayOfMonth.getDay(); // 0 = Sunday, 6 = Saturday

    let weeks: { date: string; count: number }[][] = [];
    let currentWeek: { date: string; count: number }[] = Array(startDay).fill({ date: '', count: 0 });

    for (const entry of days) {
      currentWeek.push(entry);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Fill last week if needed
    if (currentWeek.length) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: 0 });
      }
      weeks.push(currentWeek);
    }

    return weeks;
  }

  getMonthName(monthKey: string): string {
    const [year, month] = monthKey.split('-').map(Number);
    return new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  getHeatmapColor(count: number): string {
    if (count === 0) return '#525452';

    const greenShades = [
      '#064e1f', '#0a6b2b', '#0e8837', '#12a543', '#16c14f',
      '#3edc6f', '#64e389', '#8aec9e', '#b1f3b5', '#d7fad0'
    ];
    return greenShades[Math.min(count, 10) - 1];
  }
}
