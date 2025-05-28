import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PencilCaseHero from "@/components/PencilCaseHero";
import StationeryGrid from "@/components/StationeryGrid";
import HiddenLayer from "@/components/HiddenLayer";
import StationeryModal from "@/components/StationeryModal";
import { StationeryItem } from "@/types/stationery";

const Index = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [showHiddenLayer, setShowHiddenLayer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StationeryItem | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'closed' | 'opening' | 'moved'>('closed');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isOpened) {
      setAnimationPhase('opening');
      // 1秒后文具盒移动到左侧
      const timer = setTimeout(() => {
        setAnimationPhase('moved');
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setAnimationPhase('closed');
    }
  }, [isOpened]);

  const handleOpenPencilCase = () => {
    setIsOpened(true);
  };

  const handleItemClick = (item: StationeryItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleOpenHiddenLayer = () => {
    setShowHiddenLayer(true);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            #8B4513 2px,
            #8B4513 4px
          )`
        }} />
      </div>

      <div className="relative z-10 h-full">
        {/* Hero Section - 未打开时的全屏展示 */}
        {!isOpened && (
          <div className={`h-full flex flex-col items-center justify-center p-4 transition-all duration-1000 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
            {/* 标题区域 */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 font-ma-shan tracking-wide">
                90后的文具盒
              </h1>
              <p className="text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed font-zcool">
                小小一方天地，藏着我们的童年记忆
              </p>
            </div>

            {/* 文具盒区域 */}
            <div className="flex flex-col items-center justify-center">
              <PencilCaseHero 
                isOpened={isOpened} 
                onOpen={handleOpenPencilCase}
              />
              
              {/* 简单提示文字 */}
              <div className="mt-6">
                <p className="text-amber-600 text-lg font-medium">
                  👆🏻开启文具盒
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 打开后的布局 - 左侧文具盒，右侧介绍 */}
        {isOpened && (
          <div className="h-full flex overflow-hidden">
            {/* 左侧文具盒 */}
            <div className="flex-shrink-0">
              <PencilCaseHero 
                isOpened={isOpened} 
                onOpen={handleOpenPencilCase}
              />
            </div>

            {/* 右侧内容区域 */}
            {animationPhase === 'moved' && (
              <div className="flex-1 p-8 animate-fade-in overflow-y-auto">
                <div className="max-w-4xl">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-amber-800 mb-4 font-serif">
                      文具宝藏 Stash of Stationery
                    </h2>
                    <p className="text-amber-700 text-lg">
                      点击每一件文具，让AI重现你的童年记忆
                    </p>
                  </div>

                  <StationeryGrid onItemClick={handleItemClick} />

                  <div className="text-center mt-12">
                    <Button
                      onClick={handleOpenHiddenLayer}
                      className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      🔐 发现秘密夹层
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hidden Layer Section */}
        {showHiddenLayer && (
          <HiddenLayer />
        )}
      </div>

      {/* Stationery Modal */}
      {selectedItem && (
        <StationeryModal
          item={selectedItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Index;
