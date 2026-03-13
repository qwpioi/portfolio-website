import React from 'react';
import { PersonalCard } from '@/components/modules/PersonalCard';
import { TechStackCard } from '@/components/modules/TechStackCard';
import { StatsCard } from '@/components/modules/StatsCard';
import { StudioCard } from '@/components/modules/StudioCard';
import { ToolsGrid } from '@/components/modules/ToolsGrid';
import { ProjectsSection } from '@/components/modules/ProjectsSection';
import { PortfolioInfiniteScroll } from '@/components/modules/PortfolioInfiniteScroll';
import {
  sampleTechs,
  sampleStats,
  sampleTools,
  sampleMediaTags,
  sampleProjects,
  samplePortfolioItems,
  sampleArticles,
} from '@/data/sampleData';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部标题区域 */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-5 py-10 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">ZUO HOME</h1>
          <p className="text-lg text-gray-600">本科 · 郑州轻工业大学</p>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-5 py-10">
        {/* 第一行 3 卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-6 mb-6">
          <PersonalCard
            name="左百智"
            title="Product Designer"
            avatar="https://picsum.photos/200/200?random=1"
            description="专注于用户体验设计和前端开发，热爱创造美观且实用的数字产品。"
            tags={['Product Designer', 'Frontend Dev', 'UI/UX']}
            socialLinks={[
              { platform: 'github', url: 'https://github.com', icon: '📦' },
              { platform: 'linkedin', url: 'https://linkedin.com', icon: '💼' },
              { platform: 'twitter', url: 'https://twitter.com', icon: '🐦' },
              { platform: 'email', url: 'mailto:example@email.com', icon: '📧' },
            ]}
          />
          <TechStackCard techs={sampleTechs} />
          <StatsCard stats={sampleStats} />
        </div>

        {/* 第二行 2 卡片 */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 mb-10">
          <StudioCard mediaTags={sampleMediaTags} />
          <ToolsGrid tools={sampleTools} columns={5} />
        </div>

        {/* 精选项目 */}
        <ProjectsSection projects={sampleProjects} />

        {/* 作品展示无限滚动 */}
        <PortfolioInfiniteScroll
          row1Items={samplePortfolioItems}
          row2Items={[...samplePortfolioItems].reverse()}
          row3Items={samplePortfolioItems}
        />

        {/* 最新文章滚动 */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">最新文章</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {sampleArticles.map((article) => (
              <div
                key={article.id}
                className="flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.author}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {article.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* 底部版权区域 */}
      <footer className="bg-white border-t border-gray-200 mt-10">
        <div className="container mx-auto px-5 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-lg font-bold text-gray-900 mb-1">ZUO</p>
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} All Rights Reserved
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-900 transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="mailto:example@email.com"
                className="text-gray-400 hover:text-gray-900 transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
