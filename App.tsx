import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { PrefsProvider } from './src/context/PrefsContext';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PrefsProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </PrefsProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
