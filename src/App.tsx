import { DataProvider } from './context/DataContext';
import { EditProvider } from './context/EditContext';
import { BackToTop } from './components/common/BackToTop';

function App() {
  return (
    <DataProvider>
      <EditProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* 五行布局主容器 */}
          <main className="five-row-layout">
            {/* TODO: 实现五行布局组件 */}
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold mb-4">
                个人作品集网站
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                项目初始化完成 - 五行布局开发中...
              </p>
            </div>
          </main>

          {/* 返回顶部按钮 */}
          <BackToTop />
        </div>
      </EditProvider>
    </DataProvider>
  );
}

export default App;
