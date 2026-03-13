import React from 'react';
import type { ProjectsSectionProps } from './ProjectsSection.types';
import { ProjectCard } from './ProjectCard';

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  title = '精选项目',
  projects,
  viewAllText = '查看全部',
  onViewAll,
}) => {
  return (
    <div className="mb-10">
      {/* 标题栏 */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors duration-200"
          >
            {viewAllText} →
          </button>
        )}
      </div>

      {/* 项目网格 */}
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <p className="text-gray-500">暂无项目展示</p>
        </div>
      )}
    </div>
  );
};
