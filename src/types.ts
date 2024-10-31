export interface Player {
  id: string;
  name: string;
  score: number;
  powerups: number;
}

export interface GameState {
  status: 'setup' | 'playing' | 'roundEnd' | 'gameEnd';
  players: Player[];
  currentRound: number;
  totalRounds: number;
  currentPlayerIndex: number;
  timePerTurn: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  soundEnabled: boolean;
}

export interface Question {
  id: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  answer: string;
  hints: string[];
}