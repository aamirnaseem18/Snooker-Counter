import { useState, useEffect } from 'react';
import { MatchSetup } from './components/MatchSetup';
import { Scoreboard } from './components/Scoreboard';
import { Controls } from './components/Controls';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { initialState, SnookerState, potBall, foul, miss, undo, endFrame, BallColor } from './utils/snookerLogic';
import { authService, User } from './services/authService';

function App() {
  const [state, setState] = useState<SnookerState>(initialState);
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogin = async (userId: string, password: string) => {
    setIsLoading(true);
    setAuthError('');
    try {
      const response = await authService.login(userId, password);
      if (response.user) {
        setUser(response.user);
        setAuthMode('login');
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData: {
    userId: string;
    password: string;
    email: string;
    fullName: string;
  }) => {
    setIsLoading(true);
    setAuthError('');
    try {
      const response = await authService.register(userData);
      if (response.user) {
        setUser(response.user);
        setAuthMode('login');
      }
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      authService.logout();
      setUser(null);
      setState(initialState);
      setAuthMode('login');
    }
  };

  // If not authenticated, show login/register
  if (!user) {
    return (
      <>
        {authMode === 'login' ? (
          <Login 
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthMode('register')}
            isLoading={isLoading}
            error={authError}
          />
        ) : (
          <Register 
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthMode('login')}
            isLoading={isLoading}
            error={authError}
          />
        )}
      </>
    );
  }

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
      <div className="app-header">
        <div className="header-content">
          <h1>Snooker Scoreboard</h1>
          <div className="header-right">
            <span className="user-info">Welcome, {user.fullName}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="app-content">
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
    </div>
  );
}

export default App;
