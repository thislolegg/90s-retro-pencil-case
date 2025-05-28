import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface PencilCaseHeroProps {
  isOpened: boolean;
  onOpen: () => void;
}

const PencilCaseHero: React.FC<PencilCaseHeroProps> = ({ isOpened, onOpen }) => {
  const [animationPhase, setAnimationPhase] = useState<'closed' | 'opening' | 'moving-left'>('closed');

  useEffect(() => {
    if (isOpened) {
      // 第一阶段：打开动画
      setAnimationPhase('opening');
      
      // 1秒后开始移动到左侧
      const timer = setTimeout(() => {
        setAnimationPhase('moving-left');
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setAnimationPhase('closed');
    }
  }, [isOpened]);

  const getContainerClasses = () => {
    switch (animationPhase) {
      case 'closed':
        return 'justify-center items-center';
      case 'opening':
        return 'justify-center items-center';
      case 'moving-left':
        return 'justify-start items-start pl-8 pt-8 h-screen';
      default:
        return 'justify-center items-center';
    }
  };

  const getPencilCaseClasses = () => {
    switch (animationPhase) {
      case 'closed':
        return 'w-[700px] h-auto hover:scale-105 hover:-translate-y-2';
      case 'opening':
        return 'w-[500px] h-auto';
      case 'moving-left':
        return 'w-[400px] h-auto';
      default:
        return 'w-[700px] h-auto';
    }
  };

  return (
    <div className={`relative flex transition-all duration-1000 ease-out ${getContainerClasses()}`}>
      {/* Pencil Case Image Container */}
      <div 
        className={`relative transition-all duration-1000 ease-out cursor-pointer transform-gpu ${
          !isOpened ? 'hover:scale-105 hover:-translate-y-2' : ''
        }`}
        onClick={!isOpened ? onOpen : undefined}
      >
        {/* Shadow beneath the pencil case */}
        <div 
          className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
            isOpened ? 'w-[600px] h-30 opacity-30' : 'w-[700px] h-24 opacity-50'
          }`}
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
            filter: 'blur(8px)'
          }}
        />

        {/* Pencil Case Image */}
        <div className="relative">
          <img 
            src={isOpened ? "/images/pencil-case-opened.png" : "/images/pencil-case-closed.png"}
            alt={isOpened ? "打开的文具盒" : "关闭的文具盒"}
            className={`transition-all duration-1000 ease-out ${getPencilCaseClasses()}`}
            style={{
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
              maxWidth: '100%',
              height: 'auto'
            }}
          />
          
          {/* Shine effect when closed */}
          {!isOpened && (
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent transform -skew-x-12 animate-pulse opacity-20 rounded-2xl pointer-events-none"
              style={{ 
                animationDuration: '4s',
                background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.4) 55%, transparent 100%)'
              }}
            />
          )}
        </div>

        {/* Instruction text when opened and in center */}
        {isOpened && animationPhase === 'opening' && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg border border-amber-200">
              <p className="text-sm text-amber-800 text-center font-medium">
                点击文具盒中的物品探索回忆...
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Close button when opened and moved to left */}
      {isOpened && animationPhase === 'moving-left' && (
        <div className="absolute top-4 right-4 animate-fade-in">
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-2 text-sm rounded-full shadow-xl transition-all duration-300 border border-white/20"
            style={{
              boxShadow: '0 10px 20px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)'
            }}
          >
            <span className="flex items-center gap-2">
              关闭文具盒 
              <span className="text-lg">📦</span>
            </span>
          </Button>
        </div>
      )}

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PencilCaseHero;
