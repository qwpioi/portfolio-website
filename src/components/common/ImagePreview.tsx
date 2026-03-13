import React, { useState } from 'react';
import { Modal, Image } from 'antd';

/**
 * 图片预览组件
 * 支持点击放大查看
 */
interface ImagePreviewProps {
  src: string;
  alt?: string;
  className?: string;
  /**
   * 图片尺寸
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * 是否圆形
   */
  circular?: boolean;
  /**
   * 点击放大
   */
  preview?: boolean;
  /**
   * 加载失败占位图
   */
  placeholder?: string;
}

export function ImagePreview({
  src,
  alt = '',
  className = '',
  size = 'md',
  circular = false,
  preview = true,
  placeholder = '',
}: ImagePreviewProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 尺寸映射
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  // 圆形样式
  const shapeClass = circular ? 'rounded-full' : 'rounded-lg';

  // 处理加载失败
  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  // 处理加载完成
  const handleLoad = () => {
    setLoading(false);
  };

  // 渲染图片内容
  const renderImage = () => {
    if (loading) {
      // 加载中占位
      return (
        <div className={`w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse ${shapeClass}`} />
      );
    }

    if (error || !src) {
      // 加载失败占位
      return (
        <div className={`w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${shapeClass}`}>
          {placeholder ? (
            <img src={placeholder} alt="placeholder" className="w-full h-full object-cover" />
          ) : (
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
          )}
        </div>
      );
    }

    // 正常图片
    return (
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${shapeClass} ${preview ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
        onLoad={handleLoad}
        onError={handleError}
      />
    );
  };

  return (
    <>
      {/* 图片容器 */}
      <div className={`${sizeClasses[size]} ${className} overflow-hidden`}>
        {preview ? (
          <Image
            src={src}
            alt={alt}
            className={`w-full h-full object-cover ${shapeClass}`}
            preview={{
              mask: false,
            }}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
          />
        ) : (
          renderImage()
        )}
      </div>
    </>
  );
}

/**
 * 头像专用组件
 */
export function AvatarPreview({ src, alt, size = 'md', onClick }: { src: string; alt?: string; size?: 'sm' | 'md' | 'lg' | 'xl'; onClick?: () => void }) {
  return (
    <div 
      className={`cursor-pointer ${onClick ? 'hover:opacity-80' : ''}`}
      onClick={onClick}
    >
      <ImagePreview
        src={src}
        alt={alt}
        size={size}
        circular
        preview={false}
      />
    </div>
  );
}
