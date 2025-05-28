import React, { useState, useEffect, useRef } from 'react';
import { PencilCaseItem } from '@/types';
import PencilCaseInteractive from '@/components/PencilCaseInteractive';
import ItemContentDisplay from '@/components/ItemContentDisplay';
import CoordinateHelper from '@/components/CoordinateHelper';
import PolygonCoordinateHelper from '@/components/PolygonCoordinateHelper';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMovedToLeft, setIsMovedToLeft] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PencilCaseItem | null>(null);
  const [showCoordinateHelper, setShowCoordinateHelper] = useState(false);
  const [showPolygonHelper, setShowPolygonHelper] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 彩蛋相关状态
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [easterEggCard, setEasterEggCard] = useState<string>('');
  const [upperAreaTriggered, setUpperAreaTriggered] = useState(false);
  const [lowerAreaTriggered, setLowerAreaTriggered] = useState(false);

  // 水浒卡数据
  const waterMarginCards = [
    { id: '1-宋江', name: '宋江', title: '及时雨' },
    { id: '2-卢俊义', name: '卢俊义', title: '玉麒麟' },
    { id: '3-吴用', name: '吴用', title: '智多星' },
    { id: '4-公孙胜', name: '公孙胜', title: '入云龙' },
    { id: '5-关胜', name: '关胜', title: '大刀' },
    { id: '6-林冲', name: '林冲', title: '豹子头' },
    { id: '7-秦明', name: '秦明', title: '霹雳火' },
    { id: '8-呼延灼', name: '呼延灼', title: '双鞭' },
    { id: '9-武松', name: '武松', title: '行者' },
    { id: '10-张清', name: '张清', title: '没羽箭' }
  ];

  useEffect(() => {
    setIsLoaded(true);

    // 初始化背景音乐
    const initAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.currentTime = 2; // 从第二秒开始播放
          audioRef.current.loop = true; // 循环播放
          audioRef.current.volume = 0.3; // 设置默认音量为30%
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('自动播放被阻止，需要用户交互后播放');
        }
      }
    };

    // 延迟一点时间再播放音乐，确保页面加载完成
    const timer = setTimeout(initAudio, 1000);

    // 添加键盘事件监听器
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'd') {
        event.preventDefault();
        setShowCoordinateHelper(true);
        setShowPolygonHelper(false);
      }
      if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        setShowPolygonHelper(true);
        setShowCoordinateHelper(false);
      }
      if (event.key === 'Escape') {
        setShowCoordinateHelper(false);
        setShowPolygonHelper(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  // 音乐播放控制
  const toggleMusic = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          if (audioRef.current.currentTime === 0) {
            audioRef.current.currentTime = 2; // 确保从第二秒开始
          }
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('音乐播放控制失败:', error);
      }
    }
  };

  const handleOpenPencilCase = () => {
    if (isAnimating || isOpened) return;
    
    setIsAnimating(true);
    
    // 动画完成后切换到打开状态
    setTimeout(() => {
      setIsOpened(true);
      setIsAnimating(false);
      
      // 打开后停留1秒，然后移动到左侧
      setTimeout(() => {
        setIsMovedToLeft(true);
        
        // 平移动画完成后显示关闭按钮
        setTimeout(() => {
          setShowCloseButton(true);
        }, 1000); // 等待平移动画完成
      }, 1000);
    }, 1000);
  };

  const handleClosePencilCase = () => {
    // 重置所有状态回到初始页面
    setSelectedItem(null);
    setShowCloseButton(false);
    setIsMovedToLeft(false);
    setIsOpened(false);
    setIsAnimating(false);
  };

  const handleItemSelect = (item: PencilCaseItem | null) => {
    setSelectedItem(item);
  };

  // 触发彩蛋 - 点击空白区域
  const handleEmptyAreaClick = (clickY: number) => {
    // 判断点击的是上半部分还是下半部分
    const isUpperArea = clickY <= 50;
    
    if (isUpperArea && !upperAreaTriggered) {
      // 点击上半部分且未触发过
      setUpperAreaTriggered(true);
      triggerEasterEgg();
    } else if (!isUpperArea && !lowerAreaTriggered) {
      // 点击下半部分且未触发过
      setLowerAreaTriggered(true);
      triggerEasterEgg();
    }
    // 如果对应区域已经触发过，则不执行任何操作
  };

  // 触发彩蛋
  const triggerEasterEgg = () => {
    // 随机选择一张水浒卡
    const randomCard = waterMarginCards[Math.floor(Math.random() * waterMarginCards.length)];
    setEasterEggCard(randomCard.id);
    setShowEasterEgg(true);
    
    console.log('🎉 彩蛋触发！获得水浒卡：', randomCard.name);
  };

  // 关闭彩蛋
  const closeEasterEgg = () => {
    setShowEasterEgg(false);
    setEasterEggCard('');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 overflow-hidden">
      {/* 背景音乐 */}
      <audio
        ref={audioRef}
        src="/music/bgm.mp3"
        preload="auto"
      />

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

      {/* 开发者提示 - 已隐藏 */}
      {false && !showCoordinateHelper && !showPolygonHelper && (
        <div className="fixed bottom-4 left-4 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded space-y-1">
          <div>按 Ctrl+D 开启矩形坐标标定工具</div>
          <div>按 Ctrl+P 开启多边形标定工具</div>
          {isOpened && (
            <div className="text-orange-600 font-bold">
              🎯 彩蛋进度: 1/1 (已触发)
            </div>
          )}
        </div>
      )}

      {/* 复古喇叭音乐控制按钮 */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleMusic}
          className="relative w-12 h-12 bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 rounded-full shadow-lg hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 group"
          style={{
            boxShadow: '0 4px 15px rgba(146, 64, 14, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.2), inset 0 -1px 3px rgba(0, 0, 0, 0.2)'
          }}
        >
          {/* 喇叭/音符图标 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* 图标主体 */}
              <div className={`w-6 h-6 flex items-center justify-center transition-transform duration-1000 ${
                isPlaying ? 'animate-spin' : ''
              }`} style={{ animationDuration: '20s' }}>
                {isPlaying ? (
                  // 播放时显示音符图标
                  <svg 
                    className="w-4 h-4 text-amber-100" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                  </svg>
                ) : (
                  // 暂停时显示喇叭图标
                  <svg 
                    className="w-4 h-4 text-amber-100" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
              </div>
              
              {/* 静音线条 - 只在暂停时显示 */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-0.5 bg-red-400 transform rotate-45 rounded-full" />
                </div>
              )}
            </div>
          </div>
          
          {/* 悬停光效 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-amber-300/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>

      {/* 制作者标识 */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://x.com/BenJiang756174"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-600/70 hover:text-amber-600 text-sm font-zcool transition-colors duration-300"
        >
          made by @Ben的AI实验室
        </a>
      </div>

      {/* 关闭文具盒按钮 */}
      {showCloseButton && (
        <div className="fixed top-6 left-6 z-50">
          <button
            onClick={handleClosePencilCase}
            className="text-amber-800 font-zcool text-lg font-medium tracking-wide hover:text-amber-600 transition-colors duration-200 cursor-pointer"
          >
            关闭文具盒
          </button>
        </div>
      )}

      <div className="relative z-10 h-full">
        {/* 首页展示 */}
        <div className={`h-full transition-all duration-1000 ${isLoaded ? 'animate-fade-in' : 'opacity-0'} flex flex-col items-center justify-center p-4`}>
          
          {/* 标题区域 - 始终显示 */}
          <div className="text-center mb-8 transition-all duration-1000 ease-in-out opacity-100 translate-y-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 font-ma-shan tracking-wide">
              90后的文具盒
            </h1>
            <p className="text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed font-zcool">
              小小一方天地，藏着我们的童年记忆
            </p>
          </div>

          {/* 文具盒区域 - 使用 transform 实现平移 */}
          <div className={`transition-all duration-1000 ease-in-out transform ${
            isMovedToLeft 
              ? '-translate-x-1/3' 
              : 'translate-x-0'
          }`}>
            {/* 文具盒图片容器 */}
            <div 
              className={`relative cursor-pointer transform-gpu transition-all duration-1000 ${
                !isOpened && !isAnimating ? 'hover:scale-105 hover:-translate-y-2' : ''
              } ${
                isAnimating ? 'animate-pulse scale-110 rotate-1' : ''
              }`}
              onClick={!isOpened ? handleOpenPencilCase : undefined}
            >
              {/* 阴影 */}
              <div 
                className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
                  isOpened ? 'w-[900px] h-32 opacity-40' : 'w-[700px] h-24 opacity-50'
                }`}
                style={{
                  background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
                  filter: 'blur(8px)'
                }}
              />

              {/* 交互式文具盒组件 */}
              <PencilCaseInteractive
                isOpened={isOpened}
                isAnimating={isAnimating}
                onItemSelect={handleItemSelect}
                onEmptyAreaClick={handleEmptyAreaClick}
                selectedItem={selectedItem}
                upperAreaTriggered={upperAreaTriggered}
                lowerAreaTriggered={lowerAreaTriggered}
              />
            </div>
            
            {/* 提示文字 - 只在未打开且未动画时显示 */}
            {!isOpened && !isAnimating && (
              <div className="mt-6 animate-fade-in">
               
              </div>
            )}
          </div>

          {/* 浮动粒子效果 */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(isOpened ? 25 : 15)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full opacity-60 animate-pulse ${
                  isOpened ? 'bg-yellow-400' : 'bg-amber-400'
                }`}
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
      </div>

      {/* 右侧物品内容展示 */}
      <ItemContentDisplay
        selectedItem={selectedItem}
        isVisible={isMovedToLeft && showCloseButton}
        onClose={() => setSelectedItem(null)}
      />

      {/* 矩形坐标标定工具 */}
      {showCoordinateHelper && (
        <CoordinateHelper
          imageUrl="/images/pencil-case-opened.png"
          onCoordinateSelect={(x, y) => {
            console.log(`选择的坐标: x: ${x}%, y: ${y}%`);
          }}
          onClose={() => setShowCoordinateHelper(false)}
        />
      )}

      {/* 多边形标定工具 */}
      {showPolygonHelper && (
        <PolygonCoordinateHelper
          imageUrl="/images/pencil-case-opened.png"
          onPolygonComplete={(item) => {
            console.log('完成多边形标定:', item);
          }}
          onClose={() => setShowPolygonHelper(false)}
        />
      )}

      {/* 小浣熊水浒卡彩蛋 */}
      {showEasterEgg && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center">
          {/* 简化的背景效果 */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random()}s`
                }}
              />
            ))}
          </div>

          {/* 卡片容器 - 简化动画 */}
          <div className="relative animate-fade-in" style={{ animationDuration: '0.5s' }}>
            {/* 卡片主体 */}
            <div className="relative bg-gradient-to-br from-amber-100 to-yellow-200 p-6 rounded-2xl shadow-xl max-w-lg border-2 border-yellow-400">
              {/* 标题 */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-amber-800 font-zcool mb-2">
                  🔍 看看你从文具盒夹层里找到了什么！
                </h2>
                <p className="text-base text-amber-700 font-zcool">
                  小浣熊干脆面「水浒卡」珍藏版
                </p>
              </div>

              {/* 卡片图片 */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img
                    src={`/images/easteregg/${easterEggCard}.webp`}
                    alt={`水浒卡-${easterEggCard}`}
                    className="w-480 h-auto rounded-xl shadow-lg border border-yellow-400"
                    style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' }}
                  />
                </div>
              </div>

              {/* 关闭按钮 */}
              <div className="text-center">
                <button
                  onClick={closeEasterEgg}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-2 px-6 rounded-full shadow-md transform transition-all duration-200 hover:scale-105 font-zcool"
                >
                  收下卡片
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
