# NUTRIBOT - Android App

An Android application for smart nutrition planning and meal management, built with Java 17.

## Features

- **Home Screen**: Welcome page with app features and statistics
- **Grocery Input**: Add ingredients via text input, photo upload, or AI chat
- **AI Chat Assistant**: Get personalized nutrition advice and recipe suggestions
- **Meal Planning**: Create custom meal plans based on your ingredients and preferences
- **Recipe Browser**: Browse and discover nutritious recipes

## Technical Stack

- **Language**: Java 17
- **Min SDK**: Android 8.0 (API 26)
- **Target SDK**: Android 14 (API 34)
- **Architecture**: Activities with ViewBinding
- **UI Components**: Material Design 3
- **Libraries**:
  - AndroidX AppCompat
  - Material Components
  - RecyclerView
  - ConstraintLayout
  - Navigation Component
  - Glide (for image loading)
  - Retrofit & OkHttp (for API calls)

## Project Structure

```
android/
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/nutribot/app/
│   │       │   ├── MainActivity.java
│   │       │   ├── GroceryInputActivity.java
│   │       │   ├── AIChatActivity.java
│   │       │   ├── MealPlanningActivity.java
│   │       │   ├── RecipesActivity.java
│   │       │   └── ... (adapters and models)
│   │       ├── res/
│   │       │   ├── layout/ (XML layouts)
│   │       │   ├── values/ (colors, strings, themes)
│   │       │   └── drawable/ (icons and images)
│   │       └── AndroidManifest.xml
│   └── build.gradle
├── build.gradle
└── settings.gradle
```

## Building the App

### Prerequisites

- Android Studio Arctic Fox or later
- JDK 17
- Android SDK with API 34

### Build Steps

1. Open Android Studio
2. Select "Open an Existing Project"
3. Navigate to the `android` directory
4. Wait for Gradle sync to complete
5. Click "Run" or press Shift+F10

### Command Line Build

```bash
cd android
./gradlew assembleDebug
```

The APK will be generated in `android/app/build/outputs/apk/debug/`

## UI Design

The app maintains the same UI design and color scheme as the original Next.js web application:

- **Primary Color**: Green (#10b981)
- **Accent Color**: Amber (#f59e0b)
- **Secondary Color**: Indigo (#6366f1)
- **Material Design 3** components for modern Android UI

## Screens

### 1. Home Screen
- Hero section with app description
- Feature cards showcasing key capabilities
- Statistics section
- Call-to-action buttons

### 2. Grocery Input Screen
- Three input methods: Text, Photo, AI Chat
- Real-time item list management
- Chip-based item display
- Continue to meal planning

### 3. AI Chat Screen
- Real-time chat interface
- AI-powered nutrition assistant
- Context-aware responses
- Recipe and meal planning suggestions

### 4. Meal Planning Screen
- Configure number of days and people
- Select dietary goals
- Generate personalized meal plans

### 5. Recipes Screen
- Browse available recipes
- Filter and search functionality (to be implemented)

## Development Notes

- Uses ViewBinding for type-safe view access
- Material Design 3 theming throughout
- Responsive layouts for different screen sizes
- Follows Android best practices and Material Design guidelines

## Future Enhancements

- Camera integration for photo upload
- Image recognition for grocery items
- API integration for real recipe data
- Persistent storage with Room database
- User preferences and settings
- Recipe detail views with instructions
- Shopping list export functionality

## License

Same as the parent project.
