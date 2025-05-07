
// Token Allocation Types
export interface TokenAllocation {
  id: string;
  category: string;
  percentage: number;
  color: string;
}

// Roadmap Types
export interface RoadmapItem {
  id: string;
  quarter: string;
  year: number;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
}

// FAQ Types
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  category?: string;
}

export interface TokenInformation {
  symbol: string;
  name: string;
  totalSupply: number;
  initialPrice: number;
  description: string;
}
