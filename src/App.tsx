import { DataProvider } from './context/DataContext';
import { EditProvider } from './context/EditContext';
import { AntdProvider } from './components/common/AntdProvider';
import { BackToTop } from './components/common/BackToTop';
import { EditModeToggle } from './components/common/EditModeToggle';
import { FiveRowLayout } from './components/layout/FiveRowLayout';
import { Manage } from './pages/Manage';
import { useEdit } from './context/EditContext';

function AppContent() {
  const { isEditMode } = useEdit();

  return (
    <>
      {/* 编辑模式工具栏 */}
      <EditModeToggle />

      {isEditMode ? (
        /* 编辑模式：显示管理页面 */
        <Manage />
      ) : (
        /* 正常模式：显示五行布局 */
        <>
          <FiveRowLayout />
          <BackToTop />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <AntdProvider>
      <DataProvider>
        <EditProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AppContent />
          </div>
        </EditProvider>
      </DataProvider>
    </AntdProvider>
  );
}

export default App;
