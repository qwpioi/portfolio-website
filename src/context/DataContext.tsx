import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { PortfolioData } from '../types';
import { defaultPortfolioData } from '../config';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * 数据上下文
 * 提供全局作品集数据访问和更新
 */
interface DataContextType {
  data: PortfolioData;
  updateData: (updater: (data: PortfolioData) => PortfolioData) => void;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useLocalStorage<PortfolioData>(
    'portfolio_data',
    defaultPortfolioData
  );
  const [isLoading, setIsLoading] = React.useState(true);

  // 模拟初始加载（实际可从 LocalStorage 立即读取）
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const updateData = React.useCallback((updater: (data: PortfolioData) => PortfolioData) => {
    setData(updater);
  }, [setData]);

  return (
    <DataContext.Provider value={{ data, updateData, isLoading }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
