# NUTRIBOT - React Native Android App

A smart nutrition planning application built with React Native and Expo, featuring AI-powered meal planning, recipe generation, and nutrition guidance.

## Features

- **Home Screen**: Landing page with app overview and navigation to key features
- **Grocery Input**: Multiple input methods (text, photo, AI chat) for adding ingredients
- **Meal Planning**: Multi-step wizard for customizing meal preferences
  - Duration and servings selection
  - Nutrition goals
  - Meal types and dietary restrictions
  - Cooking preferences
- **Recipes**: Display personalized recipes with nutrition information
- **AI Chat**: Interactive nutrition assistant for meal advice and guidance

## Technology Stack

- **React Native** with **Expo** for cross-platform development
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Context API** for state management
- **Axios** for API requests (placeholder implementation)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on Android:
```bash
npm run android
```

4. Run on iOS:
```bash
npm run ios
```

## Project Structure

```
nutribot/
├── src/
│   ├── screens/         # All screen components
│   │   ├── HomeScreen.tsx
│   │   ├── GroceryInputScreen.tsx
│   │   ├── MealPlanningScreen.tsx
│   │   ├── RecipesScreen.tsx
│   │   └── AIChatScreen.tsx
│   ├── navigation/      # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── context/         # Context providers
│   │   └── PrefsContext.tsx
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   └── utils/           # Utility functions
│       └── axiosHelper.ts
├── assets/              # Images and other assets
├── App.tsx             # Main app component
├── package.json        # Dependencies
└── app.json           # Expo configuration
```

## Key Features Implementation

### Navigation
The app uses React Navigation Stack Navigator with 5 main screens:
- Home
- Grocery Input
- Meal Planning
- Recipes
- AI Chat

### Preferences Context
Meal planning preferences are managed globally using React Context:
- Duration (days)
- Number of servings
- Nutrition goals
- Dietary restrictions
- Meal types
- Cooking time
- Skill level

### Dummy Data & Functions
The app includes placeholder data and functions to simulate real functionality:

1. **fetchRecipes function** in RecipesScreen:
   - Makes POST request to `/meals` endpoint
   - Sends user preferences
   - Logs response (mock backend)

2. **Mock recipes**: 6 sample recipes with complete nutrition information

3. **AI Chat responses**: Simulated AI responses based on user input patterns

4. **Image picker**: Uses Expo Image Picker for photo uploads

## Features Preserved from Web Version

All features from the original Next.js web app have been preserved:

✅ Home page with hero section, features, and stats
✅ Multiple grocery input methods (text, photo, AI chat)
✅ Multi-step meal planning form with all options
✅ Recipe grid with detailed information
✅ AI chat interface with quick prompts
✅ Recipe modal for detailed view
✅ Preference context for meal planning
✅ fetchRecipes API call function
✅ All placeholder data and dummy functions

## Building for Production

### Android APK
```bash
eas build --platform android --profile preview
```

### Android AAB (for Play Store)
```bash
eas build --platform android --profile production
```

## License

Private
