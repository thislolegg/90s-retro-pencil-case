
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 overflow-hidden">
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

      <div className="relative z-10">
        {/* Hero Section */}
        <section className={`min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-1000 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 font-serif tracking-tight">
              My 90s Pencil Case
            </h1>
            <p className="text-xl md:text-2xl text-amber-800 mb-4 font-medium">
              我的90年代文具盒
            </p>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto leading-relaxed">
              记忆中的AI召唤仪器，藏着我们最小的野心与最大的小秘密
            </p>
          </div>

          <PencilCaseHero 
            isOpened={isOpened} 
            onOpen={handleOpenPencilCase}
          />

          {!isOpened && (
            <div className="mt-12 animate-bounce">
              <p className="text-amber-600 text-lg">点击文具盒，开启回忆之旅</p>
            </div>
          )}
        </section>

        {/* Stationery Display Section */}
        {isOpened && (
          <section className="min-h-screen p-8 animate-fade-in">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-amber-800 mb-4 font-serif">
                  文具宝藏 Stash of Stationery
                </h2>
                <p className="text-amber-700 text-lg">
                  点击每一件文具，让AI重现你的童年记忆
                </p>
              </div>

              <StationeryGrid onItemClick={handleItemClick} />

              <div className="text-center mt-16">
                <Button
                  onClick={handleOpenHiddenLayer}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  🔐 发现秘密夹层
                </Button>
              </div>
            </div>
          </section>
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
