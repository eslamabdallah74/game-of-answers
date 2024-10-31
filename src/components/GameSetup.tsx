import React, { useState } from 'react';
import { Users, Clock, Gamepad2, Volume2 } from 'lucide-react';

interface GameSetupProps {
  onGameStart: (settings: {
    players: { id: string; name: string; score: number; powerups: number }[];
    totalRounds: number;
    timePerTurn: number;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    soundEnabled: boolean;
  }) => void;
}

export function GameSetup({ onGameStart }: GameSetupProps) {
  const [playerNames, setPlayerNames] = useState<string[]>(['', '']);
  const [settings, setSettings] = useState({
    totalRounds: 5,
    timePerTurn: 30,
    difficulty: 'medium',
    category: 'mixed',
    soundEnabled: true,
  });

  const handleAddPlayer = () => {
    setPlayerNames([...playerNames, '']);
  };

  const handleRemovePlayer = (index: number) => {
    setPlayerNames(playerNames.filter((_, i) => i !== index));
  };

  const handleStartGame = () => {
    const players = playerNames
      .filter(name => name.trim())
      .map(name => ({
        id: crypto.randomUUID(),
        name,
        score: 0,
        powerups: 3,
      }));

    if (players.length < 2) return;

    onGameStart({
      players,
      ...settings,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 space-y-8">
      {/* Players Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-600">
          <Users className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Players</h2>
        </div>

        <div className="space-y-3">
          {playerNames.map((name, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  const newNames = [...playerNames];
                  newNames[index] = e.target.value;
                  setPlayerNames(newNames);
                }}
                placeholder={`Player ${index + 1}`}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {playerNames.length > 2 && (
                <button
                  onClick={() => handleRemovePlayer(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {playerNames.length < 8 && (
          <button
            onClick={handleAddPlayer}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-indigo-500 hover:text-indigo-500 transition-colors"
          >
            Add Player
          </button>
        )}
      </div>

      {/* Game Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-600">
          <Gamepad2 className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Game Settings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rounds
            </label>
            <select
              value={settings.totalRounds}
              onChange={(e) => setSettings({ ...settings, totalRounds: Number(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {[3, 5, 7, 10].map((num) => (
                <option key={num} value={num}>
                  {num} Rounds
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time per Turn
            </label>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <select
                value={settings.timePerTurn}
                onChange={(e) => setSettings({ ...settings, timePerTurn: Number(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {[15, 30, 45, 60].map((num) => (
                  <option key={num} value={num}>
                    {num} seconds
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              value={settings.difficulty}
              onChange={(e) => setSettings({ ...settings, difficulty: e.target.value as any })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={settings.category}
              onChange={(e) => setSettings({ ...settings, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="mixed">Mixed</option>
              <option value="movies">Movies</option>
              <option value="animals">Animals</option>
              <option value="geography">Geography</option>
              <option value="history">History</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              settings.soundEnabled ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-500'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            Sound {settings.soundEnabled ? 'On' : 'Off'}
          </button>
        </div>
      </div>

      {/* Start Game Button */}
      <button
        onClick={handleStartGame}
        disabled={playerNames.filter(name => name.trim()).length < 2}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
      >
        Start Game
      </button>
    </div>
  );
}