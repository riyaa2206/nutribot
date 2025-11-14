import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/AppNavigator';
import { globalStyles, colors } from '../styles/globalStyles';

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView style={globalStyles.container}>
      {/* Hero Section */}
      <View style={globalStyles.hero}>
        <Text style={globalStyles.heroTitle}>
          Smart Nutrition Planning with <Text style={globalStyles.brandText}>NUTRIBOT</Text>
        </Text>
        <Text style={globalStyles.heroSubtitle}>
          Transform your grocery list into personalized meal plans. Upload ingredients via text, photo, or chat
          with our AI to get nutritious recipes tailored to your timeframe.
        </Text>

        <View style={globalStyles.buttonContainer}>
          <TouchableOpacity
            style={globalStyles.button}
            onPress={() => navigation.navigate('GroceryInput')}
          >
            <Text style={globalStyles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Features Section */}
      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>Everything You Need for Smart Nutrition</Text>
        <Text style={globalStyles.sectionSubtitle}>
          Multiple ways to input your ingredients, intelligent meal planning, and personalized recipe generation.
        </Text>

        <View style={globalStyles.featuresGrid}>
          <View style={globalStyles.card}>
            <Text style={globalStyles.featureIcon}>🛒</Text>
            <Text style={globalStyles.featureTitle}>Multiple Input Methods</Text>
            <Text style={globalStyles.cardDescription}>
              Add groceries via text, photo upload, or natural conversation with our AI assistant.
            </Text>
          </View>

          <View style={globalStyles.card}>
            <Text style={globalStyles.featureIcon}>📅</Text>
            <Text style={globalStyles.featureTitle}>Custom Timeframes</Text>
            <Text style={globalStyles.cardDescription}>
              Plan meals for any duration - from a few days to several weeks based on your needs.
            </Text>
          </View>

          <View style={globalStyles.card}>
            <Text style={globalStyles.featureIcon}>👨‍🍳</Text>
            <Text style={globalStyles.featureTitle}>Smart Recipe Generation</Text>
            <Text style={globalStyles.cardDescription}>
              Get personalized, nutritious recipes that make the most of your available ingredients.
            </Text>
          </View>

          <View style={globalStyles.card}>
            <Text style={globalStyles.featureIcon}>🤖</Text>
            <Text style={globalStyles.featureTitle}>AI-Powered Meal Planning</Text>
            <Text style={globalStyles.cardDescription}>
              Chat naturally about your dietary preferences and get instant nutrition advice.
            </Text>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={globalStyles.statsSection}>
        <View style={[globalStyles.card, { alignItems: 'center' }]}>
          <Text style={globalStyles.statIcon}>❤️</Text>
          <Text style={globalStyles.statValue}>5 min</Text>
          <Text style={globalStyles.statLabel}>Average time to generate meal plans</Text>
        </View>

        <View style={[globalStyles.card, { alignItems: 'center' }]}>
          <Text style={globalStyles.statIcon}>👨‍🍳</Text>
          <Text style={globalStyles.statValue}>10K+</Text>
          <Text style={globalStyles.statLabel}>Recipes Generated</Text>
        </View>

        <View style={[globalStyles.card, { alignItems: 'center' }]}>
          <Text style={globalStyles.statIcon}>🍽️</Text>
          <Text style={globalStyles.statValue}>95%</Text>
          <Text style={globalStyles.statLabel}>User satisfaction rate</Text>
        </View>
      </View>

      {/* CTA Section */}
      <View style={globalStyles.ctaSection}>
        <Text style={globalStyles.ctaTitle}>Ready to Transform Your Meal Planning?</Text>
        <Text style={globalStyles.ctaSubtitle}>
          Join thousands of users who have revolutionized their nutrition with NUTRIBOT's intelligent meal planning.
        </Text>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.navigate('GroceryInput')}
        >
          <Text style={globalStyles.buttonText}>Get Started Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
