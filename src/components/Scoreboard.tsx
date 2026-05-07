import React from 'react';
import { SnookerState, calculatePointsRemaining } from '../utils/snookerLogic';
import './Scoreboard.css';

interface ScoreboardProps {
  state: SnookerState;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ state }) => {
  const pointsRemaining = calculatePointsRemaining(state);

  return (
    <div className="scoreboard">
      <div className="match-info">
        <div className="frames-target">Best of {state.framesToWin * 2 - 1} (First to {state.framesToWin})</div>
      </div>
      
      <div className="players-container">
        {state.players.map((player, index) => (
          <div key={index} className={`player-card ${state.currentTurn === index ? 'active' : ''}`}>
            <div className="player-name">{player.name}</div>
            <div className="player-score">{player.score}</div>
            <div className="player-frames">Frames: {player.frames}</div>
            {state.currentTurn === index && <div className="current-break">Break: {state.currentBreak}</div>}
          </div>
        ))}
      </div>

      <div className="table-info">
        <div className="stat">Reds: <span>{state.redsRemaining}</span></div>
        <div className="stat">Remaining: <span>{pointsRemaining}</span></div>
      </div>
    </div>
  );
};
