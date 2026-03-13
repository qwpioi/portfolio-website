import React from 'react';
import { useData } from '../../context/DataContext';
import { config } from '../../config';
import type { PortfolioData } from '../../types';

/**
 * 五行布局主容器
 * 严格按照 PRD 要求的比例和结构实现
 * 
 * 布局结构：
 * - 第一行：基础信息 + 技术栈 (1:1)
 * - 第二行：项目统计 + 工具图标 (5:4)
 * - 第三行：精选项目 (4 个卡片)
 * - 第四行：最新文章 (4 个卡片)
 * - 第五行：作品展示 (三行滚动图片)
 */
export function FiveRowLayout() {
  const { data, isLoading } = useData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-xl text-gray-600 dark:text-gray-400">
            加载中...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="five-row-layout w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* 第一行：基础信息 + 技术栈 (1:1) */}
      <FirstRow data={data} />

      {/* 第二行：项目统计 + 工具图标 (5:4) */}
      <SecondRow data={data} />

      {/* 第三行：精选项目 (4 个卡片) */}
      <ThirdRow data={data} />

      {/* 第四行：最新文章 (4 个卡片) */}
      <FourthRow data={data} />

      {/* 第五行：作品展示 (三行滚动图片) */}
      <FifthRow data={data} />
    </div>
  );
}

/**
 * 第一行组件：基础信息 + 技术栈
 * 比例：1:1，首行滚动固定
 */
function FirstRow({ data }: { data: PortfolioData }) {
  return (
    <section 
      className="first-row-fixed sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md rounded-lg p-6"
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
    >
      {/* 左侧：基础信息 */}
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
          {data.basicInfo.avatar ? (
            <img
              src={data.basicInfo.avatar}
              alt={data.basicInfo.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
              onClick={() => {
                // TODO: 点击放大头像
                console.log('点击头像');
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1 text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {data.basicInfo.name}
          </h2>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            {data.basicInfo.infoOrder.includes('gender') && (
              <p>性别：{data.basicInfo.gender}</p>
            )}
            {data.basicInfo.infoOrder.includes('age') && (
              <p>年龄：{data.basicInfo.age}岁</p>
            )}
            {data.basicInfo.infoOrder.includes('education') && (
              <p>学历：{data.basicInfo.education}</p>
            )}
            {data.basicInfo.infoOrder.includes('graduationSchool') && (
              <p>毕业院校：{data.basicInfo.graduationSchool}</p>
            )}
          </div>
        </div>
      </div>

      {/* 右侧：技术栈 */}
      <div className="flex items-center">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            技术栈
          </h3>
          {data.techStack.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.techStack.map((tech) => (
                <div
                  key={tech.id}
                  className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  title={tech.description}
                >
                  {tech.name}
                  {tech.proficiency && (
                    <span className="ml-1 text-xs opacity-75">
                      ({tech.proficiency})
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">暂无技术栈信息</p>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * 第二行组件：项目统计 + 工具图标
 * 比例：5:4
 */
function SecondRow({ data }: { data: PortfolioData }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-9 gap-6">
      {/* 左侧：项目统计 (5 份) */}
      <div className="lg:col-span-5 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 card-hover">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          项目统计
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {data.projectStats.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              总项目数
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
              {data.projectStats.published}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              已发布
            </div>
          </div>
        </div>
        <button className="mt-4 w-full py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 btn-click-feedback">
          查看全部项目
        </button>
      </div>

      {/* 右侧：工具图标 (4 份) */}
      <div className="lg:col-span-4 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 card-hover">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          常用工具
        </h3>
        {data.toolIcons.length > 0 ? (
          <div className="grid grid-cols-4 gap-3">
            {data.toolIcons.map((tool) => (
              <div
                key={tool.id}
                className="aspect-square flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer group"
                title={tool.description}
              >
                {tool.icon ? (
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-gray-400 text-xs">
                    {tool.name.charAt(0)}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">暂无工具信息</p>
        )}
      </div>
    </section>
  );
}

/**
 * 第三行组件：精选项目
 * 固定展示 4 个最新完成项目
 */
function ThirdRow({ data }: { data: PortfolioData }) {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          精选项目
        </h3>
        <button className="px-4 py-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors duration-200 btn-click-feedback">
          查看全部项目 →
        </button>
      </div>

      {data.featuredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.featuredProjects.slice(0, config.display.featuredProjects).map((project) => (
            <div
              key={project.id}
              className="card rounded-lg overflow-hidden card-hover cursor-pointer"
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                {project.cover ? (
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                  {project.description}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {new Date(project.publishTime).toLocaleDateString('zh-CN')}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>暂无项目展示</p>
        </div>
      )}
    </section>
  );
}

/**
 * 第四行组件：最新文章
 * 固定展示 4 篇最新文章
 */
function FourthRow({ data }: { data: PortfolioData }) {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          最新文章
        </h3>
        <button className="px-4 py-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors duration-200 btn-click-feedback">
          查看全部文章 →
        </button>
      </div>

      {data.latestArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.latestArticles.slice(0, config.display.latestArticles).map((article) => (
            <div
              key={article.id}
              className="card rounded-lg overflow-hidden card-hover cursor-pointer"
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                {article.cover ? (
                  <img
                    src={article.cover}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  作者：{article.author}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                  {article.summary}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {new Date(article.publishTime).toLocaleDateString('zh-CN')}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>暂无文章展示</p>
        </div>
      )}
    </section>
  );
}

/**
 * 第五行组件：作品展示
 * 三行项目图片相互滚动展示
 */
function FifthRow({ data }: { data: PortfolioData }) {
  // 将作品分成 3 行
  const rows = [[], [], []] as WorkItem[][];
  data.works.forEach((work, index) => {
    const rowIndex = index % 3;
    rows[rowIndex].push(work);
  });

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        作品展示
      </h3>

      {data.works.length > 0 ? (
        <div className="space-y-4">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="works-scroll-container overflow-hidden"
              onMouseEnter={(e) => {
                // 悬浮暂停滚动
                const scrollRow = e.currentTarget.querySelector('.works-scroll-row');
                scrollRow?.classList.add('paused');
              }}
              onMouseLeave={(e) => {
                // 恢复滚动
                const scrollRow = e.currentTarget.querySelector('.works-scroll-row');
                scrollRow?.classList.remove('paused');
              }}
            >
              <div 
                className="works-scroll-row flex gap-4"
                style={{
                  animation: `scroll-left ${120 / config.animation.scrollSpeed}s linear infinite`,
                }}
              >
                {/* 复制一份实现无缝循环 */}
                {[...row, ...row].map((work, index) => (
                  <div
                    key={`${work.id}-${index}`}
                    className="flex-shrink-0 w-64 aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
                    onClick={() => {
                      // TODO: 点击查看详情
                      console.log('查看作品详情:', work.description);
                    }}
                  >
                    {work.image ? (
                      <img
                        src={work.image}
                        alt={`作品 ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>暂无作品展示</p>
        </div>
      )}
    </section>
  );
}

// 类型导入
import type { WorkItem } from '../../types';
