// 文章类型定义

export interface Article {
  id: string;                 // 唯一 ID
  title: string;              // 文章标题
  cover: string;              // 封面图 URL
  author: string;             // 作者
  publishTime: string;        // 发布时间（ISO 格式）
  summary: string;            // 简介
  content: string;            // 文章内容（HTML/Markdown）
  category?: string;          // 分类（V1.2 版本）
}
