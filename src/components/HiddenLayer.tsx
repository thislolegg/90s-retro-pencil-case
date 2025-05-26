
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HiddenItem } from "@/types/stationery";

const hiddenItems: HiddenItem[] = [
  {
    id: 'love-note',
    name: '叠成小方块的纸条',
    description: '上课传的小纸条，字迹有些模糊',
    type: 'note',
    emoji: '💌',
    aiAction: 'AI复原模糊字迹'
  },
  {
    id: 'crush-photo',
    name: '暗恋对象的照片',
    description: '偷偷剪下来的杂志照片',
    type: 'photo',
    emoji: '📸',
    aiAction: 'AI描述她的微笑'
  },
  {
    id: 'game-card',
    name: '小浣熊水浒卡',
    description: '108将还差几张就集齐了',
    type: 'card',
    emoji: '🎴',
    aiAction: 'AI生成专属技能卡'
  },
  {
    id: 'cheat-sheet',
    name: '游戏秘籍纸条',
    description: '密密麻麻的手写游戏攻略',
    type: 'secret',
    emoji: '📜',
    aiAction: 'AI解读古老密码'
  },
  {
    id: 'playlist',
    name: '手写歌单',
    description: '那些年我们一起听的歌',
    type: 'note',
    emoji: '🎵',
    aiAction: 'AI重现青春旋律'
  }
];

const HiddenLayer: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<HiddenItem | null>(null);
  const [aiResult, setAiResult] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleItemClick = async (item: HiddenItem) => {
    setSelectedItem(item);
    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const aiResults = {
      'love-note': '经AI复原的纸条内容：\n"今天的数学课好无聊啊...你有没有在听？下课一起去小卖部吧 (๑>◡<๑)"',
      'crush-photo': 'AI分析：她的微笑有种特别的温暖，像是午后阳光透过百叶窗洒在桌案上的感觉。那时候觉得世界上最美好的事，就是能偷偷看她一眼。',
      'game-card': '恭喜获得专属AI技能卡！\n\n【记忆回溯】\n等级：SSR\n效果：能够完美还原任何童年记忆片段\n描述：时光荏苒，但初心不变',
      'cheat-sheet': 'AI解密成功！\n\n古老密码翻译：\n"上上下下左右左右BA" = 青春无敌密码\n"↑↑↓↓←→←→BA" = 永远快乐咒语',
      'playlist': '🎵 青春歌单重现 🎵\n\n1. 同桌的你 - 老狼\n2. 睡在我上铺的兄弟 - 老狼  \n3. 栀子花开 - 何炅\n4. 那些花儿 - 朴树\n5. 青春 - 韩庚\n\n每一首歌都是一段回忆...'
    };
    
    setAiResult(aiResults[item.id as keyof typeof aiResults] || '未知的记忆片段...');
    setIsProcessing(false);
  };

  return (
    <section className="min-h-screen p-8 bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-800 mb-4 font-serif">
            🔐 秘密夹层 Hidden Layer
          </h2>
          <p className="text-purple-700 text-lg">
            这里藏着最珍贵的小秘密...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hiddenItems.map((item, index) => (
            <Card
              key={item.id}
              className="relative overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl bg-white/70 backdrop-blur-sm border-2 border-purple-200"
              onClick={() => handleItemClick(item)}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="p-6 text-center">
                <div className="text-5xl mb-4 animate-pulse">
                  {item.emoji}
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {item.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-purple-600 border-purple-300 hover:bg-purple-50"
                >
                  {item.aiAction}
                </Button>
              </div>
              
              {/* Mysterious glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>

        {/* AI Processing Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <Card className="max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{selectedItem.emoji}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {selectedItem.name}
                  </h3>
                </div>

                {isProcessing ? (
                  <div className="text-center py-12">
                    <div className="animate-spin text-4xl mb-4">🔮</div>
                    <p className="text-lg text-purple-700">AI正在解析记忆中...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Card className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200">
                      <h4 className="font-semibold text-lg mb-3 text-amber-800">
                        🤖 AI解析结果
                      </h4>
                      <div className="bg-white p-4 rounded-lg shadow-inner">
                        <pre className="whitespace-pre-wrap text-gray-800 font-serif leading-relaxed">
                          {aiResult}
                        </pre>
                      </div>
                    </Card>
                    
                    <div className="text-center">
                      <Button
                        onClick={() => {
                          setSelectedItem(null);
                          setAiResult('');
                        }}
                        className="px-8 py-2"
                      >
                        收起记忆
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Interactive Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 text-center bg-gradient-to-br from-pink-100 to-rose-100 border-2 border-pink-200">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="font-bold text-lg mb-2">生成专属贴纸</h3>
            <p className="text-sm text-gray-600 mb-4">
              AI为你创造独一无二的童年贴纸
            </p>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
              开始创作
            </Button>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-200">
            <div className="text-4xl mb-4">🎂</div>
            <h3 className="font-bold text-lg mb-2">生日水浒卡</h3>
            <p className="text-sm text-gray-600 mb-4">
              根据你的生日，获得专属英雄卡
            </p>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              抽取卡牌
            </Button>
          </Card>

          <Card className="p-6 text-center bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-200">
            <div className="text-4xl mb-4">💕</div>
            <h3 className="font-bold text-lg mb-2">AI代笔情书</h3>
            <p className="text-sm text-gray-600 mb-4">
              那些没说出口的话，让AI帮你表达
            </p>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              写情书
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HiddenLayer;
