import React, { useState, useRef } from 'react';
import { PolygonPoint, PolygonItem } from '@/types';

interface PolygonCoordinateHelperProps {
  imageUrl: string;
  onPolygonComplete?: (item: PolygonItem) => void;
  onClose?: () => void;
}

const PolygonCoordinateHelper: React.FC<PolygonCoordinateHelperProps> = ({
  imageUrl,
  onPolygonComplete,
  onClose
}) => {
  const [polygonItems, setPolygonItems] = useState<PolygonItem[]>([]);
  const [currentPolygon, setCurrentPolygon] = useState<PolygonPoint[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentItemName, setCurrentItemName] = useState('');
  const [currentItemEmoji, setCurrentItemEmoji] = useState('');
  const [nextPointId, setNextPointId] = useState(1);
  const [nextItemId, setNextItemId] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);

  // 预设的物品信息
  const presetItems = [
    { name: '英雄钢笔', emoji: '🖋️' },
    { name: '自动铅笔', emoji: '✏️' },
    { name: '香味橡皮', emoji: '🧼' },
    { name: '三角尺', emoji: '📐' },
    { name: '改正液', emoji: '🧴' },
    { name: '小刀', emoji: '🔪' },
    { name: '还珠格格贴纸', emoji: '🪄' }
  ];

  // 处理图片点击事件
  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!isDrawing || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const newPoint: PolygonPoint = {
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      id: nextPointId
    };

    setCurrentPolygon(prev => [...prev, newPoint]);
    setNextPointId(prev => prev + 1);
  };

  // 开始绘制多边形
  const startDrawing = () => {
    if (!currentItemName || !currentItemEmoji) {
      alert('请先选择或输入物品名称和emoji');
      return;
    }
    setIsDrawing(true);
    setCurrentPolygon([]);
  };

  // 完成当前多边形
  const finishPolygon = () => {
    if (currentPolygon.length < 3) {
      alert('多边形至少需要3个点');
      return;
    }

    const newItem: PolygonItem = {
      id: `item-${nextItemId}`,
      name: currentItemName,
      emoji: currentItemEmoji,
      points: currentPolygon,
      isComplete: true
    };

    setPolygonItems(prev => [...prev, newItem]);
    setCurrentPolygon([]);
    setIsDrawing(false);
    setNextItemId(prev => prev + 1);

    if (onPolygonComplete) {
      onPolygonComplete(newItem);
    }

    console.log('完成多边形:', newItem);
  };

  // 取消当前多边形
  const cancelPolygon = () => {
    setCurrentPolygon([]);
    setIsDrawing(false);
  };

  // 删除多边形
  const deletePolygon = (itemId: string) => {
    setPolygonItems(prev => prev.filter(item => item.id !== itemId));
  };

  // 删除当前多边形的最后一个点
  const removeLastPoint = () => {
    setCurrentPolygon(prev => prev.slice(0, -1));
  };

  // 清除所有多边形
  const clearAll = () => {
    setPolygonItems([]);
    setCurrentPolygon([]);
    setIsDrawing(false);
  };

  // 生成代码
  const generateCode = () => {
    const code = polygonItems.map(item => {
      const pointsCode = item.points.map(p => `{x: ${p.x}, y: ${p.y}}`).join(', ');
      return `{
  id: '${item.name.toLowerCase().replace(/\s+/g, '-')}',
  name: '${item.name}',
  emoji: '${item.emoji}',
  content: '在这里填写物品的故事内容',
  position: {
    type: 'polygon',
    points: [${pointsCode}]
  }
}`;
    }).join(',\n\n');

    return code;
  };

  // 复制代码
  const copyCode = () => {
    const code = generateCode();
    navigator.clipboard.writeText(code);
    alert('代码已复制到剪贴板！');
  };

  // 点在多边形内部检测（用于预览）
  const isPointInPolygon = (point: {x: number, y: number}, polygon: PolygonPoint[]) => {
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

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-7xl max-h-[95vh] overflow-auto">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">多边形物品标定工具</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* 物品选择区域 */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-2">选择要标定的物品：</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {presetItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentItemName(item.name);
                    setCurrentItemEmoji(item.emoji);
                  }}
                  className={`px-3 py-2 rounded border ${
                    currentItemName === item.name 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'bg-white border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {item.emoji} {item.name}
                </button>
              ))}
            </div>
            
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">物品名称:</label>
                <input
                  type="text"
                  value={currentItemName}
                  onChange={(e) => setCurrentItemName(e.target.value)}
                  className="px-3 py-2 border rounded w-32"
                  placeholder="输入物品名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Emoji:</label>
                <input
                  type="text"
                  value={currentItemEmoji}
                  onChange={(e) => setCurrentItemEmoji(e.target.value)}
                  className="px-3 py-2 border rounded w-20"
                  placeholder="🖋️"
                />
              </div>
            </div>
          </div>

          {/* 控制按钮 */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={startDrawing}
              disabled={isDrawing || !currentItemName || !currentItemEmoji}
              className={`px-4 py-2 rounded ${
                isDrawing || !currentItemName || !currentItemEmoji
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              开始绘制多边形
            </button>
            
            {isDrawing && (
              <>
                <button
                  onClick={finishPolygon}
                  disabled={currentPolygon.length < 3}
                  className={`px-4 py-2 rounded ${
                    currentPolygon.length < 3
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  完成多边形 ({currentPolygon.length}点)
                </button>
                <button
                  onClick={removeLastPoint}
                  disabled={currentPolygon.length === 0}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-300"
                >
                  撤销上一点
                </button>
                <button
                  onClick={cancelPolygon}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  取消绘制
                </button>
              </>
            )}
            
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              清除所有
            </button>
            
            <button
              onClick={copyCode}
              disabled={polygonItems.length === 0}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300"
            >
              复制代码
            </button>
          </div>

          {isDrawing && (
            <p className="text-sm text-blue-600 mb-4">
              🖱️ 点击图片上的点来绘制多边形轮廓。至少需要3个点才能完成多边形。
            </p>
          )}
        </div>
        
        <div className="flex">
          {/* 图片区域 */}
          <div className="flex-1 p-4">
            <div className="relative inline-block">
              <img
                ref={imageRef}
                src={imageUrl}
                alt="多边形标定"
                className={`max-w-full h-auto ${isDrawing ? 'cursor-crosshair' : ''}`}
                onClick={handleImageClick}
              />
              
              {/* 渲染已完成的多边形 */}
              {polygonItems.map(item => (
                <svg
                  key={item.id}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ left: 0, top: 0 }}
                >
                  <polygon
                    points={item.points.map(p => `${p.x}%,${p.y}%`).join(' ')}
                    fill="rgba(34, 197, 94, 0.3)"
                    stroke="rgb(34, 197, 94)"
                    strokeWidth="2"
                  />
                  {item.points.map(point => (
                    <circle
                      key={point.id}
                      cx={`${point.x}%`}
                      cy={`${point.y}%`}
                      r="4"
                      fill="rgb(34, 197, 94)"
                      stroke="white"
                      strokeWidth="2"
                    />
                  ))}
                </svg>
              ))}

              {/* 渲染当前正在绘制的多边形 */}
              {currentPolygon.length > 0 && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ left: 0, top: 0 }}
                >
                  {currentPolygon.length > 2 && (
                    <polygon
                      points={currentPolygon.map(p => `${p.x}%,${p.y}%`).join(' ')}
                      fill="rgba(59, 130, 246, 0.3)"
                      stroke="rgb(59, 130, 246)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  )}
                  {currentPolygon.length > 1 && (
                    <polyline
                      points={currentPolygon.map(p => `${p.x}%,${p.y}%`).join(' ')}
                      fill="none"
                      stroke="rgb(59, 130, 246)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  )}
                  {currentPolygon.map(point => (
                    <circle
                      key={point.id}
                      cx={`${point.x}%`}
                      cy={`${point.y}%`}
                      r="4"
                      fill="rgb(59, 130, 246)"
                      stroke="white"
                      strokeWidth="2"
                    />
                  ))}
                </svg>
              )}
            </div>
          </div>
          
          {/* 侧边栏 */}
          <div className="w-80 p-4 border-l bg-gray-50">
            <h3 className="font-bold mb-2">已标定的物品 ({polygonItems.length})</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {polygonItems.map(item => (
                <div key={item.id} className="flex justify-between items-center p-2 bg-white rounded border">
                  <span className="text-sm">
                    {item.emoji} {item.name} ({item.points.length}点)
                  </span>
                  <button
                    onClick={() => deletePolygon(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>
            
            {polygonItems.length > 0 && (
              <div className="mt-4 p-3 bg-gray-100 rounded">
                <h4 className="font-bold text-sm mb-2">生成的代码:</h4>
                <pre className="text-xs bg-white p-2 rounded border overflow-x-auto max-h-40 overflow-y-auto">
                  {generateCode()}
                </pre>
              </div>
            )}

            <div className="mt-4 p-3 bg-blue-50 rounded">
              <h4 className="font-bold text-sm mb-2">使用说明:</h4>
              <ul className="text-xs space-y-1">
                <li>1. 选择要标定的物品</li>
                <li>2. 点击"开始绘制多边形"</li>
                <li>3. 在图片上点击物品边缘的关键点</li>
                <li>4. 至少标记3个点后点击"完成多边形"</li>
                <li>5. 重复步骤标定其他物品</li>
                <li>6. 最后复制生成的代码</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolygonCoordinateHelper; 