export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  stack: string[];
}

export interface ShowcaseItem {
  image: string;
  title: string;
  description: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  skills: string[];
  experience: Experience[];
  showcase: ShowcaseItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface Website {
  link: string;
  name: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  in?: string;
  github?: string;
  x?: string;
  cv?: string;
  website?: Website[];
}

export interface BasicInfo {
  name: string;
  title: string;
  company: string;
  address: Address;
  summary: string;
  openToWork: boolean;
  contact?: ContactInfo;
}
