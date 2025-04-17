export interface Project {
  id: number;
  company: Company["id"];
  product: string;
  domains: string[];
  start: string;
  end?: string;
  url?: string;
  image?: any;
  videoUrl?: string;
}

export interface Company {
  id: number;
  name: string;
  url: string;
}
