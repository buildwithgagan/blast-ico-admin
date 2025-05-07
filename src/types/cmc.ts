
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

// Alias for backwards compatibility
export type RoadmapMilestone = RoadmapItem;

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

export interface Roadmap {
  title: string;
  description: string;
  items: RoadmapItem[];
}

export interface Tokenomics {
  tokenSymbol: string;
  totalSupply: string | number;
  initialPrice: string | number;
  description: string;
  tokenAllocations: TokenAllocation[];
}
