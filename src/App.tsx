import React, { useState } from 'react';
import { GameSetup } from './components/GameSetup';
import { GamePlay } from './components/GamePlay';
import { RoundEnd } from './components/RoundEnd';
import { GameEnd } from './components/GameEnd';
import type { GameState } from './types';
import { Brain } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    status: 'setup',
    players: [],
    currentRound: 0,
    totalRounds: 5,
    currentPlayerIndex: 0,
    timePerTurn: 30,
    difficulty: 'medium',
    category: 'mixed',
    soundEnabled: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Brain className="w-10 h-10 text-white" />
            <h1 className="text-4xl font-bold text-white">Guess Master</h1>
          </div>
          <p className="text-white/80">The Ultimate Multiplayer Guessing Game</p>
        </div>

        {/* Game States */}
        {gameState.status === 'setup' && (
          <GameSetup
            onGameStart={(settings) => setGameState({ ...gameState, ...settings, status: 'playing' })}
          />
        )}

        {gameState.status === 'playing' && (
          <GamePlay
            gameState={gameState}
            onRoundEnd={(scores) => 
              setGameState((prev) => ({
                ...prev,
                players: scores,
                status: prev.currentRound === prev.totalRounds ? 'gameEnd' : 'roundEnd',
              }))
            }
          />
        )}

        {gameState.status === 'roundEnd' && (
          <RoundEnd
            players={gameState.players}
            currentRound={gameState.currentRound}
            onNextRound={() =>
              setGameState((prev) => ({
                ...prev,
                status: 'playing',
                currentRound: prev.currentRound + 1,
              }))
            }
          />
        )}

        {gameState.status === 'gameEnd' && (
          <GameEnd
            players={gameState.players}
            onNewGame={() =>
              setGameState({
                status: 'setup',
                players: [],
                currentRound: 0,
                totalRounds: 5,
                currentPlayerIndex: 0,
                timePerTurn: 30,
                difficulty: 'medium',
                category: 'mixed',
                soundEnabled: true,
              })
            }
          />
        )}
      </div>
    </div>
  );
}