
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  order: number;
}

export interface TeamsData {
  title: string;
  description: string;
  members: TeamMember[];
}
