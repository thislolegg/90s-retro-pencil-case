
import React from 'react';
import { Button } from "@/components/ui/button";

interface PencilCaseHeroProps {
  isOpened: boolean;
  onOpen: () => void;
}

const PencilCaseHero: React.FC<PencilCaseHeroProps> = ({ isOpened, onOpen }) => {
  return (
    <div className="relative">
      {/* Pencil Case Container */}
      <div className={`relative transition-all duration-1000 cursor-pointer ${!isOpened ? 'hover:scale-105' : ''}`}>
        {/* Main Pencil Case Body */}
        <div 
          className={`w-80 h-48 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 rounded-lg shadow-2xl border-4 border-slate-700 relative overflow-hidden transition-all duration-1000 ${
            isOpened ? 'transform -rotate-12 translate-y-4' : ''
          }`}
          onClick={!isOpened ? onOpen : undefined}
        >
          {/* Metal Texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 to-transparent" />
          
          {/* Rust Spots */}
          <div className="absolute top-2 right-4 w-3 h-3 bg-orange-600 rounded-full opacity-60" />
          <div className="absolute bottom-4 left-6 w-2 h-2 bg-orange-700 rounded-full opacity-70" />
          
          {/* Stickers on the case */}
          <div className="absolute top-3 left-4 text-2xl transform -rotate-12">🌟</div>
          <div className="absolute top-8 right-8 text-xl transform rotate-45">💫</div>
          <div className="absolute bottom-6 right-12 text-lg">🎈</div>
          
          {/* Brand Label */}
          <div className="absolute bottom-2 left-2 text-xs text-slate-300 font-mono">
            HERO™ 1995
          </div>
        </div>

        {/* Lid (opens upward) */}
        <div 
          className={`absolute top-0 left-0 w-80 h-24 bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 rounded-t-lg border-4 border-slate-700 border-b-0 transition-all duration-1000 origin-bottom ${
            isOpened ? 'transform -rotate-45 -translate-y-12' : ''
          }`}
          style={{ transformOrigin: 'bottom center' }}
        >
          {/* Metal Texture on lid */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-300/30 to-transparent rounded-t-lg" />
          
          {/* Hinge details */}
          <div className="absolute bottom-0 left-4 w-2 h-2 bg-slate-800 rounded-full" />
          <div className="absolute bottom-0 right-4 w-2 h-2 bg-slate-800 rounded-full" />
          
          {/* More stickers on lid */}
          <div className="absolute top-2 left-8 text-lg">🏀</div>
          <div className="absolute top-1 right-16 text-sm">⭐</div>
        </div>

        {/* Shine effect when closed */}
        {!isOpened && (
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
        )}
      </div>

      {/* Opening instruction */}
      {!isOpened && (
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <Button
            onClick={onOpen}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full shadow-lg animate-pulse"
          >
            点击打开 ✨
          </Button>
        </div>
      )}

      {/* Opened state content preview */}
      {isOpened && (
        <div className="absolute top-12 left-0 w-80 min-h-32 bg-amber-100 border-4 border-slate-700 rounded-b-lg animate-fade-in p-4">
          <div className="grid grid-cols-6 gap-2">
            <div className="text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>✏️</div>
            <div className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>📏</div>
            <div className="text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>✂️</div>
            <div className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>🖍️</div>
            <div className="text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>📎</div>
            <div className="text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>🌈</div>
          </div>
          <p className="text-xs text-amber-700 mt-2 text-center">
            向下滚动探索更多...
          </p>
        </div>
      )}
    </div>
  );
};

export default PencilCaseHero;
