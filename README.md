# 🏃 Endless Runner Game

## 🎮 About

An exciting 3D endless runner game inspired by Temple Run 2! Run through an infinite path, dodge obstacles, collect coins, and grab power-ups to survive as long as possible.

**Play it live:** [https://sarthakwebsite26012000-dot.github.io/endless-runner-game/](https://sarthakwebsite26012000-dot.github.io/endless-runner-game/)

## ✨ Features

### Core Gameplay
- **Endless Running**: Infinite procedurally generated path
- **3-Lane System**: Move between left, middle, and right lanes
- **Dynamic Obstacles**: Boxes, barriers, and spikes to avoid
- **Coin Collection**: Collect golden coins for points
- **Increasing Difficulty**: Game speed increases over time

### Power-Ups
- 🛡️ **Shield**: Protects you from one collision
- 🧲 **Magnet**: Instantly collect 5 coins
- ⚡ **Boost**: Temporary speed increase

### Game Mechanics
- **Jump**: Leap over low obstacles
- **Slide**: Duck under high barriers
- **Lane Switching**: Dodge left and right
- **Score System**: Points for distance traveled and coins collected

## 🎯 Controls

| Action | Key |
|--------|-----|
| **Jump** | `W` or `↑ Arrow` |
| **Slide** | `S` or `↓ Arrow` |
| **Move Left** | `A` or `← Arrow` |
| **Move Right** | `D` or `→ Arrow` |

## 🚀 How to Play

1. **Start the game** by clicking the "START GAME" button
2. **Avoid obstacles** by jumping, sliding, or changing lanes
3. **Collect coins** to increase your score
4. **Grab power-ups** for special abilities
5. **Survive** as long as possible!

## 💻 Installation & Setup

### Play Online (Easiest)
Just open the live link above in any modern web browser!

### Run Locally

1. **Clone the repository**
```bash
git clone https://github.com/sarthakwebsite26012000-dot/endless-runner-game.git
cd endless-runner-game
```

2. **Open the game**
- Simply open `index.html` in your web browser
- Or use a local server:

**Using Python:**
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

**Using Node.js (http-server):**
```bash
npx http-server
```

## 📁 Project Structure

```
endless-runner-game/
│
├── index.html       # Main HTML file with UI
├── game.js          # Game logic and mechanics
└── README.md        # This file
```

## 🛠️ Technologies Used

- **HTML5 Canvas** - For rendering game graphics
- **JavaScript (ES6)** - Game logic and mechanics
- **CSS3** - UI styling and animations

## 🎨 Game Inspired By

This game draws inspiration from the popular mobile game [Temple Run 2](https://play.google.com/store/apps/details?id=com.imangi.templerun2), featuring similar endless runner mechanics with jumps, slides, and lane switching.

## 🌟 Features in Detail

### Obstacles
- **Wooden Boxes** (50x50): Low obstacles that require jumping
- **Barriers** (60x80): Tall obstacles that require sliding
- **Spikes** (40x30): Ground-level hazards

### Scoring System
- **Distance**: Earn points continuously as you run
- **Obstacles Passed**: +10 points per obstacle
- **Coins Collected**: +5 points per coin
- **Magnet Power-Up**: +25 points + 5 coins

### Visual Elements
- Dynamic scrolling path with lane markings
- Gradient sky and ground
- Shield visual effect when protected
- Smooth animations and transitions

## 🎯 Tips for High Scores

1. **Master the controls** - Practice lane switching and timing
2. **Use shields wisely** - They save you from mistakes
3. **Collect coins** - They add to your score quickly
4. **Stay alert** - Speed increases over time
5. **Don't get greedy** - Sometimes it's safer to skip a coin

## 🚀 Deployment

### Deploy to GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Source", select `main` branch
4. Click "Save"
5. Your game will be live at: `https://yourusername.github.io/endless-runner-game/`

### Deploy to Other Platforms

This game is a static website and can be deployed to:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repo
- **Cloudflare Pages**: Deploy from GitHub
- **Any web hosting**: Upload the files via FTP

## 📝 Future Enhancements

Potential features to add:
- [ ] Multiple character skins
- [ ] Different environment themes
- [ ] Leaderboard system
- [ ] Sound effects and background music
- [ ] Mobile touch controls
- [ ] Level progression system
- [ ] More power-up types
- [ ] Particle effects

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit (`git commit -am 'Add new feature'`)
5. Push (`git push origin feature/improvement`)
6. Create a Pull Request

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

**Sarthak**
- GitHub: [@sarthakwebsite26012000-dot](https://github.com/sarthakwebsite26012000-dot)

## 🙏 Acknowledgments

- Inspired by Temple Run 2 by Imangi Studios
- Built with HTML5 Canvas and vanilla JavaScript
- Thanks to the web development community for tutorials and resources

---

**Enjoy the game! 🎮 Run fast, dodge well, and collect those coins! 💰**
