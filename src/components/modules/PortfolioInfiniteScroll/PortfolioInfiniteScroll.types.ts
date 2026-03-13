export interface PortfolioItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface PortfolioRowProps {
  items: PortfolioItem[];
  direction?: 'left' | 'right';
  duration?: number;
  onItemHover?: (index: number) => void;
  onItemLeave?: () => void;
}

export interface PortfolioInfiniteScrollProps {
  title?: string;
  row1Items: PortfolioItem[];
  row2Items: PortfolioItem[];
  row3Items: PortfolioItem[];
}
