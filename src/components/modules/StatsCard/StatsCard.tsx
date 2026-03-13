import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { StatsCardProps } from './StatsCard.types';

export const StatsCard: React.FC<StatsCardProps> = ({
  stats,
  buttonText = '查看全部项目',
  onButtonClick,
}) => {
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // GSAP 数字动画
  useEffect(() => {
    countersRef.current.forEach((counter, index) => {
      if (counter) {
        const target = stats[index].value;
        if (typeof target === 'number') {
          gsap.to(counter, {
            textContent: target,
            duration: 2,
            snap: { textContent: 1 },
            ease: 'power2.out',
          });
        }
      }
    });
  }, [stats]);

  const setCounterRef = (el: HTMLSpanElement | null, index: number) => {
    countersRef.current[index] = el;
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-7 text-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full">
      <h3 className="text-lg font-semibold mb-6">数据统计</h3>

      {/* 统计数据 */}
      <div className="space-y-5 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">{stat.label}</span>
            <div className="flex items-baseline gap-1">
              <span
                ref={(el) => { countersRef.current[index] = el; }}
                className={`text-2xl font-bold ${stat.color || 'text-blue-400'}`}
              >
                0
              </span>
              {stat.suffix && <span className="text-gray-400 text-sm">{stat.suffix}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* 按钮 */}
      {buttonText && (
        <button
          onClick={onButtonClick}
          className="w-full py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-200"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};
