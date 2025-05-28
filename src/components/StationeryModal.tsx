import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StationeryItem } from "@/types/stationery";

interface StationeryModalProps {
  item: StationeryItem;
  onClose: () => void;
}

const StationeryModal: React.FC<StationeryModalProps> = ({ item, onClose }) => {
  const [aiContent, setAiContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-400 to-blue-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const generateAIContent = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation (in a real app, this would call an AI API)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiResponses = {
      'hero-pen': '🖋️ 英雄钢笔的回忆\n\n那支银色的英雄钢笔，笔身上还有些许墨渍的痕迹。每周一的早晨，你总是小心翼翼地拧开墨水瓶，看着蓝色的墨水慢慢流入笔囊。写字时沙沙的声音，是那个年代最动听的音符。虽然总是漏墨，但那一笔一划写出的字，确实巨帅无比。',
      'mechanical-pencil': '✏️ 自动铅笔的终极之争\n\n0.5mm还是0.7mm？这是90后学生时代永恒的话题。你是精细派的0.5，还是粗犷派的0.7？不管哪一派，那咔嚓咔嚓按压出铅的声音，和数学课上不停转笔的经典动作，都是青春记忆里最生动的片段。',
      'scented-eraser': '🧼 西瓜味橡皮的甜蜜\n\n五颜六色的香味橡皮，每一块都有卡通封皮。西瓜味是你的最爱，那种甜腻的香味总是让人忍不住想咬一口。吃过的人请举手✋！虽然知道不能吃，但那份童真的好奇心，是最珍贵的回忆。',
      'triangle-ruler': '📐 三角尺的双重身份\n\n表面上是画直线的正经工具，实际上却是课堂上发射纸弹的神器。几何课时认真测量角度，课间时偷偷用它弹射小纸团。看似正经，实则调皮，这就是三角尺的双重人生。',
      'correction-fluid': '🧴 改正液的化石印记\n\n那瓶白色的改正液，有着刺鼻的味道，却是写错字时的救星。涂厚厚一层，等干了再撕掉，总会留下"化石"般的印记。虽然老师总能看出来，但那份想要完美的心意，是最真挚的。',
      'small-knife': '🔪 小刀的锋利秘密\n\n偷偷从卷笔刀里取出刀片，装在小刀上，瞬间变得更加锋利。削铅笔时的专注神情，和那淡淡的木屑清香，是专属于那个年代的宁静时光。（温馨提示：请勿模仿，安全第一！）',
      'princess-stickers': '🪄 还珠格格的夏天\n\n那些不停重播还珠格格的暑假，是最美好的夏天。小燕子、紫薇、五阿哥的贴纸，承载着我们对古装剧的所有幻想。和同桌交换贴纸，贴在书本上炫耀，那份简单的快乐，是童年最珍贵的宝藏。',
      'default': '每一件文具都有它的故事，就像我们每个人都有属于自己的青春记忆。时光荏苒，但那份纯真永远不会褪色。'
    };
    
    setAiContent(aiResponses[item.id as keyof typeof aiResponses] || aiResponses.default);
    setIsGenerating(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            <span className="text-4xl mr-3">{item.emoji}</span>
            {item.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Item Details */}
          <Card className={`p-6 bg-gradient-to-br ${getRarityColor(item.rarity)} bg-opacity-10 border-2`}>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">物品描述</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">童年回忆</h3>
                <p className="text-gray-700 italic">{item.nostalgia}</p>
              </div>
            </div>
          </Card>

          {/* AI Feature */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
            <h3 className="font-semibold text-lg mb-3 text-blue-800">
              🤖 AI魔法功能
            </h3>
            <p className="text-blue-700 mb-4">{item.aiFeature}</p>
            
            <Button
              onClick={generateAIContent}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
            >
              {isGenerating ? '🔮 AI正在施法中...' : '✨ 激活AI记忆'}
            </Button>
          </Card>

          {/* AI Generated Content */}
          {aiContent && (
            <Card className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 animate-fade-in">
              <h3 className="font-semibold text-lg mb-3 text-amber-800">
                📝 AI生成的回忆
              </h3>
              <div className="bg-white p-4 rounded-lg shadow-inner">
                <pre className="whitespace-pre-wrap text-gray-800 font-serif leading-relaxed">
                  {aiContent}
                </pre>
              </div>
            </Card>
          )}

          {/* Close Button */}
          <div className="text-center">
            <Button
              onClick={onClose}
              variant="outline"
              className="px-8 py-2"
            >
              收起回忆
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StationeryModal;
