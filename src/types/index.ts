export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  status?: string;
}

export interface TechItem {
  name: string;
  hot: boolean;
}
