export type BallColor = 'red' | 'yellow' | 'green' | 'brown' | 'blue' | 'pink' | 'black';

export const BallValues: Record<BallColor, number> = {
  red: 1, yellow: 2, green: 3, brown: 4, blue: 5, pink: 6, black: 7
};

export const ColorSequence: BallColor[] = ['yellow', 'green', 'brown', 'blue', 'pink', 'black'];

export interface PlayerData {
  name: string;
  score: number;
  frames: number;
}

export type MatchPhase = 'setup' | 'playing' | 'finished';

export interface SnookerState {
  players: PlayerData[];
  framesToWin: number;
  matchPhase: MatchPhase;
  currentTurn: number; // 0-based index
  currentBreak: number;
  redsRemaining: number;
  phase: 'reds' | 'color_after_red' | 'final_colors';
  nextFinalColorIndex: number;
  history: SnookerState[];
}

export const initialState: SnookerState = {
  players: [
    { name: 'Player 1', score: 0, frames: 0 },
    { name: 'Player 2', score: 0, frames: 0 }
  ],
  framesToWin: 3,
  matchPhase: 'setup',
  currentTurn: 0,
  currentBreak: 0,
  redsRemaining: 15,
  phase: 'reds',
  nextFinalColorIndex: 0,
  history: [],
};

export function calculatePointsRemaining(state: SnookerState): number {
  if (state.phase === 'reds') {
    return state.redsRemaining * 8 + 27;
  } else if (state.phase === 'color_after_red') {
    return state.redsRemaining * 8 + 7 + 27;
  } else {
    // final colors
    let remaining = 0;
    for (let i = state.nextFinalColorIndex; i < ColorSequence.length; i++) {
      remaining += BallValues[ColorSequence[i]];
    }
    return remaining;
  }
}

export function getValidBalls(state: SnookerState): BallColor[] {
  if (state.phase === 'reds') {
    return state.redsRemaining > 0 ? ['red'] : ColorSequence;
  } else if (state.phase === 'color_after_red') {
    return ColorSequence;
  } else {
    if (state.nextFinalColorIndex < ColorSequence.length) {
      return [ColorSequence[state.nextFinalColorIndex]];
    }
    return [];
  }
}

export function potBall(state: SnookerState, color: BallColor): SnookerState {
  const newState = { ...state, history: [state, ...state.history].slice(0, 50) };
  const points = BallValues[color];

  newState.players[newState.currentTurn].score += points;
  newState.currentBreak += points;

  if (newState.phase === 'reds') {
    if (color === 'red') {
      newState.redsRemaining--;
      newState.phase = 'color_after_red';
    }
  } else if (newState.phase === 'color_after_red') {
    if (newState.redsRemaining > 0) {
      newState.phase = 'reds';
    } else {
      newState.phase = 'final_colors';
      newState.nextFinalColorIndex = 0;
    }
  } else if (newState.phase === 'final_colors') {
    if (color === ColorSequence[newState.nextFinalColorIndex]) {
      newState.nextFinalColorIndex++;
    }
  }

  return newState;
}

export function foul(state: SnookerState, penalty: number): SnookerState {
  const newState = { ...state, history: [state, ...state.history].slice(0, 50) };
  const nextPlayer = (newState.currentTurn + 1) % newState.players.length;
  newState.players[nextPlayer].score += penalty;
  
  newState.currentBreak = 0;
  newState.currentTurn = nextPlayer;
  
  if (newState.phase === 'color_after_red') {
    if (newState.redsRemaining > 0) {
      newState.phase = 'reds';
    } else {
      newState.phase = 'final_colors';
      newState.nextFinalColorIndex = 0;
    }
  }
  
  return newState;
}

export function miss(state: SnookerState): SnookerState {
  const newState = { ...state, history: [state, ...state.history].slice(0, 50) };
  newState.currentBreak = 0;
  newState.currentTurn = (newState.currentTurn + 1) % newState.players.length;
  
  if (newState.phase === 'color_after_red') {
    if (newState.redsRemaining > 0) {
      newState.phase = 'reds';
    } else {
      newState.phase = 'final_colors';
      newState.nextFinalColorIndex = 0;
    }
  }
  
  return newState;
}

export function undo(state: SnookerState): SnookerState {
  if (state.history.length === 0) return state;
  return state.history[0];
}

export function endFrame(state: SnookerState, winner: number): SnookerState {
  const newState = { ...state, history: [state, ...state.history].slice(0, 50) };
  newState.players[winner].frames++;

  const maxFrames = Math.max(...newState.players.map(p => p.frames));
  if (maxFrames >= newState.framesToWin) {
    newState.matchPhase = 'finished';
  } else {
    // Reset frame state
    newState.players.forEach(p => p.score = 0);
    newState.currentBreak = 0;
    newState.redsRemaining = 15;
    newState.phase = 'reds';
    newState.nextFinalColorIndex = 0;
    // Alternate break starting from player 0
    const totalFrames = newState.players.reduce((sum, p) => sum + p.frames, 0);
    newState.currentTurn = totalFrames % newState.players.length;
  }
  return newState;
}
