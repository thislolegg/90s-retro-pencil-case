// 文具盒物品类型定义
export interface PencilCaseItem {
  id: string;
  name: string;
  emoji: string;
  content: string;
  position: {
    // 支持矩形和多边形两种方式
    type: 'rectangle' | 'polygon';
    // 矩形方式（向后兼容）
    x?: number; // 百分比位置 (0-100)
    y?: number; // 百分比位置 (0-100)
    width?: number; // 点击区域宽度百分比
    height?: number; // 点击区域高度百分比
    // 多边形方式
    points?: Array<{x: number, y: number}>; // 多边形顶点坐标（百分比）
  };
}

// 物品状态类型
export interface ItemState {
  selectedItem: PencilCaseItem | null;
  hoveredItem: string | null;
}

// 多边形标定工具相关类型
export interface PolygonPoint {
  x: number;
  y: number;
  id: number;
}

export interface PolygonItem {
  id: string;
  name: string;
  emoji: string;
  points: PolygonPoint[];
  isComplete: boolean;
} 