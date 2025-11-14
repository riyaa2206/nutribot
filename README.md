# NUTRIBOT - React Native Android App

A smart nutrition planning application built with React Native and Expo, featuring AI-powered meal planning, recipe generation, and nutrition guidance.

## Technology Stack

- **React Native** with **Expo** for cross-platform development
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Context API** for state management
- **Axios** for API requests (placeholder implementation)

## Build

1. Generate native project files
```bash
expo prebuild -p android
```

2. Create the assets folder (if missing) and bundle JS into it.
```bash
# ensure the assets dir exists
mkdir -p android\app\src\main\assets

# bundle JS (use index.js if that's your entry file)
npx react-native bundle --platform android --dev false --entry-file index.ts --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

3. Build the APK with Gradle:
```bash
cd android
./gradlew assembleRelease
```
or
```bash
./gradlew assembleDebug
```
