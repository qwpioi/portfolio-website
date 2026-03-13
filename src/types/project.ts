// 项目相关类型定义

// 项目统计
export interface ProjectStats {
  total: number;              // 总项目数
  published: number;          // 已发布数
}

// 精选项目
export interface Project {
  id: string;                 // 唯一 ID
  title: string;              // 项目标题
  cover: string;              // 封面图 URL
  description: string;        // 核心介绍
  publishTime: string;        // 发布时间（ISO 格式）
  details: string;            // 项目详情
  link?: string;              // 项目链接（可选）
}
