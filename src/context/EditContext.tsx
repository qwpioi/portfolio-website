import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * 编辑模式上下文
 * 控制全局编辑状态
 */
interface EditContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  enableEditMode: () => void;
  disableEditMode: () => void;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

export function EditProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = React.useCallback(() => {
    setIsEditMode(prev => !prev);
  }, []);

  const enableEditMode = React.useCallback(() => {
    setIsEditMode(true);
  }, []);

  const disableEditMode = React.useCallback(() => {
    setIsEditMode(false);
  }, []);

  return (
    <EditContext.Provider value={{ isEditMode, toggleEditMode, enableEditMode, disableEditMode }}>
      {children}
    </EditContext.Provider>
  );
}

export function useEdit() {
  const context = useContext(EditContext);
  if (context === undefined) {
    throw new Error('useEdit must be used within an EditProvider');
  }
  return context;
}
