import React from 'react';
import { Trophy, ArrowRight } from 'lucide-react';
import type { Player } from '../types';

interface RoundEndProps {
  players: Player[];
  currentRound: number;
  onNextRound: () => void;
}

export function RoundEnd({ players, currentRound, onNextRound }: RoundEndProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Round {currentRound} Complete!</h2>
        <p className="text-gray-500">Current Standings</p>
      </div>

      <div className="space-y-4">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className={`flex items-center justify-between p-4 rounded-lg ${
              index === 0 ? 'bg-yellow-50' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
              <span className="font-medium text-gray-800">{player.name}</span>
            </div>
            <span className="text-xl font-semibold text-gray-700">{player.score}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onNextRound}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
      >
        Next Round
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}