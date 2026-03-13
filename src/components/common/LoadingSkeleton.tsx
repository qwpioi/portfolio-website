

/**
 * 骨架屏组件 - 项目卡片
 */
export function ProjectSkeleton() {
  return (
    <div className="rounded-lg shadow-md p-4 animate-pulse bg-gray-200 dark:bg-gray-700">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
    </div>
  );
}

/**
 * 骨架屏组件 - 文章卡片
 */
export function ArticleSkeleton() {
  return (
    <div className="rounded-lg shadow-md p-4 animate-pulse bg-gray-200 dark:bg-gray-700">
      <div className="w-full h-40 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
    </div>
  );
}

/**
 * 骨架屏组件 - 基础信息
 */
export function BasicInfoSkeleton() {
  return (
    <div className="flex items-center gap-4 animate-pulse">
      <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      <div className="flex-1 space-y-2">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
      </div>
    </div>
  );
}
