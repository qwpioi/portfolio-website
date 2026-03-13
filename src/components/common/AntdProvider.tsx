import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

/**
 * Ant Design 全局配置提供者
 * 统一配置主题、语言等
 */
export function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          // 全局主题色
          colorPrimary: '#9333ea', // 紫色
          colorLink: '#9333ea',
          colorSuccess: '#22c55e',
          colorWarning: '#f59e0b',
          colorError: '#ef4444',
          colorInfo: '#3b82f6',
          
          // 圆角
          borderRadius: 8,
          borderRadiusLG: 12,
          
          // 字体
          fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
        },
        components: {
          // 按钮组件配置
          Button: {
            borderRadius: 8,
          },
          // 卡片组件配置
          Card: {
            borderRadius: 12,
          },
          // 弹窗组件配置
          Modal: {
            borderRadiusLG: 16,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
