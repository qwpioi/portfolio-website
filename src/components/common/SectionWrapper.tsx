import React from 'react';
import type { ReactNode } from 'react';

/**
 * 区块包装器组件
 * 统一各模块的样式和布局
 */
interface SectionWrapperProps {
  children: ReactNode;
  /**
   * 区块标题
   */
  title?: string;
  /**
   * 区块副标题
   */
  subtitle?: string;
  /**
   * 右上角操作区
   */
  action?: React.ReactNode;
  /**
   * 背景样式
   */
  variant?: 'default' | 'card' | 'plain';
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 是否显示阴影
   */
  shadow?: boolean;
  /**
   * 内边距
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function SectionWrapper({
  children,
  title,
  subtitle,
  action,
  variant = 'card',
  className = '',
  shadow = true,
  padding = 'md',
}: SectionWrapperProps) {
  // 背景样式映射
  const variantClasses = {
    default: 'bg-white dark:bg-gray-900',
    card: 'bg-white dark:bg-gray-900 rounded-lg',
    plain: 'bg-transparent',
  };

  // 阴影样式
  const shadowClass = shadow ? 'shadow-md' : '';

  // 内边距映射
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <section
      className={`
        ${variantClasses[variant]}
        ${shadowClass}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {/* 标题栏 */}
      {(title || action) && (
        <div className="flex justify-between items-center mb-6">
          <div>
            {title && (
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex-shrink-0 ml-4">{action}</div>}
        </div>
      )}

      {/* 内容区 */}
      <div className={title || action ? '' : ''}>
        {children}
      </div>
    </section>
  );
}

/**
 * 卡片式区块（默认）
 */
export function CardSection({ children, ...props }: Omit<SectionWrapperProps, 'variant'>) {
  return (
    <SectionWrapper variant="card" {...props}>
      {children}
    </SectionWrapper>
  );
}

/**
 * _plain_ 区块（无背景）
 */
export function PlainSection({ children, ...props }: Omit<SectionWrapperProps, 'variant'>) {
  return (
    <SectionWrapper variant="plain" {...props}>
      {children}
    </SectionWrapper>
  );
}
