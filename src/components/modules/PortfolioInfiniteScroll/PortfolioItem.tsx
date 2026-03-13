import React from 'react';
import type { PortfolioItem as PortfolioItemType } from './PortfolioInfiniteScroll.types';

interface PortfolioItemProps extends PortfolioItemType {
  index: number;
  onHover: (index: number) => void;
  onLeave: () => void;
}

export const PortfolioItem: React.FC<PortfolioItemProps> = ({
  image,
  title,
  description,
  index,
  onHover,
  onLeave,
}) => {
  return (
    <div
      className="portfolio-item flex-shrink-0 w-64 mx-2 relative group cursor-pointer"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      {/* 图片容器 */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* 悬停遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* 标题和描述 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h4 className="text-lg font-bold mb-1">{title}</h4>
          <p className="text-sm text-gray-200 line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  );
};
