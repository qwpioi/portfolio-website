import React, { useState } from 'react';
import gsap from 'gsap';
import type { PortfolioInfiniteScrollProps } from './PortfolioInfiniteScroll.types';
import { PortfolioRow } from './PortfolioRow';

export const PortfolioInfiniteScroll: React.FC<PortfolioInfiniteScrollProps> = ({
  title = '作品展示',
  row1Items,
  row2Items,
  row3Items,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 处理悬停效果
  const handleItemHover = (rowIndex: number, itemIndex: number) => {
    setHoveredIndex(itemIndex);
    
    // 当前项放大
    const currentItem = document.querySelectorAll(`.portfolio-row:nth-child(${rowIndex + 1}) .portfolio-item`)[itemIndex];
    if (currentItem) {
      gsap.to(currentItem, {
        scale: 1.3,
        zIndex: 100,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    }
    
    // 其他项变暗变模糊
    gsap.to(`.portfolio-row:nth-child(${rowIndex + 1}) .portfolio-item:not(:nth-child(${itemIndex + 1}))`, {
      filter: 'blur(4px) brightness(0.6)',
      duration: 0.3,
    });
  };

  const handleItemLeave = (rowIndex: number) => {
    setHoveredIndex(null);
    
    // 恢复所有项
    gsap.to(`.portfolio-row:nth-child(${rowIndex + 1}) .portfolio-item`, {
      scale: 1,
      zIndex: 1,
      boxShadow: 'none',
      filter: 'none',
      duration: 0.3,
    });
  };

  return (
    <div className="mb-10">
      {/* 标题 */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      {/* 三行滚动 */}
      <div className="space-y-2">
        {/* 第 1 行：向左 */}
        <div className="portfolio-row">
          <PortfolioRow
            items={row1Items}
            direction="left"
            duration={60}
            onItemHover={(index) => handleItemHover(0, index)}
            onItemLeave={() => handleItemLeave(0)}
          />
        </div>

        {/* 第 2 行：向右 */}
        <div className="portfolio-row">
          <PortfolioRow
            items={row2Items}
            direction="right"
            duration={60}
            onItemHover={(index) => handleItemHover(1, index)}
            onItemLeave={() => handleItemLeave(1)}
          />
        </div>

        {/* 第 3 行：向左 */}
        <div className="portfolio-row">
          <PortfolioRow
            items={row3Items}
            direction="left"
            duration={60}
            onItemHover={(index) => handleItemHover(2, index)}
            onItemLeave={() => handleItemLeave(2)}
          />
        </div>
      </div>
    </div>
  );
};
