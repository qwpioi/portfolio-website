import React from 'react';
import type { TechStackCardProps } from './TechStackCard.types';

export const TechStackCard: React.FC<TechStackCardProps> = ({
  title = '技术栈',
  techs,
  terminalCommand = 'npm run dev',
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">{title}</h3>
      
      {/* 技术图标网格 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {techs.map((tech) => (
          <div
            key={tech.id}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
            title={tech.name}
          >
            <span className="text-3xl mb-2">{tech.icon}</span>
            <span className="text-xs text-gray-600 font-medium">{tech.name}</span>
          </div>
        ))}
      </div>

      {/* 终端样式 */}
      <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-green-400">
          <span className="text-blue-400">➜</span>
          <span className="text-purple-400 ml-2">~</span>
          <span className="text-white ml-2">{terminalCommand}</span>
        </div>
      </div>
    </div>
  );
};
