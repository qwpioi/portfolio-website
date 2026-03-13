export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link?: string;
}

export interface ProjectsSectionProps {
  title?: string;
  projects: Project[];
  viewAllText?: string;
  onViewAll?: () => void;
}
