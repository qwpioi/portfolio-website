import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * GSAP 滚动动画 Hook
 * 用于作品展示行的无缝滚动动画
 */
export function useScrollAnimation(options?: {
  speed?: number;        // 滚动速度（像素/秒）
  paused?: boolean;      // 是否暂停
  direction?: 'left' | 'right'; // 滚动方向
}) {
  const {
    speed = 30,
    paused = false,
    direction = 'left',
  } = options || {};
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const content = container.firstElementChild;
    if (!content) return;

    // 计算滚动距离（内容宽度的一半，因为复制了一份）
    const scrollDistance = content.clientWidth / 2;
    const duration = scrollDistance / speed;

    // 创建滚动动画
    animationRef.current = gsap.to(content, {
      x: direction === 'left' ? -scrollDistance : scrollDistance,
      duration: duration,
      ease: 'none',
      repeat: -1, // 无限循环
      paused: paused,
    });

    // 清理动画
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [speed, paused, direction]);

  // 暂停/恢复滚动的方法
  const pauseAnimation = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const resumeAnimation = () => {
    if (animationRef.current) {
      animationRef.current.resume();
    }
  };

  return {
    containerRef,
    pauseAnimation,
    resumeAnimation,
  };
}

/**
 * 淡入动画 Hook
 * 元素进入视口时淡入
 */
export function useFadeInAnimation(threshold = 0.1) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // 初始状态：隐藏
    gsap.set(element, { opacity: 0, y: 30 });

    // 创建 Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 淡入动画
            gsap.to(element, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            });
            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return elementRef;
}

/**
 * 悬浮放大动画 Hook
 */
export function useHoverScaleAnimation(scale = 1.05) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: scale,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scale]);

  return elementRef;
}
