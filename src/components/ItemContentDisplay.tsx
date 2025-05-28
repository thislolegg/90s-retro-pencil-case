import React from 'react';
import { PencilCaseItem } from '@/types';

interface ItemContentDisplayProps {
  selectedItem: PencilCaseItem | null;
  isVisible: boolean;
  onClose?: () => void;
}

const ItemContentDisplay: React.FC<ItemContentDisplayProps> = ({
  selectedItem,
  isVisible,
  onClose
}) => {
  if (!isVisible) return null;

  return (
    <div className={`fixed left-1/2 top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-out opacity-100 translate-x-0 ml-12 lg:ml-16 xl:ml-24`}>
      <div className="relative bg-gradient-to-br from-amber-200 via-amber-100 to-yellow-100 p-8 rounded-3xl shadow-2xl max-w-lg min-h-[300px] border border-amber-300">
        
        {/* 内容 */}
        <div className="relative z-10">
          {selectedItem ? (
            <div className="space-y-6">
              {/* 物品标题 */}
              <div className="text-center border-b border-amber-400 pb-4">
                <h3 className="text-3xl font-bold text-amber-900 font-zcool tracking-wide">
                  {selectedItem.name}
                </h3>
              </div>

              {/* 物品故事内容 */}
              <div className="text-center">
                <div className="bg-white/90 p-6 rounded-2xl border border-amber-300 shadow-inner">
                  <div className="text-amber-900 font-zcool text-xl leading-relaxed whitespace-pre-line font-semibold">
                    {selectedItem.content}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // 默认提示内容
            <div className="text-center space-y-6">
              <div className="text-6xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>
                👈🏻
              </div>
              <div className="space-y-3">
                <p className="text-amber-900 font-zcool text-2xl font-bold tracking-wide">
                  点击左侧的物品
                </p>
                <p className="text-amber-800 font-zcool text-xl leading-relaxed font-semibold">
                  看看它们都有什么故事
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 发光效果 */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-300/20 via-yellow-300/30 to-orange-300/20 animate-pulse" style={{ animationDuration: '3s' }}></div>
      </div>
    </div>
  );
};

export default ItemContentDisplay; 