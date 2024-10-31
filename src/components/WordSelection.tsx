import React, { useState } from 'react';
import { KeyRound } from 'lucide-react';
import type { Player } from '../types';

interface Props {
  player: Player;
  maxWordLength: number;
  onWordSubmit: (word: string) => void;
}

export default function WordSelection({ player, maxWordLength, onWordSubmit }: Props) {
  const [word, setWord] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const cleanWord = word.trim().toLowerCase();
    if (cleanWord.length !== maxWordLength) {
      setError(`Word must be exactly ${maxWordLength} letters long`);
      return;
    }
    if (!/^[a-z]+$/.test(cleanWord)) {
      setError('Word must contain only letters');
      return;
    }
    onWordSubmit(cleanWord);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
        <div className="flex items-center gap-2 text-indigo-600">
          <KeyRound className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Choose Your Secret Word</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter a {maxWordLength}-letter word:
            </label>
            <input
              type="text"
              value={word}
              onChange={(e) => {
                setWord(e.target.value);
                setError('');
              }}
              maxLength={maxWordLength}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder={`${maxWordLength} letters only`}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Submit Word
          </button>
        </div>

        <div className="text-sm text-gray-500">
          <p>Rules:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Word must be exactly {maxWordLength} letters long</li>
            <li>Use only letters (A-Z)</li>
            <li>Your word will be hidden from other players</li>
          </ul>
        </div>
      </div>
    </div>
  );
}