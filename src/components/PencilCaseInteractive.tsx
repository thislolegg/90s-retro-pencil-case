import React, { useState, useRef, useEffect } from 'react';
import { PencilCaseItem, ItemState } from '@/types';
import { pencilCaseItems } from '@/lib/pencilCaseData';

interface PencilCaseInteractiveProps {
  isOpened: boolean;
  isAnimating: boolean;
  onItemSelect: (item: PencilCaseItem | null) => void;
  onEmptyAreaClick?: (clickY: number) => void;
  selectedItem: PencilCaseItem | null;
  upperAreaTriggered?: boolean;
  lowerAreaTriggered?: boolean;
}

const PencilCaseInteractive: React.FC<PencilCaseInteractiveProps> = ({
  isOpened,
  isAnimating,
  onItemSelect,
  onEmptyAreaClick,
  selectedItem,
  upperAreaTriggered = false,
  lowerAreaTriggered = false
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isHoveringEmptyArea, setIsHoveringEmptyArea] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  // 上半部分彩蛋触发区域
  const upperEasterEggArea = {
    type: 'polygon' as const,
    points: [{x: 43.9, y: 9.1}, {x: 55.9, y: 9}, {x: 56.3, y: 33.9}, {x: 44, y: 33.8}]
  };

  // 调试：检查数据加载
  useEffect(() => {
    console.log('PencilCaseInteractive mounted');
    console.log('pencilCaseItems:', pencilCaseItems);
    console.log('isOpened:', isOpened, 'isAnimating:', isAnimating);
  }, [isOpened, isAnimating]);

  // 监听图片尺寸变化
  useEffect(() => {
    const updateImageDimensions = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        setImageDimensions({ width: rect.width, height: rect.height });
        console.log('Image dimensions updated:', rect.width, 'x', rect.height);
        console.log('Image position:', rect.left, rect.top);
      }
    };

    // 使用 setTimeout 确保图片完全加载和渲染
    const timer = setTimeout(updateImageDimensions, 100);

    // 监听窗口大小变化
    window.addEventListener('resize', updateImageDimensions);
    
    // 监听图片加载完成
    const img = imageRef.current;
    if (img) {
      img.addEventListener('load', updateImageDimensions);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateImageDimensions);
      if (img) {
        img.removeEventListener('load', updateImageDimensions);
      }
    };
  }, [isOpened]); // 当isOpened变化时重新设置监听器

  // 点在多边形内部检测
  const isPointInPolygon = (point: {x: number, y: number}, polygon: Array<{x: number, y: number}>) => {
    if (polygon.length < 3) return false;
    
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      if (((polygon[i].y > point.y) !== (polygon[j].y > point.y)) &&
          (point.x < (polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x)) {
        inside = !inside;
      }
    }
    return inside;
  };

  // 检查点击是否在物品区域内
  const checkItemHit = (x: number, y: number, item: PencilCaseItem) => {
    const { position } = item;
    
    if (position.type === 'polygon' && position.points) {
      const result = isPointInPolygon({ x, y }, position.points);
      if (result) {
        console.log(`Hit detected for ${item.name} at (${x.toFixed(1)}, ${y.toFixed(1)})`);
      }
      return result;
    } else if (position.type === 'rectangle' && position.x !== undefined && position.y !== undefined) {
      return (
        x >= position.x &&
        x <= position.x + (position.width || 0) &&
        y >= position.y &&
        y <= position.y + (position.height || 0)
      );
    }
    
    return false;
  };

  // 检查点击是否在彩蛋触发区域内
  const checkEasterEggAreaHit = (x: number, y: number) => {
    // 检查上半部分特定区域
    if (y <= 50) {
      return isPointInPolygon({ x, y }, upperEasterEggArea.points);
    }
    // 下半部分暂时禁用彩蛋触发
    else {
      return false;
    }
  };

  // 处理图片点击事件
  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    console.log('Image click event triggered');
    console.log('Image clicked, isOpened:', isOpened, 'isAnimating:', isAnimating);
    
    if (!isOpened || isAnimating || !imageRef.current) {
      console.log('Click ignored due to state');
      return;
    }

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    console.log(`Click at (${x.toFixed(1)}, ${y.toFixed(1)})`);

    // 检查点击是否在任何物品区域内
    const clickedItem = pencilCaseItems.find(item => checkItemHit(x, y, item));

    if (clickedItem) {
      console.log('Clicked item:', clickedItem.name);
      onItemSelect(clickedItem);
    } else {
      // 检查是否在彩蛋触发区域内
      const isInEasterEggArea = checkEasterEggAreaHit(x, y);
      
      if (isInEasterEggArea) {
        // 检查点击的区域是否已被触发
        const isUpperArea = y <= 50;
        const currentAreaTriggered = isUpperArea ? upperAreaTriggered : lowerAreaTriggered;
        
        if (!currentAreaTriggered) {
          console.log('Clicked easter egg area - triggering easter egg');
          // 点击彩蛋区域且该区域未被触发过，触发彩蛋
          if (onEmptyAreaClick) {
            onEmptyAreaClick(y);
          }
        } else {
          console.log('Clicked easter egg area - but already triggered');
        }
      } else {
        console.log('Clicked empty area - not in easter egg zone');
      }
    }
  };

  // 处理鼠标移动事件
  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    console.log('Mouse move event triggered');
    
    if (!isOpened || isAnimating || !imageRef.current) {
      console.log('Mouse move ignored due to state:', { isOpened, isAnimating, hasRef: !!imageRef.current });
      return;
    }

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // 记录鼠标相对于图片的像素位置
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    setMousePosition({ x: mouseX, y: mouseY });

    // 每100次移动才输出一次日志，避免控制台刷屏
    if (Math.random() < 0.01) {
      console.log(`Mouse at (${x.toFixed(1)}, ${y.toFixed(1)})`);
    }

    // 检查鼠标是否在任何物品区域内
    const hoveredItemData = pencilCaseItems.find(item => checkItemHit(x, y, item));

    const newHoveredItem = hoveredItemData?.id || null;
    
    // 检查是否在彩蛋触发区域内
    const isInEasterEggArea = checkEasterEggAreaHit(x, y);
    
    // 判断当前鼠标位置的区域是否已被触发
    const isUpperArea = y <= 50;
    const currentAreaTriggered = isUpperArea ? upperAreaTriggered : lowerAreaTriggered;
    
    // 只有在没有悬浮物品、在彩蛋区域内且当前区域未被触发时才显示空白区域效果
    const newIsHoveringEmptyArea = !hoveredItemData && isInEasterEggArea && !currentAreaTriggered;

    if (newHoveredItem !== hoveredItem) {
      console.log('Hover changed to:', newHoveredItem || 'empty area');
      setHoveredItem(newHoveredItem);
    }

    if (newIsHoveringEmptyArea !== isHoveringEmptyArea) {
      setIsHoveringEmptyArea(newIsHoveringEmptyArea);
    }
  };

  // 处理鼠标离开事件
  const handleMouseLeave = () => {
    console.log('Mouse left image');
    setHoveredItem(null);
    setIsHoveringEmptyArea(false);
  };

  // 渲染物品热区
  const renderItemHotspot = (item: PencilCaseItem) => {
    const { position } = item;
    const isHovered = hoveredItem === item.id;
    const isSelected = selectedItem?.id === item.id;
    
    if (position.type === 'polygon' && position.points && imageDimensions.width > 0 && imageDimensions.height > 0) {
      // 多边形热区 - 使用百分比坐标和viewBox
      return (
        <svg
          key={item.id}
          className="absolute inset-0 w-full h-full"
          style={{ left: 0, top: 0 }}
          viewBox={`0 0 100 100`}
          preserveAspectRatio="none"
          pointerEvents="none"
        >
          <polygon
            points={position.points.map(p => `${p.x},${p.y}`).join(' ')}
            fill={isHovered ? 'rgba(251, 191, 36, 0.4)' : isSelected ? 'rgba(251, 146, 60, 0.4)' : 'rgba(0, 255, 0, 0.1)'}
            stroke={isHovered ? 'rgb(251, 191, 36)' : isSelected ? 'rgb(251, 146, 60)' : 'rgba(0, 255, 0, 0.3)'}
            strokeWidth="0.5"
            className="transition-all duration-200"
          />
          {/* 添加调试点 */}
          {position.points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="0.8"
              fill="red"
              opacity="0.7"
            />
          ))}
        </svg>
      );
    } else if (position.type === 'rectangle' && position.x !== undefined && position.y !== undefined) {
      // 矩形热区（向后兼容）
      const className = `absolute transition-all duration-200 ${
        isHovered 
          ? 'bg-yellow-300/40 border-2 border-yellow-400' 
          : isSelected
          ? 'bg-orange-300/40 border-2 border-orange-400'
          : 'bg-green-200/20 border border-green-400'
      }`;
      
      return (
        <div
          key={item.id}
          className={className}
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            width: `${position.width || 0}%`,
            height: `${position.height || 0}%`,
            borderRadius: '8px'
          }}
        />
      );
    }
    
    return null;
  };

  return (
    <div className="relative">
      {/* 调试信息 - 已隐藏 */}
      {false && isOpened && !isAnimating && (
        <div className="absolute top-2 left-2 bg-black/80 text-white p-2 rounded text-xs z-50">
          <div>Items loaded: {pencilCaseItems.length}</div>
          <div>Image size: {imageDimensions.width.toFixed(0)} x {imageDimensions.height.toFixed(0)}</div>
          <div>Hovered: {hoveredItem || 'none'}</div>
          <div>Selected: {selectedItem?.name || 'none'}</div>
        </div>
      )}

      {/* 物品热区可视化 - 已隐藏 */}
      {false && isOpened && !isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          {pencilCaseItems.map(item => renderItemHotspot(item))}
        </div>
      )}

      {/* 文具盒图片 */}
      <img 
        ref={imageRef}
        src={isOpened ? "/images/pencil-case-opened.png" : "/images/pencil-case-closed.png"}
        alt={isOpened ? "打开的文具盒" : "关闭的文具盒"}
        className={`transition-all duration-1000 ease-out ${
          isOpened ? 'w-[800px]' : 'w-[700px]'
        } h-auto ${
          isOpened && !isAnimating 
            ? hoveredItem
              ? 'cursor-pointer'
              : isHoveringEmptyArea 
                ? 'cursor-zoom-in' 
                : 'cursor-default'
            : ''
        }`}
        style={{
          filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
          maxWidth: '100%',
          height: 'auto',
          backgroundColor: 'transparent'
        }}
        onClick={handleImageClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      {/* 物品标签（悬停时显示） */}
      {isOpened && !isAnimating && hoveredItem && (
        <div className="absolute inset-0 pointer-events-none">
          {pencilCaseItems
            .filter(item => item.id === hoveredItem)
            .map(item => {
              // 计算标签位置（使用物品区域的中心点）
              let labelX = 50, labelY = 50;
              
              if (item.position.type === 'polygon' && item.position.points) {
                // 计算多边形中心点
                const points = item.position.points;
                labelX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
                labelY = points.reduce((sum, p) => sum + p.y, 0) / points.length;
              } else if (item.position.type === 'rectangle' && item.position.x !== undefined && item.position.y !== undefined) {
                labelX = item.position.x + (item.position.width || 0) / 2;
                labelY = item.position.y + (item.position.height || 0) / 2;
              }
              
              return (
                <div
                  key={item.id}
                  className="absolute transform -translate-x-1/2 -translate-y-full bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10"
                  style={{
                    left: `${labelX}%`,
                    top: `${labelY}%`,
                    marginTop: '-8px'
                  }}
                >
                  {item.emoji} {item.name}
                </div>
              );
            })}
        </div>
      )}

      {/* 空白区域悬浮提示 */}
      {isOpened && !isAnimating && isHoveringEmptyArea && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute bg-amber-800/90 text-amber-100 px-4 py-2 rounded-lg text-sm font-zcool shadow-lg animate-pulse whitespace-nowrap z-20"
            style={{
              left: `${mousePosition.x + 15}px`,
              top: `${mousePosition.y - 45}px`,
              transform: 'translateX(0) translateY(0)'
            }}
          >
            🔍 咦，文具盒夹层里好像还有些东西...
          </div>
        </div>
      )}

      {/* 打开时的魔法光效 */}
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          {/* 中心光芒 */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-300 rounded-full opacity-60 animate-ping"
            style={{ animationDuration: '1s' }}
          />
          {/* 外围光环 */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-yellow-400 rounded-full opacity-40 animate-spin"
            style={{ animationDuration: '2s' }}
          />
          {/* 星光效果 */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-80"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.8s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PencilCaseInteractive; 