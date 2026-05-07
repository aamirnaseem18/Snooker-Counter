import React from 'react';
import { SnookerState, BallColor, getValidBalls, BallValues } from '../utils/snookerLogic';
import './Controls.css';

interface ControlsProps {
  state: SnookerState;
  onPotBall: (color: BallColor) => void;
  onFoul: (penalty: number) => void;
  onMiss: () => void;
  onUndo: () => void;
  onEndFrame: (winner: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({ state, onPotBall, onFoul, onMiss, onUndo, onEndFrame }) => {
  const validBalls = getValidBalls(state);

  return (
    <div className="controls">
      <div className="balls-grid">
        {(Object.keys(BallValues) as BallColor[]).map((color) => {
          const isValid = validBalls.includes(color);
          return (
            <button
              key={color}
              className={`ball-btn ball-${color} ${!isValid ? 'disabled' : ''}`}
              onClick={() => isValid && onPotBall(color)}
              disabled={!isValid}
            >
              {BallValues[color]}
            </button>
          );
        })}
      </div>

      <div className="action-row fouls">
        <div className="label">Foul:</div>
        {[4, 5, 6, 7].map((penalty) => (
          <button key={penalty} className="action-btn foul-btn" onClick={() => onFoul(penalty)}>
            {penalty}
          </button>
        ))}
      </div>

      <div className="action-row actions">
        <button className="action-btn miss-btn" onClick={onMiss}>Miss / End Break</button>
        <button className="action-btn undo-btn" onClick={onUndo} disabled={!state.history || state.history.length === 0}>
          Undo
        </button>
      </div>

      <div className="action-row frame-actions">
        {state.players.map((player, index) => (
          <button key={index} className="action-btn frame-btn" onClick={() => onEndFrame(index)}>
            {player.name} Wins Frame
          </button>
        ))}
      </div>
    </div>
  );
};
