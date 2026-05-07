import React, { useState } from 'react';
import './MatchSetup.css';

interface MatchSetupProps {
  onStartMatch: (players: string[], frames: number) => void;
}

export const MatchSetup: React.FC<MatchSetupProps> = ({ onStartMatch }) => {
  const [players, setPlayers] = useState(['Player 1', 'Player 2']);
  const [frames, setFrames] = useState(3);

  const handlePlayerChange = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const addPlayer = () => {
    if (players.length < 8) {
      setPlayers([...players, `Player ${players.length + 1}`]);
    }
  };

  const removePlayer = (index: number) => {
    if (players.length > 2) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartMatch(players, frames);
  };

  return (
    <div className="match-setup">
      <h2>Snooker Match Setup</h2>
      <form onSubmit={handleSubmit}>
        {players.map((player, index) => (
          <div key={index} className="form-group">
            <label>Player {index + 1} Name</label>
            <div className="player-input-group">
              <input 
                type="text" 
                value={player} 
                onChange={(e) => handlePlayerChange(index, e.target.value)} 
                required 
              />
              {players.length > 2 && (
                <button type="button" onClick={() => removePlayer(index)} className="remove-btn">Remove</button>
              )}
            </div>
          </div>
        ))}
        
        <div className="form-group">
          <button type="button" onClick={addPlayer} disabled={players.length >= 8} className="add-btn">Add Player</button>
        </div>

        <div className="form-group">
          <label>Frames to Win (Best of {frames * 2 - 1})</label>
          <div className="frames-selector">
            {[1, 2, 3, 4, 5, 10, 18].map(f => (
              <button
                key={f}
                type="button"
                className={`frame-btn-select ${frames === f ? 'selected' : ''}`}
                onClick={() => setFrames(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="start-btn">Start Match</button>
      </form>
    </div>
  );
};
