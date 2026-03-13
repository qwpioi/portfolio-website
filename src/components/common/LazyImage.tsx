import React, { useState, useEffect, useRef } from 'react';

/**
 * 懒加载图片组件
 */
export interface LazyImageProps {
  src: string;
  alt?: string;
  className?: string;
  placeholder?: 'blur' | 'gray' | 'none';
  fallback?: string;
  threshold?: number;
  rootMargin?: string;
  circular?: boolean;
}

export function LazyImage({
  src,
  alt = '',
  className = '',
  placeholder = 'gray',
  fallback = '',
  threshold = 0.1,
  rootMargin = '50px',
  circular = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => {
    setIsError(true);
    setIsLoaded(false);
  };

  const placeholderClass = placeholder === 'blur' ? 'blur-sm' : placeholder === 'gray' ? 'bg-gray-200 dark:bg-gray-700' : '';

  return (
    <div className={`relative overflow-hidden ${className} ${circular ? 'rounded-full' : ''}`} ref={imgRef as any}>
      {(!isLoaded || !isVisible) && (
        <div className={`absolute inset-0 ${placeholderClass} animate-pulse ${circular ? 'rounded-full' : ''}`} />
      )}
      {isVisible && (
        <img
          src={isError && fallback ? fallback : src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${circular ? 'rounded-full' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
    </div>
  );
}

/**
 * 头像专用懒加载组件
 */
export interface LazyAvatarProps extends Omit<LazyImageProps, 'placeholder'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function LazyAvatar({ src, alt = '', size = 'md', className = '' }: LazyAvatarProps) {
  const sizeClasses = { sm: 'w-12 h-12', md: 'w-24 h-24', lg: 'w-32 h-32', xl: 'w-48 h-48' };
  return (
    <LazyImage
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} ${className}`}
      placeholder="gray"
      threshold={0.2}
      circular
    />
  );
}
