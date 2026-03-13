import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { PortfolioRowProps } from './PortfolioInfiniteScroll.types';
import { PortfolioItem } from './PortfolioItem';

export const PortfolioRow: React.FC<PortfolioRowProps> = ({
  items,
  direction = 'left',
  duration = 60,
  onItemHover = () => {},
  onItemLeave = () => {},
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!rowRef.current) return;

    // 无限滚动动画
    if (direction === 'left') {
      animationRef.current = gsap.to(rowRef.current, {
        xPercent: -50,
        duration: duration,
        repeat: -1,
        ease: 'linear',
      });
    } else {
      animationRef.current = gsap.fromTo(
        rowRef.current,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: duration,
          repeat: -1,
          ease: 'linear',
        }
      );
    }

    return () => {
      animationRef.current?.kill();
    };
  }, [direction, duration]);

  // 渲染时重复一次实现无缝滚动
  const displayItems = [...items, ...items];

  return (
    <div className="overflow-hidden py-4">
      <div ref={rowRef} className="flex">
        {displayItems.map((item, index) => (
          <PortfolioItem
            key={`${item.id}-${index}`}
            {...item}
            index={index}
            onHover={onItemHover}
            onLeave={onItemLeave}
          />
        ))}
      </div>
    </div>
  );
};
