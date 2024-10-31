import React, { useState, useEffect } from 'react';
import { Timer, Lightbulb, Trophy } from 'lucide-react';
import type { GameState, Player } from '../types';

interface GamePlayProps {
  gameState: GameState;
  onRoundEnd: (players: Player[]) => void;
}

const QUESTIONS = {
  mixed: [
    {
      id: '1',
      question: 'This celestial body is known as the Red Planet',
      answer: 'mars',
      hints: ['Fourth planet from the Sun', 'Named after the Roman god of war'],
    },
    {
      id: '2',
      question: 'This programming language was created by Brendan Eich in 1995',
      answer: 'javascript',
      hints: ['Originally called Mocha', 'Most popular language for web development'],
    },
    // Add more questions as needed
  ],
};

export function GamePlay({ gameState, onRoundEnd }: GamePlayProps) {
  const [timeLeft, setTimeLeft] = useState(gameState.timePerTurn);
  const [guess, setGuess] = useState('');
  const [usedHint, setUsedHint] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const currentQuestion = QUESTIONS[gameState.category as keyof typeof QUESTIONS][gameState.currentRound];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNextTurn();
    }
  }, [timeLeft]);

  const handleNextTurn = () => {
    const updatedPlayers = [...gameState.players];
    const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;

    if (nextPlayerIndex === 0) {
      onRoundEnd(updatedPlayers);
    } else {
      // Continue to next player
      setTimeLeft(gameState.timePerTurn);
      setGuess('');
      setUsedHint(false);
      setShowHint(false);
    }
  };

  const handleGuess = () => {
    if (guess.toLowerCase() === currentQuestion.answer) {
      const updatedPlayers = [...gameState.players];
      updatedPlayers[gameState.currentPlayerIndex].score += usedHint ? 5 : 10;
      onRoundEnd(updatedPlayers);
    } else {
      setGuess('');
    }
  };

  const handleUseHint = () => {
    if (currentPlayer.powerups > 0 && !usedHint) {
      setUsedHint(true);
      setShowHint(true);
      const updatedPlayers = [...gameState.players];
      updatedPlayers[gameState.currentPlayerIndex].powerups -= 1;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Round {gameState.currentRound + 1}</h2>
          <p className="text-gray-500">Player: {currentPlayer.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-gray-400" />
            <span className="text-xl font-semibold text-gray-700">{timeLeft}s</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-xl font-semibold text-gray-700">{currentPlayer.score}</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="text-center py-8">
        <h3 className="text-2xl font-medium text-gray-800 mb-4">{currentQuestion.question}</h3>
        {showHint && (
          <p className="text-indigo-600 text-sm mb-4">{currentQuestion.hints[0]}</p>
        )}
      </div>

      {/* Input */}
      <div className="space-y-4">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Type your answer..."
          className="w-full px-4 py-3 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />

        <div className="flex gap-3">
          <button
            onClick={handleGuess}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Submit Answer
          </button>
          
          <button
            onClick={handleUseHint}
            disabled={usedHint || currentPlayer.powerups === 0}
            className="px-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lightbulb className={`w-5 h-5 ${usedHint ? 'text-gray-400' : 'text-yellow-500'}`} />
          </button>
        </div>
      </div>

      {/* Players */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {gameState.players.map((player) => (
          <div
            key={player.id}
            className={`p-3 rounded-lg ${
              player.id === currentPlayer.id
                ? 'bg-indigo-50 ring-2 ring-indigo-500'
                : 'bg-gray-50'
            }`}
          >
            <div className="text-sm font-medium text-gray-600">{player.name}</div>
            <div className="text-lg font-semibold text-gray-800">{player.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}