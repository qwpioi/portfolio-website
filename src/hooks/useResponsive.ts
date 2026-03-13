import { useState, useEffect } from 'react';

/**
 * 响应式检测 Hook
 * 返回当前设备类型和屏幕尺寸
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface ResponsiveState {
  device: DeviceType;
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    device: 'desktop',
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const updateState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let device: DeviceType = 'desktop';
      if (width < 768) {
        device = 'mobile';
      } else if (width < 1024) {
        device = 'tablet';
      }

      setState({
        device,
        width,
        height,
        isMobile: device === 'mobile',
        isTablet: device === 'tablet',
        isDesktop: device === 'desktop',
      });
    };

    // 初始检测
    updateState();

    // 监听窗口变化
    window.addEventListener('resize', updateState);
    return () => window.removeEventListener('resize', updateState);
  }, []);

  return state;
}
