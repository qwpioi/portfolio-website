import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { LazyImage } from './LazyImage';
import type { WorkItem, Project, Article } from '../../types';

interface WorkDetailModalProps {
  work: WorkItem | null;
  open: boolean;
  onClose: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  allWorks?: WorkItem[];
}

export function WorkDetailModal({ work, open, onClose, onNavigate, allWorks = [] }: WorkDetailModalProps) {
  if (!work) return null;

  const currentIndex = allWorks.findIndex(w => w.id === work.id);
  const hasMultiple = allWorks.length > 1;

  const handlePrev = () => {
    if (hasMultiple && onNavigate) {
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : allWorks.length - 1;
      onNavigate('prev');
    }
  };

  const handleNext = () => {
    if (hasMultiple && onNavigate) {
      const nextIndex = currentIndex < allWorks.length - 1 ? currentIndex + 1 : 0;
      onNavigate('next');
    }
  };

  // 键盘导航
  React.useEffect(() => {
    if (!open || !hasMultiple) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, hasMultiple, currentIndex]);

  return (
    <Modal
      title="作品详情"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
      className="work-detail-modal"
    >
      <div className="py-4">
        <div className="mb-6 rounded-lg overflow-hidden">
          <LazyImage src={work.image || ''} alt={work.description} className="w-full aspect-video" placeholder="blur" />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">作品描述</h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {work.description || '暂无描述'}
          </p>
        </div>

        {hasMultiple && (
          <div className="flex justify-between mt-6">
            <button onClick={handlePrev} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              ← 上一个
            </button>
            <span className="text-sm text-gray-500 self-center">
              {currentIndex + 1} / {allWorks.length}
            </span>
            <button onClick={handleNext} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              下一个 →
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  allProjects?: Project[];
}

export function ProjectDetailModal({ project, open, onClose, onNavigate, allProjects = [] }: ProjectDetailModalProps) {
  if (!project) return null;

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const hasMultiple = allProjects.length > 1;

  useEffect(() => {
    if (!open || !hasMultiple) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onNavigate?.('prev');
      if (e.key === 'ArrowRight') onNavigate?.('next');
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, hasMultiple]);

  return (
    <Modal title={project.title} open={open} onCancel={onClose} footer={null} centered width={800}>
      <div className="py-4 space-y-6">
        <div className="rounded-lg overflow-hidden">
          <LazyImage src={project.cover || ''} alt={project.title} className="w-full aspect-video" placeholder="blur" />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">发布时间：</span>
            <span className="text-gray-900 dark:text-white">{new Date(project.publishTime).toLocaleDateString('zh-CN')}</span>
          </div>
          {project.link && (
            <div>
              <span className="text-gray-500">项目链接：</span>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">访问项目</a>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">项目详情</h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{project.details || project.description}</p>
        </div>
        {hasMultiple && (
          <div className="flex justify-between mt-6">
            <button onClick={() => onNavigate?.('prev')} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">← 上一个</button>
            <span className="text-sm text-gray-500 self-center">{currentIndex + 1} / {allProjects.length}</span>
            <button onClick={() => onNavigate?.('next')} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">下一个 →</button>
          </div>
        )}
      </div>
    </Modal>
  );
}

interface ArticleDetailModalProps {
  article: Article | null;
  open: boolean;
  onClose: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  allArticles?: Article[];
}

export function ArticleDetailModal({ article, open, onClose, onNavigate, allArticles = [] }: ArticleDetailModalProps) {
  if (!article) return null;

  const currentIndex = allArticles.findIndex(a => a.id === article.id);
  const hasMultiple = allArticles.length > 1;

  useEffect(() => {
    if (!open || !hasMultiple) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onNavigate?.('prev');
      if (e.key === 'ArrowRight') onNavigate?.('next');
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, hasMultiple]);

  return (
    <Modal title={article.title} open={open} onCancel={onClose} footer={null} centered width={800} className="article-detail-modal">
      <div className="py-4 space-y-6">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>作者：{article.author}</span>
          <span>·</span>
          <span>{new Date(article.publishTime).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        {article.cover && (
          <div className="rounded-lg overflow-hidden">
            <LazyImage src={article.cover} alt={article.title} className="w-full aspect-video" placeholder="blur" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">摘要</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{article.summary}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">正文</h3>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
        {hasMultiple && (
          <div className="flex justify-between mt-6">
            <button onClick={() => onNavigate?.('prev')} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">← 上一个</button>
            <span className="text-sm text-gray-500 self-center">{currentIndex + 1} / {allArticles.length}</span>
            <button onClick={() => onNavigate?.('next')} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">下一个 →</button>
          </div>
        )}
      </div>
    </Modal>
  );
}
