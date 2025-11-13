import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Message } from '../types';

type AIChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AIChat'>;

interface Props {
  navigation: AIChatScreenNavigationProp;
}

const quickPrompts = [
  'What can I make with chicken, rice, and broccoli?',
  'I need a high-protein breakfast recipe',
  'Help me plan meals for weight loss',
  'What are some healthy snack options?',
  "I'm vegetarian, suggest a dinner recipe",
  'How can I meal prep for the week?',
];

export default function AIChatScreen({ navigation }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hello! I'm your AI nutrition assistant. I can help you with meal planning, recipe suggestions, nutrition advice, and dietary guidance. What would you like to know about today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isTyping]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage;
    if (!messageToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageToSend);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();

    // Recipe suggestions
    if (lowerMessage.includes('recipe') || lowerMessage.includes('make') || lowerMessage.includes('cook')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Based on your request, I found some great recipe options! Here are my top recommendations that match your ingredients and preferences. Each recipe includes detailed nutrition information and cooking instructions.`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'recipe',
        data: {
          recipes: [
            {
              name: 'Mediterranean Chicken Bowl',
              cookTime: '25 min',
              calories: 485,
              protein: '35g',
              difficulty: 'Easy',
            },
            {
              name: 'Veggie Stir-Fry with Rice',
              cookTime: '20 min',
              calories: 320,
              protein: '12g',
              difficulty: 'Easy',
            },
          ],
        },
      };
    }

    // Meal planning
    if (lowerMessage.includes('plan') || lowerMessage.includes('week') || lowerMessage.includes('meal prep')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `I'd be happy to help you create a meal plan! Based on your goals and preferences, here's a structured approach to meal planning that will save you time and ensure balanced nutrition throughout the week.`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'plan',
        data: {
          tips: [
            'Plan 3 main meals + 2 healthy snacks per day',
            'Prep proteins in bulk (chicken, beans, tofu)',
            'Choose 2-3 base grains (quinoa, rice, oats)',
            'Include 5+ different vegetables throughout the week',
            'Prepare overnight oats or smoothie packs for quick breakfasts',
          ],
        },
      };
    }

    // Weight loss advice
    if (lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight') || lowerMessage.includes('diet')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `For healthy weight management, focus on creating a sustainable calorie deficit through nutritious, filling foods. Here are evidence-based strategies that work well for most people while maintaining energy and satisfaction.`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'suggestion',
        data: {
          suggestions: [
            'Prioritize protein (0.8-1g per lb body weight) to maintain muscle',
            'Fill half your plate with non-starchy vegetables',
            'Choose complex carbs like quinoa, sweet potatoes, oats',
            'Include healthy fats from nuts, avocado, olive oil',
            'Stay hydrated - aim for 8+ glasses of water daily',
            'Practice portion control using smaller plates',
          ],
        },
      };
    }

    // High protein requests
    if (lowerMessage.includes('protein') || lowerMessage.includes('muscle')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Great choice focusing on protein! Adequate protein intake supports muscle maintenance, satiety, and metabolic health. Here are excellent high-protein options that are both delicious and nutritious.`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'suggestion',
        data: {
          suggestions: [
            'Greek yogurt with berries and nuts (20g protein)',
            'Chicken breast with quinoa and vegetables (35g protein)',
            'Lentil soup with whole grain bread (18g protein)',
            'Salmon with sweet potato (30g protein)',
            'Protein smoothie with banana and spinach (25g protein)',
            'Eggs with avocado toast (15g protein)',
          ],
        },
      };
    }

    // Vegetarian requests
    if (lowerMessage.includes('vegetarian') || lowerMessage.includes('vegan') || lowerMessage.includes('plant')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Plant-based eating can be incredibly nutritious and delicious! Here are some fantastic vegetarian options that provide complete nutrition and amazing flavors. I'll make sure you get all essential nutrients.`,
        sender: 'ai',
        timestamp: new Date(),
        type: 'recipe',
        data: {
          recipes: [
            {
              name: 'Quinoa Buddha Bowl',
              cookTime: '30 min',
              calories: 420,
              protein: '16g',
              difficulty: 'Easy',
            },
            {
              name: 'Lentil Curry with Rice',
              cookTime: '35 min',
              calories: 380,
              protein: '18g',
              difficulty: 'Medium',
            },
          ],
        },
      };
    }

    // Default response
    return {
      id: (Date.now() + 1).toString(),
      content: `That's a great question! I can help you with meal planning, recipe suggestions, nutrition advice, and dietary guidance. Could you tell me more about your specific goals or what you'd like to focus on? For example, are you looking for recipes, meal planning help, or nutrition advice?`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'text',
    };
  };

  const renderMessage = (message: Message) => {
    const isUser = message.sender === 'user';

    return (
      <View
        key={message.id}
        style={[styles.messageBubble, isUser ? styles.userMessage : styles.aiMessage]}
      >
        <View style={styles.messageHeader}>
          <Text style={styles.messageSender}>{isUser ? 'You' : '🤖 AI Assistant'}</Text>
          <Text style={styles.messageTime}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
        <Text style={styles.messageContent}>{message.content}</Text>

        {/* Special message types */}
        {message.type === 'recipe' && message.data?.recipes && (
          <View style={styles.recipeCards}>
            {message.data.recipes.map((recipe: any, index: number) => (
              <View key={index} style={styles.recipeCard}>
                <Text style={styles.recipeTitle}>{recipe.name}</Text>
                <Text style={styles.recipeDetail}>⏱️ {recipe.cookTime}</Text>
                <Text style={styles.recipeDetail}>🔥 {recipe.calories} cal</Text>
                <Text style={styles.recipeDetail}>💪 {recipe.protein}</Text>
                <Text style={styles.recipeDetail}>Difficulty: {recipe.difficulty}</Text>
              </View>
            ))}
          </View>
        )}

        {message.type === 'suggestion' && message.data?.suggestions && (
          <View style={styles.suggestionsList}>
            {message.data.suggestions.map((suggestion: string, index: number) => (
              <Text key={index} style={styles.suggestionItem}>
                • {suggestion}
              </Text>
            ))}
          </View>
        )}

        {message.type === 'plan' && message.data?.tips && (
          <View style={styles.tipsList}>
            {message.data.tips.map((tip: string, index: number) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.tipNumber}>{index + 1}.</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>💬</Text>
          <Text style={styles.headerTitle}>AI Nutrition Assistant</Text>
          <Text style={styles.headerSubtitle}>
            Chat with our intelligent nutrition assistant for personalized meal advice
          </Text>
        </View>

        {/* Quick Prompts */}
        <View style={styles.quickPromptsContainer}>
          <Text style={styles.quickPromptsTitle}>✨ Quick Questions</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.quickPrompts}>
              {quickPrompts.map((prompt, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickPromptButton}
                  onPress={() => handleSendMessage(prompt)}
                >
                  <Text style={styles.quickPromptText}>{prompt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map(renderMessage)}

          {isTyping && (
            <View style={[styles.messageBubble, styles.aiMessage]}>
              <View style={styles.messageHeader}>
                <Text style={styles.messageSender}>🤖 AI Assistant</Text>
              </View>
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
                <View style={styles.typingDot} />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask me about nutrition, recipes, meal planning..."
            value={inputMessage}
            onChangeText={setInputMessage}
            onSubmitEditing={() => handleSendMessage()}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputMessage.trim() && styles.sendButtonDisabled]}
            onPress={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isTyping}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  quickPromptsContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  quickPromptsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  quickPrompts: {
    flexDirection: 'row',
    gap: 8,
  },
  quickPromptButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  quickPromptText: {
    fontSize: 12,
    color: '#1f2937',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#3b82f6',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  messageSender: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  messageTime: {
    fontSize: 11,
    color: '#9ca3af',
  },
  messageContent: {
    fontSize: 14,
    color: '#1f2937',
    lineHeight: 20,
  },
  recipeCards: {
    marginTop: 12,
    gap: 8,
  },
  recipeCard: {
    backgroundColor: '#f9fafb',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  recipeTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 6,
  },
  recipeDetail: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 2,
  },
  suggestionsList: {
    marginTop: 12,
  },
  suggestionItem: {
    fontSize: 13,
    color: '#1f2937',
    marginBottom: 6,
    lineHeight: 18,
  },
  tipsList: {
    marginTop: 12,
    gap: 8,
  },
  tipItem: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    padding: 8,
    borderRadius: 6,
  },
  tipNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    marginRight: 6,
  },
  tipText: {
    fontSize: 12,
    color: '#1f2937',
    flex: 1,
  },
  typingIndicator: {
    flexDirection: 'row',
    gap: 4,
    paddingVertical: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d1d5db',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#d1d5db',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
