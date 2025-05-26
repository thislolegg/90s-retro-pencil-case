
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
      'hero-pen': '亲爱的未来的自己，\n\n还记得那支银色的英雄钢笔吗？每一次提笔，都是对梦想的郑重承诺。那时的我们，相信每一个字都有魔法...\n\n愿你永远保持那份初心。\n\n——来自过去的你',
      'mechanical-pencil': '数学错题本 📚\n\n题目：小明有10支铅笔...\n❌ 答案：不知道\n✅ 正确答案：专心听课\n\n反思：上课不要转笔，铅芯很贵的！',
      'scented-eraser': '🍓 草莓味的记忆...\n\n那是夏天特有的甜腻，混合着教室里粉笔的味道。你总是舍不得用，因为用了就没有香味了。现在想来，最珍贵的不是橡皮本身，而是那份小心翼翼的珍惜。',
      'princess-stickers': '小燕子："皇阿玛，你还记得那年大明湖畔的夏雨荷吗？"\n\nAI续写：就像你还记得那些贴在课本上的贴纸，每一张都是青春的印记，每一个角色都陪伴我们度过了最纯真的岁月。',
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
