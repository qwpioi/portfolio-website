import React from 'react';
import { Modal, Image, Carousel } from 'antd';
import type { WorkItem } from '../../types';

/**
 * 作品详情弹窗
 * 点击作品图片触发
 */
interface WorkDetailModalProps {
  work: WorkItem | null;
  open: boolean;
  onClose: () => void;
  allWorks?: WorkItem[];
}

export function WorkDetailModal({ work, open, onClose, allWorks = [] }: WorkDetailModalProps) {
  if (!work) return null;

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
        {/* 作品图片 */}
        <div className="mb-6 rounded-lg overflow-hidden">
          <Image
            src={work.image || ''}
            alt={work.description}
            className="w-full"
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
            preview={{
              mask: '点击查看原图',
            }}
          />
        </div>

        {/* 作品描述 */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            作品描述
          </h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {work.description || '暂无描述'}
          </p>
        </div>

        {/* 导航按钮（如果有多个作品） */}
        {allWorks.length > 1 && (
          <div className="flex justify-between mt-6">
            <button
              onClick={() => {
                const currentIndex = allWorks.findIndex(w => w.id === work.id);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : allWorks.length - 1;
                // TODO: 切换到上一个作品
              }}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ← 上一个
            </button>
            <button
              onClick={() => {
                const currentIndex = allWorks.findIndex(w => w.id === work.id);
                const nextIndex = currentIndex < allWorks.length - 1 ? currentIndex + 1 : 0;
                // TODO: 切换到下一个作品
              }}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              下一个 →
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

/**
 * 项目详情弹窗
 */
import type { Project } from '../../types';

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, open, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <Modal
      title={project.title}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
    >
      <div className="py-4 space-y-6">
        {/* 项目封面 */}
        <div className="rounded-lg overflow-hidden">
          <Image
            src={project.cover || ''}
            alt={project.title}
            className="w-full aspect-video object-cover"
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
            preview={{
              mask: '点击查看原图',
            }}
          />
        </div>

        {/* 项目信息 */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">发布时间：</span>
            <span className="text-gray-900 dark:text-white">
              {new Date(project.publishTime).toLocaleDateString('zh-CN')}
            </span>
          </div>
          {project.link && (
            <div>
              <span className="text-gray-500">项目链接：</span>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                访问项目
              </a>
            </div>
          )}
        </div>

        {/* 项目详情 */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            项目详情
          </h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {project.details || project.description}
          </p>
        </div>
      </div>
    </Modal>
  );
}

/**
 * 文章详情弹窗
 */
import type { Article } from '../../types';

interface ArticleDetailModalProps {
  article: Article | null;
  open: boolean;
  onClose: () => void;
}

export function ArticleDetailModal({ article, open, onClose }: ArticleDetailModalProps) {
  if (!article) return null;

  return (
    <Modal
      title={article.title}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
      className="article-detail-modal"
    >
      <div className="py-4 space-y-6">
        {/* 文章元信息 */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>作者：{article.author}</span>
          <span>·</span>
          <span>
            {new Date(article.publishTime).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        {/* 文章封面 */}
        {article.cover && (
          <div className="rounded-lg overflow-hidden">
            <Image
              src={article.cover}
              alt={article.title}
              className="w-full aspect-video object-cover"
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
              preview={{
                mask: '点击查看原图',
              }}
            />
          </div>
        )}

        {/* 文章摘要 */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            摘要
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* 文章内容 */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            正文
          </h3>
          <div 
            className="text-gray-700 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </Modal>
  );
}
