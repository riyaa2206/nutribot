import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/AppNavigator';
import { usePrefs } from '../context/PrefsContext';

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
    <ScrollView style={styles.container}>
      {!userChoice ? (
        // Initial choice screen
        <View style={styles.choiceContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🛒 Let's Get Started!</Text>
            <Text style={styles.choiceTitle}>
              Do you want recipes based on what you already have, or recipes to help you plan your shopping?
            </Text>
          </View>

          <View style={styles.choiceButtons}>
            <TouchableOpacity
              style={styles.choiceCard}
              onPress={handleHaveIngredients}
            >
              <Text style={styles.choiceIcon}>✅</Text>
              <Text style={styles.choiceTitle}>I Have Ingredients</Text>
              <Text style={styles.choiceDescription}>
                Enter the groceries/ingredients you already have and get recipes you can make now
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.choiceCard}
              onPress={handleNeedIngredients}
            >
              <Text style={styles.choiceIcon}>📋</Text>
              <Text style={styles.choiceTitle}>I Need to Get Ingredients</Text>
              <Text style={styles.choiceDescription}>
                Plan your meals first and get a shopping list of what you need
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Text input screen (only shown if user chose "I Have Ingredients")
        <>
          <View style={styles.header}>
            <Text style={styles.headerIcon}>🛒</Text>
            <Text style={styles.headerTitle}>Enter Your Ingredients</Text>
            <Text style={styles.headerSubtitle}>
              Add the groceries and ingredients you have available
            </Text>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Grocery List</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Enter your grocery items separated by commas or new lines:&#10;&#10;Apples, Bananas, Chicken breast&#10;Rice&#10;Broccoli&#10;Olive oil"
              value={textInput}
              onChangeText={setTextInput}
              multiline
              numberOfLines={6}
            />
            <TouchableOpacity style={styles.button} onPress={handleTextSubmit}>
              <Text style={styles.buttonText}>Add Items from List</Text>
            </TouchableOpacity>

            <View style={styles.singleItemContainer}>
              <TextInput
                style={styles.singleItemInput}
                placeholder="Add single item..."
                value={newItem}
                onChangeText={setNewItem}
                onSubmitEditing={handleAddSingleItem}
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddSingleItem}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Current Items Display */}
          {groceryItems.length > 0 && (
            <View style={styles.itemsSection}>
              <Text style={styles.itemsTitle}>Your Ingredients ({groceryItems.length} items)</Text>
              <Text style={styles.itemsSubtitle}>Review your ingredients before proceeding to meal planning.</Text>

              <View style={styles.itemsContainer}>
                {groceryItems.map((item, index) => (
                  <View key={index} style={styles.itemBadge}>
                    <Text style={styles.itemText}>{item}</Text>
                    <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                      <Text style={styles.removeText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => setGroceryItems([])}
                >
                  <Text style={styles.clearButtonText}>Clear All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleContinue}
                >
                  <Text style={styles.continueButtonText}>Continue to Meal Planning →</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  choiceContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  choiceButtons: {
    gap: 16,
    marginTop: 24,
  },
  choiceCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  choiceIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  choiceTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  choiceDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  inputSection: {
    padding: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  singleItemContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  singleItemInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
  },
  addButton: {
    backgroundColor: '#3b82f6',
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemsSection: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  itemsSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 16,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  itemBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 8,
  },
  itemText: {
    fontSize: 14,
    color: '#1f2937',
  },
  removeText: {
    fontSize: 20,
    color: '#ef4444',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    flex: 2,
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
