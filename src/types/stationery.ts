
export interface StationeryItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  nostalgia: string;
  aiFeature: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'legendary';
  category: 'writing' | 'decoration' | 'tool' | 'memory';
}

export interface HiddenItem {
  id: string;
  name: string;
  description: string;
  type: 'note' | 'photo' | 'card' | 'secret';
  emoji: string;
  aiAction: string;
}
