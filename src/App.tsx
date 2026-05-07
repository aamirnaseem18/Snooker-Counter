import { useState } from 'react';
import { MatchSetup } from './components/MatchSetup';
import { Scoreboard } from './components/Scoreboard';
import { Controls } from './components/Controls';
import { initialState, SnookerState, potBall, foul, miss, undo, endFrame, BallColor } from './utils/snookerLogic';

function App() {
  const [state, setState] = useState<SnookerState>(initialState);

  const handleStartMatch = (players: string[], frames: number) => {
    setState({
      ...initialState,
      players: players.map(name => ({ name, score: 0, frames: 0 })),
      framesToWin: frames,
      matchPhase: 'playing'
    });
  };

  const handlePotBall = (color: BallColor) => {
    setState(potBall(state, color));
  };

  const handleFoul = (penalty: number) => {
    setState(foul(state, penalty));
  };

  const handleMiss = () => {
    setState(miss(state));
  };

  const handleUndo = () => {
    setState(undo(state));
  };

  const handleEndFrame = (winner: number) => {
    setState(endFrame(state, winner));
  };

  const handleResetMatch = () => {
    if (confirm('Are you sure you want to end the match and start over?')) {
      setState(initialState);
    }
  };

  return (
    <div className="app-container">
      {state.matchPhase === 'setup' && (
        <MatchSetup onStartMatch={handleStartMatch} />
      )}

      {state.matchPhase === 'playing' && (
        <div className="match-playing">
          <Scoreboard state={state} />
          <Controls 
            state={state} 
            onPotBall={handlePotBall} 
            onFoul={handleFoul} 
            onMiss={handleMiss}
            onUndo={handleUndo}
            onEndFrame={handleEndFrame}
          />
        </div>
      )}

      {state.matchPhase === 'finished' && (
        <div className="match-finished">
          <h2>Match Finished!</h2>
          <div className="winner">
            {(() => {
              const maxFrames = Math.max(...state.players.map(p => p.frames));
              const winners = state.players.filter(p => p.frames === maxFrames);
              if (winners.length === 1) {
                return `${winners[0].name} Wins!`;
              } else {
                return `Draw between ${winners.map(p => p.name).join(' and ')}!`;
              }
            })()}
          </div>
          <div className="final-score">
            {state.players.map(p => `${p.name}: ${p.frames}`).join(' | ')}
          </div>
          <button className="start-btn" onClick={() => setState(initialState)}>Start New Match</button>
        </div>
      )}

      {state.matchPhase !== 'setup' && (
        <button className="reset-match-btn" onClick={handleResetMatch}>
          Reset Match
        </button>
      )}
    </div>
  );
}

export default App;
