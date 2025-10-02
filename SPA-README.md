# Single Page Application (SPA) Wedding Site

## What Changed?

Your wedding site is now a **Single Page Application (SPA)**. This means:

✅ **Music plays continuously** when navigating between pages - no interruptions!
✅ Smooth fade transitions between pages
✅ Faster page loads (content swaps instead of full page reload)
✅ All features work exactly the same (RSVP form, carousels, modals, translations)
✅ Browser back/forward buttons work perfectly
✅ Users can still bookmark specific pages (index.html, rsvp.html, etc.)

## How It Works

**Before (Multi-Page):**
- Clicking a link → Browser loads new HTML file → Music stops → Music tries to restart

**Now (SPA):**
- Clicking a link → JavaScript swaps content → Music keeps playing! 🎵

## Files

- **index.html** - Main file with all page templates
- **spa-app.js** - Handles page navigation and feature initialization
- **language.js** - Language translations (unchanged)
- **scripts.js** - Original scripts (unchanged)
- **wedding-styles.css** - Styles (unchanged)

## Backups

Your original files are backed up in:
- `backup/` folder - Original HTML files
- `index-old-backup.html` - Previous index.html

## Deployment

Just push to GitHub Pages as normal! Everything works the same way, but now with continuous music playback.

## Technical Details

The SPA uses:
- HTML `<template>` tags to store page content
- JavaScript to clone and inject template content
- History API for URL management
- Event delegation for navigation
- Smooth CSS transitions for page changes

All page-specific features (RSVP form, carousels, image modals) are re-initialized automatically when pages change.
