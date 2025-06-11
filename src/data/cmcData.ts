
import { v4 as uuidv4 } from 'uuid';

export const cmcData = {
  tokenomics: {
    tokenSymbol: "BLAST",
    name: "Blast Token",
    totalSupply: 100000000,
    initialPrice: 0.05,
    description: "BLAST is the utility token that powers the Blast ecosystem.",
    tokenAllocations: [
      { id: uuidv4(), category: "Team", percentage: 15, color: "#8884d8" },
      { id: uuidv4(), category: "Advisors", percentage: 5, color: "#82ca9d" },
      { id: uuidv4(), category: "Public Sale", percentage: 30, color: "#ffc658" },
      { id: uuidv4(), category: "Marketing", percentage: 10, color: "#ff8042" },
      { id: uuidv4(), category: "Ecosystem", percentage: 25, color: "#0088fe" },
      { id: uuidv4(), category: "Reserve", percentage: 15, color: "#00C49F" }
    ]
  },
  roadmap: {
    title: "Project Roadmap",
    description: "Our development timeline and milestones",
    items: [
      {
        id: uuidv4(),
        quarter: "Q1",
        year: 2023,
        title: "Project Launch",
        description: "Initial concept development and team formation.",
        status: "completed"
      },
      {
        id: uuidv4(),
        quarter: "Q2",
        year: 2023,
        title: "Whitepaper Release",
        description: "Publication of comprehensive project documentation.",
        status: "completed"
      },
      {
        id: uuidv4(),
        quarter: "Q3",
        year: 2023,
        title: "Private Sale",
        description: "First funding round for early investors.",
        status: "completed"
      },
      {
        id: uuidv4(),
        quarter: "Q4",
        year: 2023,
        title: "Platform Development",
        description: "Core technology development and testing.",
        status: "in-progress"
      },
      {
        id: uuidv4(),
        quarter: "Q1",
        year: 2024,
        title: "Public Sale",
        description: "Token distribution to the general public.",
        status: "upcoming"
      },
      {
        id: uuidv4(),
        quarter: "Q2",
        year: 2024,
        title: "Exchange Listings",
        description: "BLAST token will be listed on major exchanges.",
        status: "upcoming"
      }
    ]
  },
  faq: {
    items: [
      {
        id: uuidv4(),
        question: "What is the BLAST token?",
        answer: "BLAST is the utility token that powers the Blast ecosystem, providing governance rights and access to platform features.",
        order: 1
      },
      {
        id: uuidv4(),
        question: "How can I participate in the ICO?",
        answer: "You can participate in the ICO by registering on our platform and completing the KYC process. Once approved, you can purchase tokens during the public sale period.",
        order: 2
      },
      {
        id: uuidv4(),
        question: "What is the minimum investment?",
        answer: "The minimum investment for the ICO is 100 USD equivalent in the accepted cryptocurrencies (ETH, BTC, USDT).",
        order: 3
      },
      {
        id: uuidv4(),
        question: "When will tokens be distributed?",
        answer: "Tokens will be distributed to investors within 7 days after the completion of the public sale.",
        order: 4
      },
      {
        id: uuidv4(),
        question: "Is there a vesting period?",
        answer: "Yes, team and advisor tokens are subject to a 2-year vesting period with 6-month cliff. Public sale tokens have no vesting period.",
        order: 5
      }
    ]
  }
};
