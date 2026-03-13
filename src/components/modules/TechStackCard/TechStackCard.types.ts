export interface TechItem {
  id: string;
  name: string;
  icon: string;
  color?: string;
}

export interface TechStackCardProps {
  title?: string;
  techs: TechItem[];
  terminalCommand?: string;
}
