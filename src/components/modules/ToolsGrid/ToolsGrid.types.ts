export interface ToolItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  url?: string;
}

export interface ToolsGridProps {
  title?: string;
  tools: ToolItem[];
  columns?: number;
}
