import React from 'react';
import type { ToolsGridProps } from './ToolsGrid.types';

export const ToolsGrid: React.FC<ToolsGridProps> = ({
  title = '常用工具',
  tools,
  columns = 5,
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 max-h-[280px]">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">{title}</h3>
      
      {/* 工具图标网格 */}
      <div 
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {tools.map((tool) => (
          <a
            key={tool.id}
            href={tool.url || '#'}
            target={tool.url ? '_blank' : undefined}
            rel={tool.url ? 'noopener noreferrer' : undefined}
            className="group flex flex-col items-center justify-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer"
            title={tool.name}
          >
            <div
              className="w-14 h-14 flex items-center justify-center rounded-2xl mb-2 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
              style={{ backgroundColor: tool.color + '20', color: tool.color }}
            >
              <span className="text-2xl">{tool.icon}</span>
            </div>
            <span className="text-xs text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
              {tool.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
