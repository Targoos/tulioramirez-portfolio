import type { LucideIcon } from "lucide-react";

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

export interface IconLink {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly href: string;
}
