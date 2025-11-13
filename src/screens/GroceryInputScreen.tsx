import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import * as ImagePicker from 'expo-image-picker';

type GroceryInputScreenNavigationProp = StackNavigationProp<RootStackParamList, 'GroceryInput'>;

interface Props {
  navigation: GroceryInputScreenNavigationProp;
}

export default function GroceryInputScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState('');
  const [textInput, setTextInput] = useState('');
  const [groceryItems, setGroceryItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; sender: 'user' | 'ai' }>>([]);

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

  const handlePhotoUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Simulate OCR processing
      Alert.alert('Photo Processing', 'Photo uploaded! In a real app, this would use OCR to detect items.');
      // Mock detected items
      const mockItems = ['Apples', 'Bananas', 'Milk', 'Bread'];
      setGroceryItems((prev) => [...prev, ...mockItems]);
    }
  };

  const handleChatSend = () => {
    if (chatMessage.trim()) {
      setChatMessages((prev) => [...prev, { text: chatMessage, sender: 'user' }]);
      
      // Simulate AI response
      setTimeout(() => {
        const response = `I understand you mentioned: "${chatMessage}". I'll add some items based on that.`;
        setChatMessages((prev) => [...prev, { text: response, sender: 'ai' }]);
        
        // Mock extracted items
        const mockItems = ['Item 1', 'Item 2', 'Item 3'];
        setGroceryItems((prev) => [...prev, ...mockItems]);
      }, 1000);
      
      setChatMessage('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🛒</Text>
        <Text style={styles.headerTitle}>Add Your Groceries & Pantry Items</Text>
        <Text style={styles.headerSubtitle}>
          Choose your preferred method to input ingredients. We support text lists, photo uploads, and natural conversation.
        </Text>
      </View>

      {/* Input Method Cards */}
      <View style={styles.methodsContainer}>
        <TouchableOpacity
          style={[styles.methodCard, activeTab === 'text' && styles.activeMethodCard]}
          onPress={() => setActiveTab('text')}
        >
          <Text style={styles.methodIcon}>📝</Text>
          <Text style={styles.methodTitle}>Text Input</Text>
          <Text style={styles.methodDescription}>
            Type or paste your grocery list. Separate items with commas or new lines.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodCard, activeTab === 'photo' && styles.activeMethodCard]}
          onPress={() => setActiveTab('photo')}
        >
          <Text style={styles.methodIcon}>📷</Text>
          <Text style={styles.methodTitle}>Photo Upload</Text>
          <Text style={styles.methodDescription}>
            Take a photo of your grocery list or pantry items for automatic recognition.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.methodCard, activeTab === 'chat' && styles.activeMethodCard]}
          onPress={() => setActiveTab('chat')}
        >
          <Text style={styles.methodIcon}>💬</Text>
          <Text style={styles.methodTitle}>AI Chat</Text>
          <Text style={styles.methodDescription}>
            Describe what you have in natural language and let our AI understand.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Active Tab Content */}
      {activeTab === 'text' && (
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
      )}

      {activeTab === 'photo' && (
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Upload Photo</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handlePhotoUpload}>
            <Text style={styles.uploadButtonText}>📸 Choose Photo</Text>
          </TouchableOpacity>
          <Text style={styles.helpText}>
            Upload a photo of your grocery list or pantry items. Our AI will detect the items automatically.
          </Text>
        </View>
      )}

      {activeTab === 'chat' && (
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Chat with AI</Text>
          <View style={styles.chatContainer}>
            <ScrollView style={styles.chatMessages}>
              {chatMessages.map((msg, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.chatBubble,
                    msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
                  ]}
                >
                  <Text style={styles.chatText}>{msg.text}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.chatInputContainer}>
              <TextInput
                style={styles.chatInput}
                placeholder="Describe what you have..."
                value={chatMessage}
                onChangeText={setChatMessage}
                onSubmitEditing={handleChatSend}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleChatSend}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

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
              onPress={() => navigation.navigate('MealPlanning')}
            >
              <Text style={styles.continueButtonText}>Continue to Meal Planning →</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
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
  methodsContainer: {
    padding: 16,
    gap: 12,
  },
  methodCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeMethodCard: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  methodIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 13,
    color: '#6b7280',
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
  uploadButton: {
    backgroundColor: '#3b82f6',
    padding: 40,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  helpText: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
  },
  chatContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    height: 300,
  },
  chatMessages: {
    flex: 1,
    padding: 12,
  },
  chatBubble: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#3b82f6',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#f3f4f6',
    alignSelf: 'flex-start',
  },
  chatText: {
    fontSize: 14,
    color: '#1f2937',
  },
  chatInputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
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
