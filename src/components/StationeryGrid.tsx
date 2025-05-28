import React from 'react';
import { Card } from "@/components/ui/card";
import { StationeryItem } from "@/types/stationery";

interface StationeryGridProps {
  onItemClick: (item: StationeryItem) => void;
}

const stationeryItems: StationeryItem[] = [
  {
    id: 'hero-pen',
    name: '英雄钢笔',
    nameEn: 'Hero Fountain Pen',
    description: '每周一要灌墨水，总漏墨；但写字巨帅',
    nostalgia: '练字本上一笔一划的认真，害怕写错字的小心翼翼',
    aiFeature: 'AI生成略旧的钢笔，带些墨渍',
    emoji: '🖋️',
    rarity: 'legendary',
    category: 'writing'
  },
  {
    id: 'mechanical-pencil',
    name: '自动铅笔',
    nameEn: 'Mechanical Pencil',
    description: '0.5和0.7的终极之争，你是哪一派？',
    nostalgia: '数学课上不停转笔，铅芯断了心疼半天',
    aiFeature: 'AI重现铅笔转动的经典动作',
    emoji: '✏️',
    rarity: 'common',
    category: 'writing'
  },
  {
    id: 'scented-eraser',
    name: '香味橡皮',
    nameEn: 'Scented Eraser',
    description: '西瓜味是我的最爱，吃过的人举手✋',
    nostalgia: '偷偷闻一下，然后藏在文具盒最里面',
    aiFeature: 'AI生成五颜六色带卡通封皮的橡皮',
    emoji: '🧼',
    rarity: 'rare',
    category: 'tool'
  },
  {
    id: 'triangle-ruler',
    name: '三角尺',
    nameEn: 'Triangle Ruler',
    description: '看似正经，其实是发射纸弹神器',
    nostalgia: '几何课的好帮手，也是传纸条的掩护',
    aiFeature: 'AI教你画完美几何图形',
    emoji: '📐',
    rarity: 'common',
    category: 'tool'
  },
  {
    id: 'correction-fluid',
    name: '改正液',
    nameEn: 'Correction Fluid',
    description: '涂厚一层再撕掉，留下"化石"印记',
    nostalgia: '写错字的救星，但老师总是能看出来',
    aiFeature: 'AI帮你修正人生错误',
    emoji: '🧴',
    rarity: 'rare',
    category: 'tool'
  },
  {
    id: 'small-knife',
    name: '小刀',
    nameEn: 'Small Knife',
    description: '偷偷改卷笔刀的刀片，更锋利',
    nostalgia: '削铅笔时的专注，木屑的清香',
    aiFeature: 'AI记录你的专注时光（请勿模仿）',
    emoji: '🔪',
    rarity: 'rare',
    category: 'tool'
  },
  {
    id: 'princess-stickers',
    name: '还珠格格贴纸',
    nameEn: 'Princess Stickers',
    description: '那些不停重播还珠格格的暑假，是最美好的夏天',
    nostalgia: '和同桌交换贴纸，贴在书本上炫耀',
    aiFeature: 'AI生成还珠名场面台词',
    emoji: '🪄',
    rarity: 'legendary',
    category: 'decoration'
  }
];

const StationeryGrid: React.FC<StationeryGridProps> = ({ onItemClick }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-400 to-blue-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-400 shadow-yellow-200';
      case 'rare': return 'border-purple-400 shadow-purple-200';
      default: return 'border-gray-400 shadow-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {stationeryItems.map((item, index) => (
        <Card
          key={item.id}
          className={`relative overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 ${getRarityBorder(item.rarity)} bg-white/80 backdrop-blur-sm`}
          onClick={() => onItemClick(item)}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Rarity gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(item.rarity)} opacity-10`} />
          
          <div className="p-6 text-center relative z-10">
            {/* Emoji */}
            <div className="text-4xl mb-3 animate-bounce" style={{ animationDelay: `${index * 0.2}s` }}>
              {item.emoji}
            </div>
            
            {/* Name */}
            <h3 className="font-bold text-lg text-gray-800 mb-1">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {item.nameEn}
            </p>
            
            {/* Description */}
            <p className="text-xs text-gray-700 leading-relaxed">
              {item.description}
            </p>
            
            {/* Rarity indicator */}
            <div className="absolute top-2 right-2">
              {item.rarity === 'legendary' && '✨'}
              {item.rarity === 'rare' && '⭐'}
              {item.rarity === 'common' && '💫'}
            </div>
          </div>
          
          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </Card>
      ))}
    </div>
  );
};

export default StationeryGrid;
