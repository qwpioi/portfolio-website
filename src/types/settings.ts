// 全局设置类型定义

// 布局设置
export interface LayoutSettings {
  firstRowRatio: string;      // 首行比例（1:1）
  secondRowRatio: string;     // 第二行比例（5:4）
  projectCardRatio: string;   // 项目卡片比例（16:9）
  workImageRatio: string;     // 作品图片比例（4:3）
}

// 动画设置
export interface AnimationSettings {
  scrollSpeed: number;        // 作品滚动速度（px/s）
  animationDuration: number;  // 基础动画时长（0.2-0.5s）
  autoScroll: boolean;        // 作品自动滚动
  scrollPauseOnHover: boolean;// 悬浮暂停滚动
}

// 响应式设置
export interface ResponsiveSettings {
  mobileBreakpoint: number;   // 移动端断点（px）
  tabletBreakpoint: number;   // 平板端断点（px）
}

// 全局设置
export interface Settings {
  layout: LayoutSettings;
  animation: AnimationSettings;
  responsive: ResponsiveSettings;
}
