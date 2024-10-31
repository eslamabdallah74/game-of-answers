import React from 'react';
import { Trophy, Medal, ArrowRight } from 'lucide-react';
import type { Player } from '../types';

interface GameEndProps {
  players: Player[];
  onNewGame: () => void;
}

export function GameEnd({ players, onNewGame }: GameEndProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 space-y-8">
      <div className="text-center space-y-4">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
        <h2 className="text-3xl font-bold text-gray-800">Game Over!</h2>
        <div className="py-6">
          <p className="text-xl text-gray-600">Winner</p>
          <p className="text-3xl font-bold text-indigo-600">{winner.name}</p>
          <p className="text-xl font-semibold text-gray-700">{winner.score} points</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Medal className="w-5 h-5 text-indigo-600" />
          Final Standings
        </h3>

        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className={`flex items-center justify-between p-4 rounded-lg ${
              index === 0 ? 'bg-yellow-50' :
              index === 1 ? 'bg-gray-100' :
              index === 2 ? 'bg-orange-50' :
              'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-800">
                {index + 1}. {player.name}
              </span>
            </div>
            <span className="text-xl font-semibold text-gray-700">{player.score}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onNewGame}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
      >
        Play Again
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}