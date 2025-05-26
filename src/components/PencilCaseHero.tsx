
import React from 'react';
import { Button } from "@/components/ui/button";

interface PencilCaseHeroProps {
  isOpened: boolean;
  onOpen: () => void;
}

const PencilCaseHero: React.FC<PencilCaseHeroProps> = ({ isOpened, onOpen }) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Pencil Case Container with 3D perspective */}
      <div 
        className={`relative transition-all duration-1000 cursor-pointer transform-gpu ${
          !isOpened ? 'hover:scale-105 hover:-translate-y-2' : ''
        }`}
        style={{ perspective: '1000px' }}
        onClick={!isOpened ? onOpen : undefined}
      >
        {/* Main Pencil Case Body (Bottom Part) */}
        <div 
          className={`relative w-96 h-32 transition-all duration-1000 ${
            isOpened ? 'transform translate-y-2' : ''
          }`}
          style={{
            background: `linear-gradient(145deg, #4a5568 0%, #2d3748 50%, #1a202c 100%)`,
            borderRadius: '12px',
            boxShadow: `
              inset 0 2px 4px rgba(255,255,255,0.1),
              inset 0 -2px 4px rgba(0,0,0,0.3),
              0 8px 20px rgba(0,0,0,0.4),
              0 4px 8px rgba(0,0,0,0.2)
            `
          }}
        >
          {/* Metal texture overlay */}
          <div 
            className="absolute inset-0 rounded-xl opacity-30"
            style={{
              background: `
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%),
                linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)
              `
            }}
          />
          
          {/* Corner reinforcements */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-gray-600 rounded-sm shadow-inner" 
               style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
          <div className="absolute top-2 right-2 w-4 h-4 bg-gray-600 rounded-sm shadow-inner" 
               style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
          <div className="absolute bottom-2 left-2 w-4 h-4 bg-gray-600 rounded-sm shadow-inner" 
               style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }} />
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-gray-600 rounded-sm shadow-inner" 
               style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }} />

          {/* Scratches and wear marks */}
          <div className="absolute top-4 left-8 w-16 h-0.5 bg-gray-400 opacity-60 transform rotate-12 rounded-full" />
          <div className="absolute bottom-6 right-12 w-8 h-0.5 bg-gray-400 opacity-40 transform -rotate-6 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-12 h-0.5 bg-gray-400 opacity-50 transform rotate-45 rounded-full" />

          {/* Rust spots */}
          <div className="absolute top-3 right-6 w-3 h-3 rounded-full" 
               style={{ background: 'radial-gradient(circle, #d69e2e 0%, #b7791f 100%)', opacity: 0.7 }} />
          <div className="absolute bottom-4 left-10 w-2 h-2 rounded-full" 
               style={{ background: 'radial-gradient(circle, #c05621 0%, #9c4221 100%)', opacity: 0.6 }} />

          {/* Vintage stickers */}
          <div className="absolute top-4 left-12 text-3xl transform -rotate-12 drop-shadow-sm">🌟</div>
          <div className="absolute top-6 right-16 text-2xl transform rotate-45 drop-shadow-sm">💫</div>
          <div className="absolute bottom-6 right-20 text-xl transform -rotate-6 drop-shadow-sm">🎈</div>
          <div className="absolute bottom-8 left-20 text-lg transform rotate-12 drop-shadow-sm">⚽</div>

          {/* Brand label with embossed effect */}
          <div className="absolute bottom-3 left-4 px-2 py-1 text-xs text-gray-300 font-mono bg-gray-700 rounded shadow-inner border border-gray-600">
            HERO™ 1995
          </div>

          {/* Lock mechanism */}
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <div className="w-6 h-8 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-sm shadow-md border border-yellow-700">
              <div className="w-full h-2 bg-yellow-300 rounded-t-sm" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-800 rounded-full" />
            </div>
          </div>
        </div>

        {/* Lid (Top Part) */}
        <div 
          className={`absolute top-0 left-0 w-96 h-16 transition-all duration-1000 origin-bottom transform-gpu ${
            isOpened 
              ? 'transform -rotate-x-120 -translate-y-8 translate-z-4' 
              : 'transform rotate-x-0'
          }`}
          style={{
            background: `linear-gradient(145deg, #5a6578 0%, #3d4852 50%, #2a3441 100%)`,
            borderRadius: '12px 12px 8px 8px',
            boxShadow: `
              inset 0 2px 4px rgba(255,255,255,0.15),
              inset 0 -2px 4px rgba(0,0,0,0.3),
              0 4px 12px rgba(0,0,0,0.3)
            `,
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Lid metal texture */}
          <div 
            className="absolute inset-0 rounded-t-xl opacity-40"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 50%),
                linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)
              `
            }}
          />

          {/* Hinge details */}
          <div className="absolute bottom-0 left-8 w-3 h-3 bg-gray-800 rounded-full shadow-inner" />
          <div className="absolute bottom-0 left-16 w-3 h-3 bg-gray-800 rounded-full shadow-inner" />
          <div className="absolute bottom-0 right-16 w-3 h-3 bg-gray-800 rounded-full shadow-inner" />
          <div className="absolute bottom-0 right-8 w-3 h-3 bg-gray-800 rounded-full shadow-inner" />

          {/* Lid stickers */}
          <div className="absolute top-2 left-12 text-2xl transform -rotate-6 drop-shadow-sm">🏀</div>
          <div className="absolute top-1 right-20 text-xl transform rotate-12 drop-shadow-sm">⭐</div>
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 text-lg">🚀</div>

          {/* Lid scratches */}
          <div className="absolute top-3 left-20 w-12 h-0.5 bg-gray-400 opacity-50 transform rotate-6 rounded-full" />
        </div>

        {/* Interior when opened */}
        {isOpened && (
          <div className="absolute top-8 left-2 w-92 h-28 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg border-4 border-gray-700 animate-fade-in shadow-inner">
            {/* Interior compartments */}
            <div className="absolute inset-2 grid grid-cols-3 gap-1">
              {/* Left compartment */}
              <div className="bg-amber-50 rounded border border-amber-200 p-2 shadow-inner">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-lg animate-bounce" style={{ animationDelay: '0.1s' }}>✏️</div>
                  <div className="text-lg animate-bounce" style={{ animationDelay: '0.2s' }}>🖊️</div>
                  <div className="text-lg animate-bounce" style={{ animationDelay: '0.3s' }}>✂️</div>
                  <div className="text-lg animate-bounce" style={{ animationDelay: '0.4s' }}>📏</div>
                </div>
              </div>
              
              {/* Middle compartment */}
              <div className="bg-orange-50 rounded border border-orange-200 p-2 shadow-inner">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-lg animate-bounce" style={{ animationDelay: '0.5s' }}>🖍️</div>
                  <div className="text-lg animate-bounce" style={{ animationDelay: '0.6s' }}>📎</div>
                  <div className="text-lg animate-bounce" style={{ animationDelay: '0.7s' }}>🌈</div>
                  <div className="text-lg animate-bounce" style={{ animationDelay: '0.8s' }}>⭐</div>
                </div>
              </div>
              
              {/* Right compartment */}
              <div className="bg-yellow-50 rounded border border-yellow-200 p-2 shadow-inner">
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-lg animate-bounce" style={{ animationDelay: '0.9s' }}>🏀</div>
                  <div className="text-lg animate-bounce" style={{ animationDelay: '1.0s' }}>💫</div>
                  <div className="text-lg animate-bounce" style={{ animationDelay: '1.1s' }}>🎈</div>
                  <div className="text-lg animate-bounce" style={{ animationDelay: '1.2s' }}>🚀</div>
                </div>
              </div>
            </div>
            
            {/* Instruction text */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
              <p className="text-xs text-amber-700 text-center font-medium">
                向下滚动探索每一件文具...
              </p>
            </div>
          </div>
        )}

        {/* Shine effect when closed */}
        {!isOpened && (
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent transform -skew-x-12 animate-pulse opacity-20 rounded-xl"
            style={{ animationDuration: '3s' }}
          />
        )}
      </div>

      {/* Action button */}
      {!isOpened && (
        <div className="mt-12 animate-bounce">
          <Button
            onClick={onOpen}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
          >
            点击打开文具盒 ✨
          </Button>
          <p className="text-amber-600 text-sm mt-2 text-center">
            发现隐藏的童年宝藏
          </p>
        </div>
      )}

      {/* Close button when opened */}
      {isOpened && (
        <div className="mt-8 animate-fade-in">
          <Button
            onClick={onOpen}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300"
          >
            关闭文具盒 📦
          </Button>
        </div>
      )}
    </div>
  );
};

export default PencilCaseHero;
