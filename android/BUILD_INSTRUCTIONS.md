# Building NUTRIBOT Android App

This document provides instructions for building the NUTRIBOT Android application.

## Prerequisites

Before building the app, ensure you have the following installed:

1. **Java Development Kit (JDK) 17**
   - Download from: https://adoptium.net/temurin/releases/
   - Verify installation: `java -version` (should show version 17.x.x)

2. **Android Studio** (recommended) or **Android SDK Command-line Tools**
   - Download from: https://developer.android.com/studio
   - Android Studio includes Android SDK, AVD Manager, and build tools

3. **Android SDK Requirements**
   - Android SDK Platform 34 (Android 14)
   - Android SDK Build-Tools 34.0.0
   - Android SDK Platform-Tools
   - Android Emulator (optional, for testing)

## Method 1: Build with Android Studio (Recommended)

This is the easiest method for most developers:

1. **Open the Project**
   ```
   - Launch Android Studio
   - Select "Open an Existing Project"
   - Navigate to the `android` directory in this repository
   - Click "OK"
   ```

2. **Wait for Gradle Sync**
   - Android Studio will automatically sync Gradle dependencies
   - This may take several minutes on first run
   - Watch the status bar at the bottom of the window

3. **Build the App**
   - Click "Build" → "Make Project" (or press Ctrl+F9 / Cmd+F9)
   - Or click "Build" → "Build Bundle(s) / APK(s)" → "Build APK(s)"

4. **Run on Emulator or Device**
   - Click the "Run" button (green triangle) or press Shift+F10
   - Select a target device (emulator or connected physical device)
   - The app will be installed and launched automatically

5. **Find the APK**
   - After building, find the APK at:
   - `android/app/build/outputs/apk/debug/app-debug.apk`

## Method 2: Build with Command Line

If you prefer using the command line or don't want to install Android Studio:

### Setup Android SDK

1. **Download Android Command Line Tools**
   - Visit: https://developer.android.com/studio#command-tools
   - Download the command line tools for your OS

2. **Install SDK Components**
   ```bash
   # Set ANDROID_HOME environment variable
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
   export PATH=$PATH:$ANDROID_HOME/platform-tools

   # Install required SDK components
   sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
   ```

### Build the APK

1. **Navigate to the Android directory**
   ```bash
   cd android
   ```

2. **Make gradlew executable (Unix/Mac)**
   ```bash
   chmod +x gradlew
   ```

3. **Build Debug APK**
   ```bash
   ./gradlew assembleDebug
   ```

4. **Build Release APK (unsigned)**
   ```bash
   ./gradlew assembleRelease
   ```

5. **Find the built APK**
   - Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
   - Release: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

### Windows Command Line

On Windows, use `gradlew.bat` instead of `./gradlew`:

```cmd
cd android
gradlew.bat assembleDebug
```

## Testing the App

### On Emulator

1. **Create an Emulator (Android Studio)**
   - Tools → Device Manager
   - Click "Create Device"
   - Choose a phone model (e.g., Pixel 6)
   - Select a system image (Android 14/API 34 recommended)
   - Finish setup

2. **Launch Emulator**
   - Click play button next to emulator in Device Manager

3. **Install APK**
   ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

### On Physical Device

1. **Enable Developer Options on your Android device**
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Return to Settings → System → Developer Options
   - Enable "USB Debugging"

2. **Connect Device to Computer**
   - Use USB cable
   - Accept USB debugging prompt on device

3. **Verify Connection**
   ```bash
   adb devices
   ```

4. **Install APK**
   ```bash
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

## Troubleshooting

### Gradle Sync Failed

**Problem**: "Failed to sync Gradle project"

**Solutions**:
- Check your internet connection
- Verify Java 17 is installed: `java -version`
- Clear Gradle cache: `./gradlew clean --no-daemon`
- File → Invalidate Caches / Restart (in Android Studio)

### SDK Not Found

**Problem**: "SDK location not found"

**Solutions**:
1. Create `local.properties` file in `android/` directory:
   ```properties
   sdk.dir=/path/to/your/Android/Sdk
   ```

2. Common SDK locations:
   - **Mac**: `/Users/[username]/Library/Android/sdk`
   - **Windows**: `C:\Users\[username]\AppData\Local\Android\Sdk`
   - **Linux**: `/home/[username]/Android/Sdk`

### Build Failed - Dependency Issues

**Problem**: "Could not resolve dependencies"

**Solutions**:
- Check internet connection
- Try using VPN if behind corporate firewall
- Clear Gradle cache:
  ```bash
  rm -rf ~/.gradle/caches/
  ./gradlew clean build --refresh-dependencies
  ```

### Java Version Mismatch

**Problem**: "Unsupported class file major version"

**Solutions**:
- Ensure Java 17 is installed and active
- Set JAVA_HOME environment variable to JDK 17:
  ```bash
  export JAVA_HOME=/path/to/jdk-17
  ```

### Out of Memory

**Problem**: "Out of memory" during build

**Solutions**:
- Increase Gradle memory in `gradle.properties`:
  ```properties
  org.gradle.jvmargs=-Xmx4096m -Dfile.encoding=UTF-8
  ```

## Build Variants

The app supports two build variants:

- **Debug**: For development and testing, includes debugging information
  - Command: `./gradlew assembleDebug`
  - APK: `app-debug.apk`

- **Release**: For production, optimized and minified
  - Command: `./gradlew assembleRelease`
  - APK: `app-release-unsigned.apk` (needs signing)

## Signing Release APK

For production release, you need to sign the APK:

1. **Generate Keystore**
   ```bash
   keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias
   ```

2. **Configure Signing in app/build.gradle**
   ```gradle
   android {
       signingConfigs {
           release {
               storeFile file("my-release-key.jks")
               storePassword "your-keystore-password"
               keyAlias "my-alias"
               keyPassword "your-key-password"
           }
       }
       buildTypes {
           release {
               signingConfig signingConfigs.release
               // ...
           }
       }
   }
   ```

3. **Build Signed APK**
   ```bash
   ./gradlew assembleRelease
   ```

## Additional Resources

- [Android Developer Documentation](https://developer.android.com/docs)
- [Gradle Build Tool](https://gradle.org/guides/)
- [Material Design Guidelines](https://material.io/design)

## Support

For issues specific to this project, please open an issue on the GitHub repository.
