import React, { useState } from 'react';
import { Modal, Image as AntImage } from 'antd';
import { useData } from '../../context/DataContext';
import { config } from '../../config';
import { useResponsive } from '../../hooks/useResponsive';
import { LazyAvatar, LazyImage } from '../common/LazyImage';
import { EmptyProjects, EmptyArticles, EmptyWorks } from '../common/EmptyState';
import { WorkDetailModal, ProjectDetailModal, ArticleDetailModal } from '../common/WorkDetailModal';
import type { PortfolioData, Project, Article, WorkItem } from '../../types';

/**
 * 五行布局主容器
 */
export function FiveRowLayout() {
  const { data, isLoading } = useData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

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
    <>
      <div className="five-row-layout w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* 第一行：基础信息 + 技术栈 (1:1) */}
        <FirstRow data={data} onAvatarClick={() => setIsAvatarModalOpen(true)} />

        {/* 第二行：项目统计 + 工具图标 (5:4) */}
        <SecondRow data={data} />

        {/* 第三行：精选项目 (4 个卡片) */}
        <ThirdRow data={data} onProjectClick={setSelectedProject} />

        {/* 第四行：最新文章 (4 个卡片) */}
        <FourthRow data={data} onArticleClick={setSelectedArticle} />

        {/* 第五行：作品展示 (三行滚动图片) */}
        <FifthRow data={data} onWorkClick={setSelectedWork} />
      </div>

      {/* 头像弹窗 */}
      <Modal
        title={data.basicInfo.name}
        open={isAvatarModalOpen}
        onCancel={() => setIsAvatarModalOpen(false)}
        footer={null}
        centered
        width={400}
      >
        <div className="flex justify-center py-8">
          <AntImage
            src={data.basicInfo.avatar || ''}
            alt={data.basicInfo.name}
            className="rounded-full w-64 h-64 mx-auto"
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
            preview={false}
          />
        </div>
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {data.basicInfo.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.basicInfo.gender} · {data.basicInfo.age}岁
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.basicInfo.education} · {data.basicInfo.graduationSchool}
          </p>
        </div>
      </Modal>

      {/* 其他弹窗 */}
      <ProjectDetailModal
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <ArticleDetailModal
        article={selectedArticle}
        open={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
      <WorkDetailModal
        work={selectedWork}
        open={!!selectedWork}
        onClose={() => setSelectedWork(null)}
        allWorks={data.works}
      />
    </>
  );
}

/**
 * 第一行组件：基础信息 + 技术栈
 */
interface FirstRowProps {
  data: PortfolioData;
  onAvatarClick: () => void;
}

function FirstRow({ data, onAvatarClick }: FirstRowProps) {
  const { isMobile } = useResponsive();

  return (
    <section 
      className={`first-row-fixed sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 ${
        isMobile ? 'block' : 'grid'
      }`}
      style={!isMobile ? { gridTemplateColumns: '1fr 1fr', gap: '2rem' } : {}}
    >
      {/* 左侧：基础信息 */}
      <div className={`flex ${isMobile ? 'flex-col items-center text-center mb-6' : 'items-center gap-4 text-left'}`}>
        <div 
          className={`flex-shrink-0 cursor-pointer ${
            isMobile ? 'mx-auto mb-4' : 'w-24 h-24'
          }`}
          onClick={onAvatarClick}
        >
          <LazyAvatar
            src={data.basicInfo.avatar || ''}
            alt={data.basicInfo.name}
            size="md"
            className={isMobile ? '' : 'w-24 h-24 hover:scale-110 transition-transform duration-300'}
          />
        </div>
        <div className={isMobile ? 'text-center' : 'flex-1 text-left'}>
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
 */
function SecondRow({ data }: { data: PortfolioData }) {
  const { isMobile } = useResponsive();

  return (
    <section className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-9'} gap-6`}>
      {/* 左侧：项目统计 (5 份) */}
      <div className={isMobile ? '' : 'lg:col-span-5 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 card-hover'}>
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
      <div className={isMobile ? 'bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 card-hover' : 'lg:col-span-4 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 card-hover'}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          常用工具
        </h3>
        {data.toolIcons.length > 0 ? (
          <div className={`grid ${isMobile ? 'grid-cols-4' : 'grid-cols-4'} gap-3`}>
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
 */
interface ThirdRowProps {
  data: PortfolioData;
  onProjectClick: (project: Project) => void;
}

function ThirdRow({ data, onProjectClick }: ThirdRowProps) {
  const { isMobile, isTablet } = useResponsive();

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          精选项目
        </h3>
        <button className="px-4 py-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors duration-200 btn-click-feedback text-sm lg:text-base">
          查看全部 →
        </button>
      </div>

      {data.featuredProjects.length > 0 ? (
        <div className={`grid gap-4 lg:gap-6 ${
          isMobile ? 'grid-cols-1' : 
          isTablet ? 'grid-cols-2' : 
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }`}>
          {data.featuredProjects.slice(0, config.display.featuredProjects).map((project) => (
            <div
              key={project.id}
              className="card rounded-lg overflow-hidden card-hover cursor-pointer"
              onClick={() => onProjectClick(project)}
            >
              <LazyImage
                src={project.cover || ''}
                alt={project.title}
                className="aspect-video"
                placeholder="gray"
              />
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
        <EmptyProjects />
      )}
    </section>
  );
}

/**
 * 第四行组件：最新文章
 */
interface FourthRowProps {
  data: PortfolioData;
  onArticleClick: (article: Article) => void;
}

function FourthRow({ data, onArticleClick }: FourthRowProps) {
  const { isMobile, isTablet } = useResponsive();

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          最新文章
        </h3>
        <button className="px-4 py-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors duration-200 btn-click-feedback text-sm lg:text-base">
          查看全部 →
        </button>
      </div>

      {data.latestArticles.length > 0 ? (
        <div className={`grid gap-4 lg:gap-6 ${
          isMobile ? 'grid-cols-1' : 
          isTablet ? 'grid-cols-2' : 
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }`}>
          {data.latestArticles.slice(0, config.display.latestArticles).map((article) => (
            <div
              key={article.id}
              className="card rounded-lg overflow-hidden card-hover cursor-pointer"
              onClick={() => onArticleClick(article)}
            >
              <LazyImage
                src={article.cover || ''}
                alt={article.title}
                className="aspect-video"
                placeholder="gray"
              />
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
        <EmptyArticles />
      )}
    </section>
  );
}

/**
 * 第五行组件：作品展示
 */
interface FifthRowProps {
  data: PortfolioData;
  onWorkClick: (work: WorkItem) => void;
}

function FifthRow({ data, onWorkClick }: FifthRowProps) {
  const { isMobile } = useResponsive();
  
  // 移动端只显示一行，桌面端显示三行
  const worksToShow = isMobile ? data.works.slice(0, 10) : data.works;
  const rows = isMobile 
    ? [worksToShow] 
    : [[], [], []] as WorkItem[][];
  
  if (!isMobile) {
    worksToShow.forEach((work, index) => {
      const rowIndex = index % 3;
      rows[rowIndex].push(work);
    });
  }

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 lg:p-6">
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
                const scrollRow = e.currentTarget.querySelector('.works-scroll-row');
                scrollRow?.classList.add('paused');
              }}
              onMouseLeave={(e) => {
                const scrollRow = e.currentTarget.querySelector('.works-scroll-row');
                scrollRow?.classList.remove('paused');
              }}
            >
              <div 
                className="works-scroll-row flex gap-2 lg:gap-4"
                style={{
                  animation: `scroll-left ${isMobile ? 60 : 120 / config.animation.scrollSpeed}s linear infinite`,
                }}
              >
                {[...row, ...row].map((work, index) => (
                  <div
                    key={`${work.id}-${index}`}
                    className={`flex-shrink-0 aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 ${
                      isMobile ? 'w-40' : 'w-64'
                    }`}
                    onClick={() => onWorkClick(work)}
                  >
                    <LazyImage
                      src={work.image || ''}
                      alt={`作品 ${index + 1}`}
                      className="w-full h-full hover:scale-105 transition-transform duration-300"
                      placeholder="gray"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyWorks />
      )}
    </section>
  );
}
