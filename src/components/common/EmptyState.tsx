import React from 'react';

/**
 * 空状态组件
 * 用于展示无数据时的占位界面
 */
interface EmptyStateProps {
  /**
   * 图标类型
   */
  icon?: 'project' | 'article' | 'work' | 'user' | 'search' | 'default';
  /**
   * 标题
   */
  title?: string;
  /**
   * 描述文字
   */
  description?: string;
  /**
   * 操作按钮
   */
  action?: React.ReactNode;
  /**
   * 自定义类名
   */
  className?: string;
}

export function EmptyState({
  icon = 'default',
  title = '暂无数据',
  description = '暂无相关内容展示',
  action,
  className = '',
}: EmptyStateProps) {
  // 图标映射
  const iconMap = {
    project: (
      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z" />
      </svg>
    ),
    article: (
      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
    work: (
      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      </svg>
    ),
    user: (
      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
    search: (
      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    ),
    default: (
      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    ),
  };

  return (
    <div
      className={`
        flex flex-col items-center justify-center
        py-12 px-4
        text-center
        ${className}
      `}
    >
      {/* 图标 */}
      <div className="text-gray-300 dark:text-gray-600 mb-4">
        {iconMap[icon]}
      </div>

      {/* 标题 */}
      {title && (
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
      )}

      {/* 描述 */}
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-md">
          {description}
        </p>
      )}

      {/* 操作按钮 */}
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
}

/**
 * 项目空状态
 */
export function EmptyProjects({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon="project"
      title="暂无项目"
      description="还没有添加任何项目，开始添加你的第一个项目吧！"
      action={action}
    />
  );
}

/**
 * 文章空状态
 */
export function EmptyArticles({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon="article"
      title="暂无文章"
      description="还没有发布任何文章，分享你的知识和经验！"
      action={action}
    />
  );
}

/**
 * 作品空状态
 */
export function EmptyWorks({ action }: { action?: React.ReactNode }) {
  return (
    <EmptyState
      icon="work"
      title="暂无作品"
      description="还没有上传任何作品，展示你的创意和才华！"
      action={action}
    />
  );
}
