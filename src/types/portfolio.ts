// 作品集数据类型定义

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link?: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  date: string;
  author: string;
}

export interface PortfolioItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface TechItem {
  id: string;
  name: string;
  icon: string;
  color?: string;
}

export interface ToolItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  url?: string;
}

export interface StatData {
  label: string;
  value: number | string;
  suffix?: string;
  color?: string;
}

export interface MediaTag {
  name: string;
  icon?: string;
}
