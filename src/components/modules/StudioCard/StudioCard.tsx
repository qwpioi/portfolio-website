import React from 'react';
import type { StudioCardProps } from './StudioCard.types';

export const StudioCard: React.FC<StudioCardProps> = ({
  title = '创意工作室',
  description = '专注于创意设计与用户体验，打造令人难忘的数字产品。',
  mediaTags = [
    { name: 'Figma', icon: '🎨' },
    { name: 'Sketch', icon: '✏️' },
    { name: 'Adobe CC', icon: '📷' },
  ],
  gradient = 'pink-orange',
}) => {
  const gradientClasses = {
    'pink-orange': 'bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-500',
    'purple-blue': 'bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500',
    'custom': 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
  };

  return (
    <div className={`${gradientClasses[gradient]} rounded-2xl p-7 text-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full`}>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      
      <p className="text-white/90 text-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* 媒体标签 */}
      {mediaTags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/20">
          {mediaTags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-medium hover:bg-white/30 transition-colors duration-200 cursor-default flex items-center gap-1.5"
            >
              {tag.icon && <span>{tag.icon}</span>}
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
