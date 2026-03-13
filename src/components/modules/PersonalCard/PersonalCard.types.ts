export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email';
  url: string;
  icon: string;
}

export interface PersonalCardProps {
  name: string;
  title: string;
  avatar?: string;
  description?: string;
  tags?: string[];
  socialLinks?: SocialLink[];
}
