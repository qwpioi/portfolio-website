import { DataProvider } from './context/DataContext';
import { EditProvider } from './context/EditContext';
import { BackToTop } from './components/common/BackToTop';
import { FiveRowLayout } from './components/layout/FiveRowLayout';

function App() {
  return (
    <DataProvider>
      <EditProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* 五行布局主容器 */}
          <FiveRowLayout />

          {/* 返回顶部按钮 */}
          <BackToTop />
        </div>
      </EditProvider>
    </DataProvider>
  );
}

export default App;
