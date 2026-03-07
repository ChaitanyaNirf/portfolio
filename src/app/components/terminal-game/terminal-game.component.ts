import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

interface TypingChallenge {
  code: string;
  language: string;
  description: string;
}

interface LeaderboardEntry {
  name: string;
  wpm: number;
  accuracy: number;
  date: string;
  mode: 'coding' | 'prose';
}

@Component({
  selector: 'app-terminal-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal-game.component.html',
  styleUrls: ['./terminal-game.component.css']
})
export class TerminalGameComponent implements OnInit, OnDestroy {
  @ViewChild('typingInput') typingInput!: ElementRef<HTMLInputElement>;

  challenges: TypingChallenge[] = [
    { code: 'console.log("Hello, World!");', language: 'JavaScript', description: 'The classic first program' },
    { code: 'const sum = (a, b) => a + b;', language: 'JavaScript', description: 'Arrow function magic' },
    { code: 'git commit -m "initial commit"', language: 'Git', description: 'Every project starts here' },
    { code: 'npm install --save express', language: 'Terminal', description: 'Building a server' },
    { code: 'SELECT * FROM users WHERE id = 1;', language: 'SQL', description: 'Query the database' },
    { code: 'docker build -t myapp:latest .', language: 'Docker', description: 'Containerize it!' },
    { code: 'kubectl apply -f deployment.yaml', language: 'K8s', description: 'Deploy to production' },
    { code: 'const app = express();', language: 'Node.js', description: 'Start the Express app' },
    { code: 'interface User { name: string; }', language: 'TypeScript', description: 'Type safety first' },
    { code: 'redis.set("key", "value");', language: 'Redis', description: 'Cache all the things' },
    { code: 'ng serve --port 4200', language: 'Angular', description: 'Fire up the dev server' },
    { code: 'kafka.producer.send(message);', language: 'Kafka', description: 'Stream the events' },
    { code: 'import React from "react";', language: 'React', description: 'Another way to build UIs' },
    { code: 'python -m pip install flask', language: 'Python', description: 'The micro framework' },
    { code: 'CREATE TABLE posts (id INT);', language: 'SQL', description: 'Schema design time' },
  ];

  proseChallenges: TypingChallenge[] = [
    { code: 'The quick brown fox jumps over the lazy dog.', language: 'English', description: 'Classic pangram' },
    { code: 'To be or not to be, that is the question.', language: 'Shakespeare', description: 'Hamlet quote' },
    { code: 'All that glitters is not gold.', language: 'Proverb', description: 'Words of wisdom' },
    { code: 'A journey of a thousand miles begins with a single step.', language: 'Proverb', description: 'Laozi quote' },
    { code: 'That\'s one small step for man, one giant leap for mankind.', language: 'History', description: 'Moon landing' },
    { code: 'I have a dream that one day this nation will rise up.', language: 'History', description: 'MLK Jr.' },
    { code: 'Two things are infinite: the universe and human stupidity.', language: 'Einstein', description: 'Science quote' },
    { code: 'Be the change that you wish to see in the world.', language: 'Gandhi', description: 'Inspirational' },
    { code: 'In the middle of difficulty lies opportunity.', language: 'Einstein', description: 'Motivation' },
    { code: 'The only limit to our realization of tomorrow will be our doubts of today.', language: 'FDR', description: 'Motivation' },
  ];

  currentChallenge!: TypingChallenge;
  gameMode: 'coding' | 'prose' = 'coding';
  leaderboardMode: 'coding' | 'prose' | 'all' = 'all';
  userInput: string = '';
  playerName: string = '';
  gameState: 'idle' | 'name-entry' | 'playing' | 'finished' = 'idle';
  score: number = 0;
  round: number = 0;
  totalRounds: number = 5;
  startTime: number = 0;
  elapsedTime: number = 0;
  wpm: number = 0;
  accuracy: number = 100;
  bestWpm: number = 0;
  countdown: number = 3;
  isCountingDown: boolean = false;
  timerInterval: any;
  completedChallenges: { challenge: TypingChallenge; wpm: number; accuracy: number; time: number }[] = [];
  terminalLines: string[] = [];
  leaderboard: LeaderboardEntry[] = [];
  isNewRecord: boolean = false;

  ngOnInit() {
    this.loadLeaderboard();
    this.addTerminalLine('$ Welcome to the Coding Speed Test!');
    this.addTerminalLine('$ Type the code snippets as fast as you can.');
    this.addTerminalLine('$ Press "Start Game" when ready...');
  }

  ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  async loadLeaderboard() {
    this.leaderboard = [];
    try {
      if (true) { // backend handles the key logic, so always try
        this.addTerminalLine('$ Syncing with global database...');
        const response = await fetch(`https://portfolio-backend-eight-hazel.vercel.app/leaderboard`);
        if (response.ok) {
          const data = await response.json();
          this.leaderboard = data.record || [];
          return;
        }
      }
    } catch(err) {
      console.error('Failed to load global leaderboard', err);
    }
    
    // Fallback to local storage
    try {
      const saved = localStorage.getItem('portfolio_leaderboard');
      if (saved) {
        this.leaderboard = JSON.parse(saved);
      }
    } catch {
      this.leaderboard = [];
    }

    if (this.leaderboard.length === 0) {
      this.addTerminalLine('$ Global DB unreachable. Using Local Storage.');
    }
  }

  async saveToLeaderboard(name: string, wpm: number, accuracy: number) {
    const entry: LeaderboardEntry = {
      name: name || 'Anonymous',
      wpm: wpm,
      accuracy: accuracy,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      mode: this.gameMode
    };
    this.leaderboard.push(entry);
    this.leaderboard.sort((a, b) => b.wpm - a.wpm);
    this.leaderboard = this.leaderboard.slice(0, 10); // Keep only top 10
    
    // Always save locally as fallback
    localStorage.setItem('portfolio_leaderboard', JSON.stringify(this.leaderboard));

    if (true) {
       try {
         this.addTerminalLine('$ Uploading score to global database...');
         await fetch(`https://portfolio-backend-eight-hazel.vercel.app/leaderboard`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({ record: this.leaderboard })
         });
       } catch(err) {
         console.error('Failed to save to global leaderboard', err);
       }
    }

    // Check if this entry is on the leaderboard
    this.isNewRecord = this.leaderboard.some(e => e.wpm === wpm && e.name === entry.name && e.date === entry.date && e.mode === entry.mode);
  }

  setGameMode(mode: 'coding' | 'prose') {
    this.gameMode = mode;
  }

  getFilteredLeaderboard() {
    if (this.leaderboardMode === 'all') return this.leaderboard;
    return this.leaderboard.filter(e => e.mode === this.leaderboardMode);
  }

  addTerminalLine(line: string) {
    this.terminalLines.push(line);
    if (this.terminalLines.length > 8) {
      this.terminalLines.shift();
    }
  }

  startGame() {
    this.gameState = 'name-entry';
    this.playerName = '';
  }

  beginAfterName() {
    if (!this.playerName.trim()) this.playerName = 'Anonymous';
    this.score = 0;
    this.round = 0;
    this.completedChallenges = [];
    this.terminalLines = [];
    this.addTerminalLine(`$ Player: ${this.playerName}`);
    this.addTerminalLine(`$ Mode: ${this.gameMode.toUpperCase()}`);
    this.addTerminalLine(`$ Initializing challenge...`);
    this.isCountingDown = true;
    this.countdown = 3;
    this.gameState = 'playing';

    const countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(countdownInterval);
        this.isCountingDown = false;
        this.nextChallenge();
      }
    }, 800);
  }

  nextChallenge() {
    if (this.round >= this.totalRounds) {
      this.finishGame();
      return;
    }

    const sourceArray = this.gameMode === 'coding' ? this.challenges : this.proseChallenges;
    const available = sourceArray.filter(
      c => !this.completedChallenges.some(cc => cc.challenge.code === c.code)
    );
    this.currentChallenge = available[Math.floor(Math.random() * available.length)];
    this.userInput = '';
    this.startTime = Date.now();
    this.elapsedTime = 0;
    this.round++;

    this.addTerminalLine(`$ Round ${this.round}/${this.totalRounds} — ${this.currentChallenge.language}`);

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.elapsedTime = (Date.now() - this.startTime) / 1000;
    }, 100);

    setTimeout(() => {
      if (this.typingInput) {
        this.typingInput.nativeElement.focus();
      }
    }, 100);
  }

  onInput(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.userInput = input;

    if (input === this.currentChallenge.code) {
      clearInterval(this.timerInterval);
      const timeTaken = (Date.now() - this.startTime) / 1000;
      const words = this.currentChallenge.code.length / 5;
      const roundWpm = Math.round((words / timeTaken) * 60);
      const roundAccuracy = this.calculateAccuracy(input, this.currentChallenge.code);

      this.completedChallenges.push({
        challenge: this.currentChallenge,
        wpm: roundWpm,
        accuracy: roundAccuracy,
        time: Math.round(timeTaken * 10) / 10
      });

      this.score += Math.round(roundWpm * (roundAccuracy / 100));
      this.addTerminalLine(`  ✓ Complete! ${roundWpm} WPM in ${timeTaken.toFixed(1)}s`);

      setTimeout(() => this.nextChallenge(), 800);
    }
  }

  onNameKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.beginAfterName();
    }
  }

  calculateAccuracy(input: string, target: string): number {
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === target[i]) correct++;
    }
    return Math.round((correct / target.length) * 100);
  }

  getCharClass(index: number): string {
    if (index >= this.userInput.length) return 'pending';
    return this.userInput[index] === this.currentChallenge.code[index] ? 'correct' : 'incorrect';
  }

  async finishGame() {
    this.gameState = 'finished';
    clearInterval(this.timerInterval);

    const avgWpm = Math.round(
      this.completedChallenges.reduce((sum, c) => sum + c.wpm, 0) / this.completedChallenges.length
    );
    this.wpm = avgWpm;
    this.accuracy = Math.round(
      this.completedChallenges.reduce((sum, c) => sum + c.accuracy, 0) / this.completedChallenges.length
    );

    await this.saveToLeaderboard(this.playerName, avgWpm, this.accuracy);

    if (this.isNewRecord) {
      this.addTerminalLine(`$ 🏆 You made the Top 10!`);
    }
    this.addTerminalLine(`$ Game complete! Score: ${this.score}`);
    this.addTerminalLine(`$ Avg WPM: ${avgWpm} | Accuracy: ${this.accuracy}%`);
  }

  resetGame() {
    this.gameState = 'idle';
    this.terminalLines = [];
    this.isNewRecord = false;
    this.loadLeaderboard();
    this.addTerminalLine('$ Ready for another round?');
    this.addTerminalLine('$ Press "Start Game" when ready...');
  }

  getRankEmoji(index: number): string {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  }
}
