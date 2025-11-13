# Building and Running NUTRIBOT Android App

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development) OR Expo Go app on your Android device

## Installation

1. Clone the repository:
```bash
git clone https://github.com/riyaa2206/nutribot.git
cd nutribot
```

2. Install dependencies:
```bash
npm install
```

## Running the App

### Option 1: Using Expo Go (Easiest)

1. Install Expo Go app on your Android device from the Play Store

2. Start the development server:
```bash
npm start
```

3. Scan the QR code with the Expo Go app

### Option 2: Using Android Studio Emulator

1. Set up Android Studio and create an Android emulator

2. Start the emulator

3. Run the app:
```bash
npm run android
```

### Option 3: Using EAS Build (Production)

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure EAS:
```bash
eas build:configure
```

4. Build for Android (APK for testing):
```bash
eas build --platform android --profile preview
```

5. Build for Android (AAB for Play Store):
```bash
eas build --platform android --profile production
```

## Development

### Project Structure

```
nutribot/
├── src/
│   ├── screens/         # All screen components
│   ├── navigation/      # Navigation configuration
│   ├── context/         # Context providers
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── assets/              # Images and other assets
├── App.tsx             # Main app component
└── app.json           # Expo configuration
```

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device (macOS only)
- `npm run web` - Run in web browser (requires additional deps)

## Features Checklist

✅ All screens from the original web app:
  - Home screen
  - Grocery Input screen (text, photo, AI chat)
  - Meal Planning screen (4-step form)
  - Recipes screen
  - AI Chat screen

✅ Navigation between screens

✅ Preferences context for meal planning

✅ Photo upload functionality

✅ Mock data and dummy functions:
  - fetchRecipes API call
  - Mock recipes
  - AI chat responses

✅ All UI components styled similar to web version

## Testing

The app has been designed to work on Android devices. You can test it using:

1. **Expo Go** (recommended for quick testing)
2. **Android Emulator** (for more realistic testing)
3. **Physical Android Device** (for final testing)

## Troubleshooting

### Metro bundler cache issues
```bash
npx expo start --clear
```

### Node modules issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Android build issues
```bash
cd android
./gradlew clean
cd ..
npm run android
```

## Notes

- The BASE_URL for API calls is set to `http://localhost:8080/con`
- All API calls are currently using dummy/mock implementations
- Photo upload uses Expo Image Picker
- The app uses React Navigation for screen navigation
- TypeScript is used for type safety

## Migration from Web to React Native

This project was migrated from a Next.js web application to React Native. Key changes:

1. **Next.js** → **Expo/React Native**
2. **Next Router** → **React Navigation**
3. **HTML/CSS** → **React Native Components/StyleSheet**
4. **Image tags** → **React Native Image component**
5. **Radix UI** → **Custom React Native components**
6. **File-based routing** → **Stack Navigator**

All features, UI design, logic, navigation behavior, placeholder data, and dummy functions have been preserved from the original web application.
