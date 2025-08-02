# Bingo Board Manager

A React Native app built with Expo for managing bingo boards and chosen numbers. The app features three main tabs for easy navigation and control over your bingo game.

## Features

### 1. Números Tab
- **Insert Chosen Numbers:**
  Enter a number (1-75) in the input field and add it to your chosen numbers list.
  - Numbers are grouped under the BINGO columns (B, I, N, G, O) according to their range.
  - Each chosen number appears in the grid and can be removed by tapping the remove button.
  - The state of chosen numbers is automatically saved locally.

### 2. Boards Tab
- **View Boards and Numbers:**
  Displays all bingo boards and highlights the numbers that have been chosen.
  - Each board shows the numbers you have selected.
  - Helps track progress and visualize which numbers have been picked.

### 3. Settings Tab
- **Save/Restore State:**
  - Save the current state of chosen numbers to local storage.
  - Restore previously saved state at any time.
- **Reset All:**
  - Clears all chosen numbers and resets the boards.
- **Clear Storage:**
  - Completely wipes all saved data from local storage.

## How to Run

1. **Install Expo CLI (if not already installed):**
   ```sh
   npm install -g expo-cli
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the app:**
   ```sh
   expo start
   ```

4. **Run on your device:**
   - Use the Expo Go app on your phone to scan the QR code.
   - Or run on an emulator using the options in the Expo CLI.

## Project Structure

- `components/ChosenNumbersTab.tsx` — Handles number input and chosen numbers grid.
- `components/BoardsTab.tsx` — Displays bingo boards and highlights chosen numbers.
- `components/SettingsTab.tsx` — Provides state management actions (save, restore, reset, clear).

## Requirements

- Node.js
- Expo CLI
- React Native

## License

MIT
