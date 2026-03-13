export interface MediaTag {
  name: string;
  icon?: string;
}

export interface StudioCardProps {
  title?: string;
  description?: string;
  mediaTags?: MediaTag[];
  gradient?: 'pink-orange' | 'purple-blue' | 'custom';
}
