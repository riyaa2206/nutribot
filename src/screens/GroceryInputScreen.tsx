import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/AppNavigator';
import { usePrefs } from '../context/PrefsContext';
import { globalStyles, colors } from '../styles/globalStyles';

type GroceryInputScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'GroceryInput'>;

interface Props {
  navigation: GroceryInputScreenNavigationProp;
}

export default function GroceryInputScreen({ navigation }: Props) {
  const { setPreferences } = usePrefs();
  const [newItem, setNewItem] = useState('');
  const [textInput, setTextInput] = useState('');
  const [groceryItems, setGroceryItems] = useState<string[]>([]);
  const [userChoice, setUserChoice] = useState<'have' | 'need' | null>(null);

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      const items = textInput
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      setGroceryItems((prev) => [...prev, ...items]);
      setTextInput('');
    }
  };

  const handleAddSingleItem = () => {
    if (newItem.trim()) {
      setGroceryItems((prev) => [...prev, newItem.trim()]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setGroceryItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleHaveIngredients = () => {
    setUserChoice('have');
  };

  const handleNeedIngredients = () => {
    setUserChoice('need');
    // Navigate directly to meal planning if they want to get ingredients
    navigation.navigate('MealPlanning');
  };

  const handleContinue = () => {
    // Update groceries in preferences context
    setPreferences((prev) => ({
      ...prev,
      groceries: groceryItems,
    }));
    navigation.navigate('MealPlanning');
  };

  return (
    <ScrollView style={globalStyles.container}>
      {!userChoice ? (
        // Initial choice screen
        <View style={globalStyles.choiceContainer}>
          <View style={globalStyles.header}>
            <Text style={globalStyles.headerTitle}>🛒 Let's Get Started!</Text>
            <Text style={globalStyles.choiceTitle}>
              Do you want recipes based on what you already have, or recipes to help you plan your shopping?
            </Text>
          </View>

          <View style={globalStyles.choiceButtons}>
            <TouchableOpacity
              style={globalStyles.choiceCard}
              onPress={handleHaveIngredients}
            >
              <Text style={globalStyles.choiceIcon}>✅</Text>
              <Text style={globalStyles.choiceTitle}>I Have Ingredients</Text>
              <Text style={globalStyles.cardDescription}>
                Enter the groceries/ingredients you already have and get recipes you can make now
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={globalStyles.choiceCard}
              onPress={handleNeedIngredients}
            >
              <Text style={globalStyles.choiceIcon}>📋</Text>
              <Text style={globalStyles.choiceTitle}>I Need to Get Ingredients</Text>
              <Text style={globalStyles.cardDescription}>
                Plan your meals first and get a shopping list of what you need
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Text input screen (only shown if user chose "I Have Ingredients")
        <>
          <View style={globalStyles.header}>
            <Text style={globalStyles.headerIcon}>🛒</Text>
            <Text style={globalStyles.headerTitle}>Enter Your Ingredients</Text>
            <Text style={globalStyles.headerSubtitle}>
              Add the groceries and ingredients you have available
            </Text>
          </View>

          <View style={globalStyles.inputSection}>
            <Text style={globalStyles.inputLabel}>Grocery List</Text>
            <TextInput
              style={globalStyles.textArea}
              placeholder="Enter your grocery items separated by commas or new lines:&#10;&#10;Apples, Bananas, Chicken breast&#10;Rice&#10;Broccoli&#10;Olive oil"
              value={textInput}
              onChangeText={setTextInput}
              multiline
              numberOfLines={6}
            />
            <TouchableOpacity style={globalStyles.button} onPress={handleTextSubmit}>
              <Text style={globalStyles.buttonText}>Add Items from List</Text>
            </TouchableOpacity>

            <View style={globalStyles.singleItemContainer}>
              <TextInput
                style={globalStyles.singleItemInput}
                placeholder="Add single item..."
                value={newItem}
                onChangeText={setNewItem}
                onSubmitEditing={handleAddSingleItem}
              />
              <TouchableOpacity style={globalStyles.addButton} onPress={handleAddSingleItem}>
                <Text style={globalStyles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Current Items Display */}
          {groceryItems.length > 0 && (
            <View style={globalStyles.itemsSection}>
              <Text style={globalStyles.itemsTitle}>Your Ingredients ({groceryItems.length} items)</Text>
              <Text style={globalStyles.itemsSubtitle}>Review your ingredients before proceeding to meal planning.</Text>

              <View style={globalStyles.itemsContainer}>
                {groceryItems.map((item, index) => (
                  <View key={index} style={globalStyles.itemBadge}>
                    <Text style={globalStyles.itemText}>{item}</Text>
                    <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                      <Text style={globalStyles.removeText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <View style={globalStyles.actionButtons}>
                <TouchableOpacity
                  style={globalStyles.clearButton}
                  onPress={() => setGroceryItems([])}
                >
                  <Text style={globalStyles.clearButtonText}>Clear All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={globalStyles.continueButton}
                  onPress={handleContinue}
                >
                  <Text style={globalStyles.continueButtonText}>Continue to Meal Planning →</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}
