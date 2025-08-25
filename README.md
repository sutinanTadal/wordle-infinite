# Wordle Infinite

A web-based Wordle clone that you can play infinitely with different words each game.

## Features

- 🎮 Infinite gameplay with random 5-letter words
- ⌨️ On-screen keyboard and physical keyboard support
- 🎨 Dark theme with smooth animations
- 📱 Mobile-responsive design
- 🔄 New game functionality

## How to Play

1. Guess the 5-letter word in 6 tries
2. Type letters using your keyboard or click the on-screen keyboard
3. Press Enter to submit your guess
4. Color feedback:
   - 🟩 Green: Letter is correct and in the right position
   - 🟨 Yellow: Letter is in the word but in the wrong position
   - ⬛ Gray: Letter is not in the word
5. Click "New Game" to play again with a different word

## Local Development

Simply open `index.html` in any modern web browser. No build process required!

## Hosting Options

### Option 1: GitHub Pages (Free)
1. Create a new repository on GitHub
2. Upload these files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your game will be available at `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder onto Netlify
3. Get instant deployment with a custom URL

### Option 3: Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repository or upload files
3. Automatic deployment with custom domain options

### Option 4: Surge.sh (Free)
1. Install surge: `npm install -g surge`
2. Run `surge` in your project directory
3. Follow prompts for instant deployment

## Files Structure

```
wordle_infinite/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # Game logic and interactions
└── README.md       # This file
```

## Customization

- **Add more words**: Edit the `words` array in `script.js`
- **Change colors**: Modify CSS color variables in `styles.css`
- **Adjust difficulty**: Change grid size or number of attempts in `script.js`

Enjoy playing Wordle Infinite! 🎉