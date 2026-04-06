# Zep Website

A modern React + TypeScript landing page for the Zep Discord bot.  
The site presents Zep's core functionality, command overview, permissions model, and setup/operational notes.

## Stack

- React
- TypeScript
- Vite

## Dependencies

### Runtime dependencies

- react
- react-dom

### Development dependencies

- typescript
- vite
- @vitejs/plugin-react
- @types/react
- @types/react-dom

## Project scripts

- `npm run dev` - Start the local development server
- `npm run build` - Type-check and build for production
- `npm run preview` - Preview the production build locally

## Project structure

- `src/App.tsx` - Main page layout and content
- `src/styles.css` - Visual design and responsive styling
- `src/main.tsx` - Application entry point
- `zeplogo.png` - Brand logo used in the site

## Notes

- The source content was derived from bot feature notes and transformed into a presentable marketing/overview website.
- This repository ignores local generated artifacts and the source notes file via `.gitignore`.
