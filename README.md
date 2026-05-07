# Snooker Scorer 🎱

A comprehensive, professional-grade snooker scoring application built with modern web technologies. Track matches, frames, and scores in real-time with support for 2-8 players.

## 🌟 Features

- **Multi-Player Support**: Play matches with 2 to 8 players (not just 1v1)
- **Real-Time Scoring**: Track scores, breaks, and frames as they happen
- **Professional UI**: Beautiful glassmorphism design with responsive layout
- **Turn Management**: Automatic turn rotation between players
- **Foul Tracking**: Record fouls with customizable penalties (4-7 points)
- **Frame Management**: Track frames won by each player
- **Undo Functionality**: Revert last action with complete history tracking
- **Match Statistics**: Display remaining reds, points remaining, and current break
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🎯 Snooker Game Rules Implemented

- **Red Balls Phase**: Players pot red balls (1 point each) followed by colored balls
- **Color After Red**: After each red, a colored ball must be potted
- **Final Colors**: When all reds are cleared, remaining colored balls must be potted in sequence
- **Foul Penalties**: Opponent receives penalty points when a foul occurs
- **Break Tracking**: Current player's continuous score during their turn
- **Frame Victory**: First player to reach required frames wins the match

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/aamirnaseem18/Snooker-Counter.git
cd Snooker-Counter

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📖 How to Use

1. **Start a Match**
   - Open the application
   - Enter player names (2-8 players)
   - Select frames to win (1, 2, 3, 4, 5, 10, or 18)
   - Click "Start Match"

2. **During Play**
   - Click ball colors to record potted balls
   - Track the current player's break
   - Record fouls with appropriate penalties
   - Use "Miss" to end the current break
   - Use "Undo" to revert the last action

3. **End Frame**
   - Select which player won the frame
   - Frame counter updates automatically
   - Scores reset for the next frame

4. **Match Complete**
   - App determines the winner when a player reaches the required frames
   - View final scores and match results
   - Start a new match anytime

## 🏗️ Project Structure

```
Snooker-Counter/
├── src/
│   ├── components/
│   │   ├── Controls.tsx          # Game action buttons
│   │   ├── Controls.css          # Controls styling
│   │   ├── Scoreboard.tsx        # Player scores display
│   │   ├── Scoreboard.css        # Scoreboard styling
│   │   ├── MatchSetup.tsx        # Match initialization
│   │   └── MatchSetup.css        # Setup form styling
│   ├── utils/
│   │   └── snookerLogic.ts       # Game state and rules engine
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # React entry point
│   ├── index.css                 # Global styles
│   └── vite-env.d.ts             # Vite environment types
├── index.html                    # HTML template
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite build configuration
└── README.md                     # This file
```

## 💻 Technology Stack

- **Frontend Framework**: React 18.2
- **Language**: TypeScript 5.2
- **Build Tool**: Vite 5.2
- **Styling**: CSS3 with glassmorphism effects
- **Package Manager**: npm

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter (ESLint)
npm run lint
```

### Development Server
The dev server runs on `http://localhost:5173` with hot module replacement enabled.

### Production Build
The build output is optimized and placed in the `dist/` directory, ready for deployment.

## 🎮 Game Logic

### Scoring System
- **Red Balls**: 1 point each
- **Yellow**: 2 points
- **Green**: 3 points
- **Brown**: 4 points
- **Blue**: 5 points
- **Pink**: 6 points
- **Black**: 7 points

### State Management
Game state is managed through a centralized state object tracking:
- Player information (names, scores, frames)
- Current turn
- Game phase (setup, playing, finished)
- Table state (reds remaining, phase)
- Complete action history (for undo functionality)

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Deployment

### Static Hosting (Vercel, Netlify, GitHub Pages)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting provider

3. Update repository secrets for CI/CD if using GitHub Actions

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📝 Game Features in Detail

### Multi-Player Support
- Support for 2 to 8 players in a single match
- Players take turns in rotation
- Each player has their own score and frame counter
- Turn indicator shows active player

### Frame System
- Customizable frames to win (1, 2, 3, 4, 5, 10, 18)
- "Best of" format calculation
- Automatic winner detection when target frames reached
- Frame reset between rounds

### Action History
- Keep up to 50 recent actions in memory
- One-click undo to revert last action
- Instant state restoration

## 🐛 Known Limitations

- Currently designed for local/same-device play (not networked multiplayer)
- Mobile touch optimization could be enhanced
- No persistent storage of match history

## 🔮 Future Enhancements

- [ ] Persistent match history with statistics
- [ ] Online multiplayer with real-time sync
- [ ] Tournament mode with bracket management
- [ ] Replay functionality to review frames
- [ ] Player statistics and rankings
- [ ] AI opponent for single-player mode
- [ ] Dark/Light theme toggle
- [ ] Export match results as PDF

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Aamir Naseem**
- GitHub: [@aamirnaseem18](https://github.com/aamirnaseem18)
- Repository: [Snooker-Counter](https://github.com/aamirnaseem18/Snooker-Counter)

## 🙋 Support

If you have any questions or encounter issues, please open an issue on the GitHub repository.

---

Made with ❤️ for snooker enthusiasts
