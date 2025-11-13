import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { usePrefs } from '../context/PrefsContext';

type MealPlanningScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MealPlanning'>;

interface Props {
  navigation: MealPlanningScreenNavigationProp;
}

const NUTRITION_GOALS = [
  {
    id: 'balanced',
    title: 'Balanced Nutrition',
    description: 'Well-rounded meals with all food groups',
  },
  {
    id: 'weight-loss',
    title: 'Weight Management',
    description: 'Lower calorie, high protein meals',
  },
  {
    id: 'muscle-gain',
    title: 'Muscle Building',
    description: 'High protein, nutrient-dense meals',
  },
  {
    id: 'energy',
    title: 'Energy & Performance',
    description: 'Sustained energy for active lifestyles',
  },
];

const MEAL_TYPES = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'snacks', label: 'Snacks' },
];

const DIETARY_RESTRICTIONS = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Paleo',
  'Low-Carb',
  'Nut-Free',
];

const COOKING_TIMES = [
  { id: 'quick', label: 'Quick (15-30 minutes)' },
  { id: 'moderate', label: 'Moderate (30-60 minutes)' },
  { id: 'extended', label: 'Extended (60+ minutes)' },
  { id: 'mixed', label: 'Mixed (variety of times)' },
];

const SKILL_LEVELS = [
  { id: 'beginner', label: 'Beginner (simple recipes)' },
  { id: 'intermediate', label: 'Intermediate (moderate complexity)' },
  { id: 'advanced', label: 'Advanced (complex techniques)' },
];

export default function MealPlanningScreen({ navigation }: Props) {
  const { preferences, setPreferences } = usePrefs();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const updatePreference = (key: string, value: any) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: string, item: string) => {
    const array = preferences[key as keyof typeof preferences] as string[];
    const newArray = array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
    updatePreference(key, newArray);
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return preferences.duration > 0 && preferences.servings > 0;
      case 2:
        return preferences.goal !== '';
      case 3:
        return preferences.mealTypes.length > 0;
      case 4:
        return preferences.cookingTime !== '' && preferences.skillLevel !== '';
      default:
        return false;
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>📅 Duration & Servings</Text>
      <Text style={styles.stepSubtitle}>How long do you want to plan for and how many people?</Text>

      <View style={styles.sliderSection}>
        <Text style={styles.sliderLabel}>
          Planning Duration: {preferences.duration} {preferences.duration === 1 ? 'day' : 'days'}
        </Text>
        <View style={styles.sliderButtons}>
          {[1, 3, 7, 14, 21, 28].map((days) => (
            <TouchableOpacity
              key={days}
              style={[
                styles.sliderButton,
                preferences.duration === days && styles.sliderButtonActive,
              ]}
              onPress={() => updatePreference('duration', days)}
            >
              <Text
                style={[
                  styles.sliderButtonText,
                  preferences.duration === days && styles.sliderButtonTextActive,
                ]}
              >
                {days}d
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.sliderSection}>
        <Text style={styles.sliderLabel}>
          Number of Servings: {preferences.servings} {preferences.servings === 1 ? 'person' : 'people'}
        </Text>
        <View style={styles.sliderButtons}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((servings) => (
            <TouchableOpacity
              key={servings}
              style={[
                styles.sliderButton,
                preferences.servings === servings && styles.sliderButtonActive,
              ]}
              onPress={() => updatePreference('servings', servings)}
            >
              <Text
                style={[
                  styles.sliderButtonText,
                  preferences.servings === servings && styles.sliderButtonTextActive,
                ]}
              >
                {servings}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>🎯 Nutrition Goals</Text>
      <Text style={styles.stepSubtitle}>What's your primary nutrition objective?</Text>

      {NUTRITION_GOALS.map((goal) => (
        <TouchableOpacity
          key={goal.id}
          style={[
            styles.optionCard,
            preferences.goal === goal.id && styles.optionCardActive,
          ]}
          onPress={() => updatePreference('goal', goal.id)}
        >
          <View style={styles.radioButton}>
            {preferences.goal === goal.id && <View style={styles.radioButtonInner} />}
          </View>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>{goal.title}</Text>
            <Text style={styles.optionDescription}>{goal.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>👨‍🍳 Meal Preferences</Text>
      <Text style={styles.stepSubtitle}>Select meal types and any dietary restrictions.</Text>

      <Text style={styles.sectionLabel}>Meal Types to Include</Text>
      <View style={styles.checkboxGrid}>
        {MEAL_TYPES.map((meal) => (
          <TouchableOpacity
            key={meal.id}
            style={styles.checkboxItem}
            onPress={() => toggleArrayItem('mealTypes', meal.id)}
          >
            <View style={styles.checkbox}>
              {preferences.mealTypes.includes(meal.id) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={styles.checkboxLabel}>{meal.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Dietary Restrictions (Optional)</Text>
      <View style={styles.checkboxGrid}>
        {DIETARY_RESTRICTIONS.map((restriction) => (
          <TouchableOpacity
            key={restriction}
            style={styles.checkboxItem}
            onPress={() => toggleArrayItem('dietaryRestrictions', restriction)}
          >
            <View style={styles.checkbox}>
              {preferences.dietaryRestrictions.includes(restriction) && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={styles.checkboxLabel}>{restriction}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>⏱️ Cooking Preferences</Text>
      <Text style={styles.stepSubtitle}>Tell us about your cooking style and available time.</Text>

      <Text style={styles.sectionLabel}>Available Cooking Time</Text>
      {COOKING_TIMES.map((time) => (
        <TouchableOpacity
          key={time.id}
          style={[
            styles.optionCard,
            preferences.cookingTime === time.id && styles.optionCardActive,
          ]}
          onPress={() => updatePreference('cookingTime', time.id)}
        >
          <View style={styles.radioButton}>
            {preferences.cookingTime === time.id && <View style={styles.radioButtonInner} />}
          </View>
          <Text style={styles.optionTitle}>{time.label}</Text>
        </TouchableOpacity>
      ))}

      <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Cooking Skill Level</Text>
      {SKILL_LEVELS.map((skill) => (
        <TouchableOpacity
          key={skill.id}
          style={[
            styles.optionCard,
            preferences.skillLevel === skill.id && styles.optionCardActive,
          ]}
          onPress={() => updatePreference('skillLevel', skill.id)}
        >
          <View style={styles.radioButton}>
            {preferences.skillLevel === skill.id && <View style={styles.radioButtonInner} />}
          </View>
          <Text style={styles.optionTitle}>{skill.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>📅</Text>
        <Text style={styles.headerTitle}>Plan Your Nutritious Meals</Text>
        <Text style={styles.headerSubtitle}>
          Set your meal planning preferences and timeframe. We'll generate a personalized nutrition plan based on your available ingredients.
        </Text>
      </View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>Step {currentStep} of {totalSteps}</Text>
          <Text style={styles.progressText}>{Math.round((currentStep / totalSteps) * 100)}% Complete</Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(currentStep / totalSteps) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Current Step */}
      {renderCurrentStep()}

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navButton, styles.previousButton, currentStep === 1 && styles.disabledButton]}
          onPress={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
        >
          <Text style={styles.previousButtonText}>Previous</Text>
        </TouchableOpacity>

        {currentStep < totalSteps ? (
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton, !canProceedToNext() && styles.disabledButton]}
            onPress={() => setCurrentStep((prev) => prev + 1)}
            disabled={!canProceedToNext()}
          >
            <Text style={styles.nextButtonText}>Next Step →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.navButton, styles.nextButton, !canProceedToNext() && styles.disabledButton]}
            onPress={() => navigation.navigate('Recipes')}
            disabled={!canProceedToNext()}
          >
            <Text style={styles.nextButtonText}>Generate Meal Plan</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Summary */}
      {currentStep > 1 && (
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Planning Summary</Text>
          <Text style={styles.summaryText}>Duration: {preferences.duration} days</Text>
          <Text style={styles.summaryText}>Servings: {preferences.servings} people</Text>
          {preferences.goal && (
            <Text style={styles.summaryText}>Goal: {preferences.goal.replace('-', ' ')}</Text>
          )}
          {preferences.mealTypes.length > 0 && (
            <Text style={styles.summaryText}>Meals: {preferences.mealTypes.join(', ')}</Text>
          )}
          {preferences.dietaryRestrictions.length > 0 && (
            <Text style={styles.summaryText}>
              Restrictions: {preferences.dietaryRestrictions.join(', ')}
            </Text>
          )}
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
  progressContainer: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  stepContainer: {
    padding: 16,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  sliderSection: {
    marginBottom: 24,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  sliderButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sliderButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },
  sliderButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  sliderButtonText: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  sliderButtonTextActive: {
    color: '#fff',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
  },
  optionCardActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '47%',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#1f2937',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#1f2937',
  },
  navigationButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  navButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  previousButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },
  nextButton: {
    backgroundColor: '#3b82f6',
  },
  disabledButton: {
    opacity: 0.5,
  },
  previousButtonText: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  summarySection: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
});
