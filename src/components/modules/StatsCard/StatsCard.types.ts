export interface StatData {
  label: string;
  value: number | string;
  suffix?: string;
  color?: string;
}

export interface StatsCardProps {
  stats: StatData[];
  buttonText?: string;
  onButtonClick?: () => void;
}
