import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import GroceryInputScreen from '../screens/GroceryInputScreen';
import MealPlanningScreen from '../screens/MealPlanningScreen';
import RecipesScreen from '../screens/RecipesScreen';
import AIChatScreen from '../screens/AIChatScreen';

export type RootStackParamList = {
  Home: undefined;
  GroceryInput: undefined;
  MealPlanning: undefined;
  Recipes: undefined;
  AIChat: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'NUTRIBOT' }}
        />
        <Stack.Screen
          name="GroceryInput"
          component={GroceryInputScreen}
          options={{ title: 'Add Groceries' }}
        />
        <Stack.Screen
          name="MealPlanning"
          component={MealPlanningScreen}
          options={{ title: 'Meal Planning' }}
        />
        <Stack.Screen
          name="Recipes"
          component={RecipesScreen}
          options={{ title: 'Your Recipes' }}
        />
        <Stack.Screen
          name="AIChat"
          component={AIChatScreen}
          options={{ title: 'AI Assistant' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
