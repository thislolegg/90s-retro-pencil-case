import React, { useState, useRef } from 'react';

interface CoordinateHelperProps {
  imageUrl: string;
  onCoordinateSelect?: (x: number, y: number) => void;
  onClose?: () => void;
}

const CoordinateHelper: React.FC<CoordinateHelperProps> = ({
  imageUrl,
  onCoordinateSelect,
  onClose
}) => {
  const [coordinates, setCoordinates] = useState<Array<{x: number, y: number, id: number}>>([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const [nextId, setNextId] = useState(1);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!isEnabled || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const newCoordinate = { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, id: nextId };
    setCoordinates(prev => [...prev, newCoordinate]);
    setNextId(prev => prev + 1);

    if (onCoordinateSelect) {
      onCoordinateSelect(newCoordinate.x, newCoordinate.y);
    }

    console.log(`点击位置: x: ${newCoordinate.x}%, y: ${newCoordinate.y}%`);
  };

  const clearCoordinates = () => {
    setCoordinates([]);
    setNextId(1);
  };

  const removeCoordinate = (id: number) => {
    setCoordinates(prev => prev.filter(coord => coord.id !== id));
  };

  const copyCoordinates = () => {
    const coordText = coordinates.map(coord => 
      `{ x: ${coord.x}, y: ${coord.y} }`
    ).join(',\n');
    navigator.clipboard.writeText(coordText);
    alert('坐标已复制到剪贴板！');
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] overflow-auto">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">坐标标定工具</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className={`px-4 py-2 rounded ${
                isEnabled 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {isEnabled ? '标定模式开启' : '点击开启标定'}
            </button>
            <button
              onClick={clearCoordinates}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              清除所有点
            </button>
            <button
              onClick={copyCoordinates}
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={coordinates.length === 0}
            >
              复制坐标
            </button>
          </div>
          {isEnabled && (
            <p className="text-sm text-gray-600">
              点击图片上的物品位置来标记坐标。坐标会显示在右侧列表中。按ESC键或点击右上角×关闭工具。
            </p>
          )}
        </div>
        
        <div className="flex">
          <div className="flex-1 p-4">
            <div className="relative inline-block">
              <img
                ref={imageRef}
                src={imageUrl}
                alt="坐标标定"
                className={`max-w-full h-auto ${isEnabled ? 'cursor-crosshair' : ''}`}
                onClick={handleImageClick}
              />
              
              {/* 显示标记点 */}
              {coordinates.map(coord => (
                <div
                  key={coord.id}
                  className="absolute w-4 h-4 bg-red-500 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${coord.x}%`,
                    top: `${coord.y}%`
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCoordinate(coord.id);
                  }}
                  title={`点击删除 (${coord.x}%, ${coord.y}%)`}
                >
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs bg-black text-white px-1 rounded">
                    {coord.id}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-80 p-4 border-l bg-gray-50">
            <h3 className="font-bold mb-2">标记的坐标点 ({coordinates.length})</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {coordinates.map(coord => (
                <div key={coord.id} className="flex justify-between items-center p-2 bg-white rounded border">
                  <span className="text-sm">
                    点{coord.id}: ({coord.x}%, {coord.y}%)
                  </span>
                  <button
                    onClick={() => removeCoordinate(coord.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>
            
            {coordinates.length > 0 && (
              <div className="mt-4 p-3 bg-gray-100 rounded">
                <h4 className="font-bold text-sm mb-2">代码格式:</h4>
                <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
{coordinates.map(coord => 
`position: {
  x: ${coord.x},
  y: ${coord.y},
  width: 10, // 需要调整
  height: 8  // 需要调整
}`).join(',\n\n')}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinateHelper; 