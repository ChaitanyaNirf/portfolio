export interface Root {
    data: Data
  }
  
  export interface Data {
    viewer: Viewer
  }
  
  export interface Viewer {
    login: string
    name: any
    avatarUrl: string
    repositories: Repositories
    pinnedItems: PinnedItems
    contributionsCollection: ContributionsCollection
  }
  
  export interface Repositories {
    totalCount: number
  }
  
  export interface PinnedItems {
    nodes: Node[]
  }
  
  export interface Node {
    name: string
    url: string
    description?: string
    stargazerCount: number
    forkCount: number
    primaryLanguage: PrimaryLanguage
  }
  
  export interface PrimaryLanguage {
    name: string
    color: string
  }
  
  export interface ContributionsCollection {
    contributionCalendar: ContributionCalendar
  }
  
  export interface ContributionCalendar {
    totalContributions: number
    weeks: Week[]
  }
  
  export interface Week {
    contributionDays: ContributionDay[]
  }
  
  export interface ContributionDay {
    contributionCount: number
    date: string
  }
  