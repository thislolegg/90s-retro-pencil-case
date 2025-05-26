
import React from 'react';
import { Button } from "@/components/ui/button";

interface PencilCaseHeroProps {
  isOpened: boolean;
  onOpen: () => void;
}

const PencilCaseHero: React.FC<PencilCaseHeroProps> = ({ isOpened, onOpen }) => {
  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 py-20">
      {/* Main Title */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent mb-4">
          My 90s Pencil Case
        </h1>
        <p className="text-xl text-amber-700 font-medium">
          记忆中的AI召唤仪器，藏着我们最小的野心与最大的小秘密
        </p>
      </div>

      {/* Pencil Case Container with enhanced 3D perspective */}
      <div 
        className={`relative transition-all duration-1500 ease-out cursor-pointer transform-gpu ${
          !isOpened ? 'hover:scale-110 hover:-translate-y-4 hover:rotate-y-12' : ''
        }`}
        style={{ 
          perspective: '2000px',
          transformStyle: 'preserve-3d'
        }}
        onClick={!isOpened ? onOpen : undefined}
      >
        {/* Shadow beneath the pencil case */}
        <div 
          className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1500 ${
            isOpened ? 'w-[500px] h-32 opacity-30' : 'w-96 h-16 opacity-50'
          }`}
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
            filter: 'blur(8px)'
          }}
        />

        {/* Main Pencil Case Body (Bottom Part) */}
        <div 
          className={`relative w-[400px] h-40 transition-all duration-1500 ease-out ${
            isOpened ? 'transform translate-y-3' : ''
          }`}
          style={{
            background: `
              linear-gradient(145deg, #4a5568 0%, #2d3748 30%, #1a202c 70%, #0f1419 100%),
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)
            `,
            backgroundBlendMode: 'overlay',
            borderRadius: '16px',
            boxShadow: `
              inset 0 4px 8px rgba(255,255,255,0.2),
              inset 0 -4px 8px rgba(0,0,0,0.4),
              0 20px 40px rgba(0,0,0,0.6),
              0 8px 16px rgba(0,0,0,0.3),
              0 0 0 2px rgba(255,255,255,0.1)
            `,
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          {/* Realistic metal texture overlay */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-40"
            style={{
              background: `
                repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px),
                radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 0%, transparent 50%),
                linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)
              `
            }}
          />
          
          {/* Enhanced corner reinforcements with screws */}
          {[
            { top: '8px', left: '8px', rotate: '0deg' },
            { top: '8px', right: '8px', rotate: '90deg' },
            { bottom: '8px', left: '8px', rotate: '270deg' },
            { bottom: '8px', right: '8px', rotate: '180deg' }
          ].map((pos, i) => (
            <div key={i} className="absolute" style={pos}>
              <div className="w-6 h-6 bg-gradient-to-br from-gray-500 to-gray-700 rounded-sm shadow-inner border border-gray-600"
                   style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}>
                <div className="absolute top-1 left-1 w-1 h-1 bg-gray-800 rounded-full" />
              </div>
            </div>
          ))}

          {/* Realistic wear patterns and scratches */}
          <div className="absolute top-6 left-12 w-20 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-60 transform rotate-12 rounded-full" />
          <div className="absolute bottom-8 right-16 w-12 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-40 transform -rotate-6 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50 transform rotate-45 rounded-full" />
          <div className="absolute top-8 right-8 w-8 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-30 transform -rotate-12 rounded-full" />

          {/* Enhanced rust spots with realistic gradients */}
          <div className="absolute top-4 right-8 w-4 h-4 rounded-full opacity-70" 
               style={{ 
                 background: 'radial-gradient(circle, #d69e2e 0%, #b7791f 60%, #8b5a2b 100%)',
                 filter: 'blur(1px)'
               }} />
          <div className="absolute bottom-6 left-12 w-3 h-3 rounded-full opacity-60" 
               style={{ 
                 background: 'radial-gradient(circle, #c05621 0%, #9c4221 60%, #7c2d12 100%)',
                 filter: 'blur(0.5px)'
               }} />
          <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full opacity-50" 
               style={{ 
                 background: 'radial-gradient(circle, #92400e 0%, #78350f 100%)',
                 filter: 'blur(0.5px)'
               }} />

          {/* Vintage stickers with enhanced 3D effect */}
          <div className="absolute top-6 left-16 transform -rotate-12 drop-shadow-lg">
            <div className="relative bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg p-2 border border-yellow-600 shadow-md">
              <div className="text-2xl">🌟</div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-lg" />
            </div>
          </div>
          
          <div className="absolute top-8 right-20 transform rotate-45 drop-shadow-lg">
            <div className="relative bg-gradient-to-br from-pink-300 to-pink-500 rounded-full p-2 border border-pink-600 shadow-md">
              <div className="text-xl">💫</div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
            </div>
          </div>

          <div className="absolute bottom-8 right-24 transform -rotate-6 drop-shadow-lg">
            <div className="relative bg-gradient-to-br from-blue-300 to-blue-500 rounded-lg p-1.5 border border-blue-600 shadow-md">
              <div className="text-lg">🎈</div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-lg" />
            </div>
          </div>

          <div className="absolute bottom-10 left-24 transform rotate-12 drop-shadow-lg">
            <div className="relative bg-gradient-to-br from-green-300 to-green-500 rounded-full p-1.5 border border-green-600 shadow-md">
              <div className="text-base">⚽</div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
            </div>
          </div>

          {/* Enhanced brand label */}
          <div className="absolute bottom-4 left-6 px-3 py-1.5 text-xs text-gray-200 font-mono bg-gradient-to-r from-gray-800 to-gray-700 rounded-md shadow-inner border border-gray-600">
            <div className="relative">
              HERO™ 1995
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-md" />
            </div>
          </div>

          {/* Enhanced lock mechanism */}
          <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
            <div className="relative w-8 h-10 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg shadow-lg border border-yellow-700"
                 style={{ boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)' }}>
              <div className="w-full h-3 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-t-lg" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-br from-yellow-800 to-yellow-900 rounded-full shadow-inner" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-yellow-700 rounded-full" />
            </div>
          </div>

          {/* Realistic edge details */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-b-2xl shadow-inner" />
        </div>

        {/* Enhanced Lid (Top Part) with realistic hinge mechanism */}
        <div 
          className={`absolute top-0 left-0 w-[400px] h-20 transition-all duration-1500 ease-out origin-bottom transform-gpu ${
            isOpened 
              ? 'transform rotateX(-130deg) translateY(-12px) translateZ(20px)' 
              : 'transform rotateX(0deg)'
          }`}
          style={{
            background: `
              linear-gradient(145deg, #5a6578 0%, #3d4852 30%, #2a3441 70%, #1f2937 100%),
              radial-gradient(circle at 40% 40%, rgba(255,255,255,0.2) 0%, transparent 50%)
            `,
            backgroundBlendMode: 'overlay',
            borderRadius: '16px 16px 12px 12px',
            boxShadow: `
              inset 0 3px 6px rgba(255,255,255,0.25),
              inset 0 -3px 6px rgba(0,0,0,0.4),
              0 8px 24px rgba(0,0,0,0.4),
              0 0 0 1px rgba(255,255,255,0.15)
            `,
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          {/* Lid texture enhancement */}
          <div 
            className="absolute inset-0 rounded-t-2xl opacity-50"
            style={{
              background: `
                repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(255,255,255,0.1) 3px, rgba(255,255,255,0.1) 6px),
                radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5) 0%, transparent 50%),
                linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)
              `
            }}
          />

          {/* Realistic hinge mechanism */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 flex justify-center items-center space-x-8">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="w-4 h-4 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full shadow-inner border border-gray-900"
                   style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.5)' }}>
                <div className="w-2 h-2 bg-gray-900 rounded-full m-1" />
              </div>
            ))}
          </div>

          {/* Lid stickers with enhanced realism */}
          <div className="absolute top-2 left-16 transform -rotate-6 drop-shadow-lg">
            <div className="relative bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg p-2 border border-orange-600 shadow-md">
              <div className="text-xl">🏀</div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-lg" />
            </div>
          </div>
          
          <div className="absolute top-1 right-24 transform rotate-12 drop-shadow-lg">
            <div className="relative bg-gradient-to-br from-purple-300 to-purple-500 rounded-full p-1.5 border border-purple-600 shadow-md">
              <div className="text-lg">⭐</div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
            </div>
          </div>

          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 drop-shadow-lg">
            <div className="relative bg-gradient-to-br from-red-300 to-red-500 rounded-lg p-1.5 border border-red-600 shadow-md">
              <div className="text-lg">🚀</div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-lg" />
            </div>
          </div>

          {/* Lid wear patterns */}
          <div className="absolute top-4 left-24 w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50 transform rotate-6 rounded-full" />
          <div className="absolute top-2 right-12 w-8 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-40 transform -rotate-12 rounded-full" />
        </div>

        {/* Enhanced Interior when opened */}
        {isOpened && (
          <div className="absolute top-12 left-3 w-[394px] h-36 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 rounded-xl border-4 border-gray-700 animate-fade-in shadow-inner"
               style={{ 
                 boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.2), inset 0 -2px 4px rgba(255,255,255,0.3)',
                 background: `
                   linear-gradient(145deg, #fef3c7 0%, #fed7aa 50%, #fde68a 100%),
                   radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 50%)
                 `
               }}>
            
            {/* Interior fabric texture */}
            <div className="absolute inset-0 rounded-lg opacity-30"
                 style={{
                   background: `
                     repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(139,69,19,0.1) 1px, rgba(139,69,19,0.1) 2px),
                     repeating-linear-gradient(-45deg, transparent, transparent 1px, rgba(160,82,45,0.1) 1px, rgba(160,82,45,0.1) 2px)
                   `
                 }} />

            {/* Enhanced interior compartments */}
            <div className="absolute inset-3 grid grid-cols-3 gap-2">
              {/* Left compartment */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border-2 border-amber-200 p-2 shadow-inner"
                   style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-lg animate-bounce transform hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: '0.1s' }}>✏️</div>
                  <div className="text-lg animate-bounce transform hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: '0.2s' }}>🖊️</div>
                  <div className="text-lg animate-bounce transform hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: '0.3s' }}>✂️</div>
                  <div className="text-lg animate-bounce transform hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: '0.4s' }}>📏</div>
                </div>
              </div>
              
              {/* Middle compartment */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border-2 border-orange-200 p-2 shadow-inner"
                   style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-lg animate-bounce transform hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: '0.5s' }}>🖍️</div>
                  <div className="text-lg animate-bounce transform hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: '0.6s' }}>📎</div>
                  <div className="text-lg animate-bounce transform hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: '0.7s' }}>🌈</div>
                  <div className="text-lg animate-bounce transform hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: '0.8s' }}>⭐</div>
                </div>
              </div>
              
              {/* Right compartment */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border-2 border-yellow-200 p-2 shadow-inner"
                   style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' }}>
                <div className="grid grid-cols-2 gap-1">
                  <div className="text-lg animate-bounce transform hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: '0.9s' }}>🏀</div>
                  <div className="text-lg animate-bounce transform hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: '1.0s' }}>💫</div>
                  <div className="text-lg animate-bounce transform hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: '1.1s' }}>🎈</div>
                  <div className="text-lg animate-bounce transform hover:scale-110 transition-transform cursor-pointer" style={{ animationDelay: '1.2s' }}>🚀</div>
                </div>
              </div>
            </div>
            
            {/* Enhanced instruction text */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-1 shadow-lg border border-amber-200">
                <p className="text-xs text-amber-800 text-center font-medium">
                  向下滚动探索每一件文具的故事...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced shine effect when closed */}
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

      {/* Enhanced action buttons */}
      {!isOpened && (
        <div className="mt-20 animate-bounce text-center">
          <Button
            onClick={onOpen}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white px-12 py-4 text-xl rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 font-bold border-2 border-white/20"
            style={{
              boxShadow: '0 20px 40px rgba(245, 101, 101, 0.4), inset 0 2px 4px rgba(255,255,255,0.3)'
            }}
          >
            <span className="flex items-center gap-3">
              点击打开文具盒 
              <span className="text-2xl animate-pulse">✨</span>
            </span>
          </Button>
          <p className="text-amber-700 text-lg mt-4 font-medium">
            发现隐藏的童年宝藏
          </p>
          <p className="text-amber-600 text-sm mt-2 opacity-75">
            每一个贴纸，每一支笔，都是回忆的碎片
          </p>
        </div>
      )}

      {/* Enhanced close button when opened */}
      {isOpened && (
        <div className="mt-12 animate-fade-in text-center">
          <Button
            onClick={onOpen}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-3 text-lg rounded-full shadow-xl transition-all duration-300 border border-white/20"
            style={{
              boxShadow: '0 10px 20px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)'
            }}
          >
            <span className="flex items-center gap-2">
              关闭文具盒 
              <span className="text-xl">📦</span>
            </span>
          </Button>
          <p className="text-amber-600 text-sm mt-3 opacity-75">
            记忆已经苏醒，让我们继续探索...
          </p>
        </div>
      )}

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
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
