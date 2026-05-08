import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  players: {
    type: [String],
    required: true
  },
  framesToWin: {
    type: Number,
    required: true
  },
  winner: {
    type: String
  },
  matchData: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);
export default Match;
