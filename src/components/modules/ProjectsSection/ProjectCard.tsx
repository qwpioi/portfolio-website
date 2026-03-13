import React from 'react';
import type { Project } from './ProjectsSection.types';

interface ProjectCardProps extends Project {
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  category,
  image,
  onClick,
}) => {
  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* 图片容器 */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
        
        {/* 分类标签 */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 rounded-lg text-xs font-medium">
            {category}
          </span>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-200 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};
