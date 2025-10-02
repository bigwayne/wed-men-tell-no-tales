# Testing Your SPA Wedding Site

## The Issue with Local Testing

When opening `index.html` directly in your browser (file:// protocol), some features are limited due to browser security. The SPA will still work, but URLs won't update properly.

## Best Way to Test Locally

Use a simple local web server. Here are the easiest options:

### Option 1: Python (if you have Python installed)

Open Terminal in your project folder and run:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

### Option 2: Node.js (if you have Node installed)

```bash
# Install http-server globally (one time)
npm install -g http-server

# Run server
http-server -p 8000
```

Then open: `http://localhost:8000`

### Option 3: VS Code Extension

If you use VS Code:
1. Install "Live Server" extension
2. Right-click `index.html`
3. Click "Open with Live Server"

### Option 4: Just Push to GitHub Pages!

The easiest way is to just push to GitHub Pages - everything works perfectly there without any setup!

## What Works in Each Mode

### Local File (file://)
- ✅ Page navigation works
- ✅ Music plays continuously
- ✅ All features work
- ❌ URLs don't update (stays on index.html)
- ❌ Can't use browser back/forward buttons

### Local Server (http://localhost)
- ✅ Everything works perfectly!
- ✅ URLs update correctly
- ✅ Browser back/forward works
- ✅ Exact same as GitHub Pages

### GitHub Pages
- ✅ Everything works perfectly!
- ✅ Full functionality
- ✅ Production ready

## Quick Test

1. Refresh the page
2. Click the music button (♫)
3. Click through the pages
4. **Music should keep playing!** 🎵

The SPA features work regardless, but for full URL/history support, use a local server or GitHub Pages.
