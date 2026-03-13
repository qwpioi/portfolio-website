// 作品展示类型定义

export interface WorkItem {
  id: string;                 // 唯一 ID
  image: string;              // 作品图片 URL
  description: string;        // 作品详情（弹窗展示）
  category?: string;          // 分类（V1.2 版本）
}
