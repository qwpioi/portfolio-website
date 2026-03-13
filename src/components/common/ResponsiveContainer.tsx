import React from 'react';
import type { ReactNode } from 'react';

/**
 * 响应式容器组件
 * 统一处理不同设备的布局和间距
 */
interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  /**
   * 设备类型
   * - mobile: 手机 (< 768px)
   * - tablet: 平板 (768px - 1024px)
   * - desktop: 桌面 (> 1024px)
   */
  device?: 'mobile' | 'tablet' | 'desktop' | 'all';
  /**
   * 最大宽度
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /**
   * 内边距
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function ResponsiveContainer({
  children,
  className = '',
  device = 'all',
  maxWidth = 'xl',
  padding = 'md',
}: ResponsiveContainerProps) {
  // 最大宽度映射
  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  // 内边距映射
  const paddingClasses = {
    none: '',
    sm: 'px-2 py-4',
    md: 'px-4 py-6',
    lg: 'px-6 py-8',
  };

  // 设备可见性
  const deviceClasses = {
    mobile: 'block md:hidden',
    tablet: 'hidden md:block lg:hidden',
    desktop: 'hidden lg:block',
    all: 'block',
  };

  return (
    <div
      className={`
        w-full mx-auto
        ${maxWidthClasses[maxWidth]}
        ${paddingClasses[padding]}
        ${deviceClasses[device]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/**
 * 移动端专用容器
 */
export function MobileContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <ResponsiveContainer device="mobile" className={className}>
      {children}
    </ResponsiveContainer>
  );
}

/**
 * 平板端专用容器
 */
export function TabletContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <ResponsiveContainer device="tablet" className={className}>
      {children}
    </ResponsiveContainer>
  );
}

/**
 * 桌面端专用容器
 */
export function DesktopContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <ResponsiveContainer device="desktop" className={className}>
      {children}
    </ResponsiveContainer>
  );
}
