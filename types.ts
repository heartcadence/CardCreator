export interface CardData {
  fullName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  phone: string;
  website: string;
  tagline: string;
  address: string;
  logoUrl?: string;
}

export interface CardProps {
  data: CardData;
  scale?: number;
}