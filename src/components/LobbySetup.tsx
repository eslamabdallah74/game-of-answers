import React, { useState } from 'react';
import { Users, Settings, Play } from 'lucide-react';
import type { Player } from '../types';

interface Props {
  players: Player[];
  maxWordLength: number;
  onJoinGame: (name: string) => void;
  onStartGame: () => void;
  onSetMaxLength: (length: number) => void;
  isAdmin: boolean;
}

export default function LobbySetup({
  players,
  maxWordLength,
  onJoinGame,
  onStartGame,
  onSetMaxLength,
}: Props) {
  const [playerName, setPlayerName] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">Word Quest</h1>
        <p className="text-gray-600">Join the ultimate word guessing challenge!</p>
      </div>

      {players.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 mb-4">
            <Users className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Join Game</h2>
          </div>
          
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          
          <button
            onClick={() => {
              if (playerName.trim()) {
                onJoinGame(playerName);
                setPlayerName('');
              }
            }}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create Game
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-600">
              <Users className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Players ({players.length})</h2>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-500 hover:text-indigo-600 transition-colors"
              title="Game Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {showSettings && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <h3 className="font-medium text-gray-700">Game Settings</h3>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Word Length:</label>
                <select
                  value={maxWordLength}
                  onChange={(e) => onSetMaxLength(Number(e.target.value))}
                  className="px-2 py-1 rounded border border-gray-300"
                >
                  {[4, 5, 6, 7, 8].map((length) => (
                    <option key={length} value={length}>
                      {length} letters
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium text-gray-700">{player.name}</span>
              </div>
            ))}
          </div>

          {players.length < 10 && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={() => {
                  if (playerName.trim()) {
                    onJoinGame(playerName);
                    setPlayerName('');
                  }
                }}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Join Game
              </button>
            </div>
          )}

          {players.length >= 2 && (
            <div className="space-y-4">
              <button
                onClick={onStartGame}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Start Game
              </button>
              <p className="text-sm text-gray-500 text-center">
                {players.length < 10 ? "More players can still join!" : "Maximum players reached"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}