import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/AppNavigator';
import { usePrefs } from '../context/PrefsContext';
import { globalStyles, colors } from '../styles/globalStyles';

type MealPlanningScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'MealPlanning'>;

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
    <View style={globalStyles.stepContainer}>
      <Text style={globalStyles.stepTitle}>Duration & Servings</Text>
      <Text style={globalStyles.stepSubtitle}>How long do you want to plan for and how many people?</Text>

      <View style={globalStyles.sliderSection}>
        <Text style={globalStyles.inputLabel}>
          Planning Duration: {preferences.duration} {preferences.duration === 1 ? 'day' : 'days'}
        </Text>
        <View style={globalStyles.sliderButtons}>
          {[1, 3, 7].map((days) => (
            <TouchableOpacity
              key={days}
              style={[
                globalStyles.sliderButton,
                preferences.duration === days && globalStyles.sliderButtonActive,
              ]}
              onPress={() => updatePreference('duration', days)}
            >
              <Text
                style={[
                  globalStyles.sliderButtonText,
                  preferences.duration === days && globalStyles.sliderButtonTextActive,
                ]}
              >
                {days}d
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={globalStyles.sliderSection}>
        <Text style={globalStyles.inputLabel}>
          Number of Servings: {preferences.servings} {preferences.servings === 1 ? 'person' : 'people'}
        </Text>
        <View style={globalStyles.sliderButtons}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((servings) => (
            <TouchableOpacity
              key={servings}
              style={[
                globalStyles.sliderButton,
                preferences.servings === servings && globalStyles.sliderButtonActive,
              ]}
              onPress={() => updatePreference('servings', servings)}
            >
              <Text
                style={[
                  globalStyles.sliderButtonText,
                  preferences.servings === servings && globalStyles.sliderButtonTextActive,
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
    <View style={globalStyles.stepContainer}>
      <Text style={globalStyles.stepTitle}>🎯 Nutrition Goals</Text>
      <Text style={globalStyles.stepSubtitle}>What's your primary nutrition objective?</Text>

      {NUTRITION_GOALS.map((goal) => (
        <TouchableOpacity
          key={goal.id}
          style={[
            globalStyles.optionCard,
            preferences.goal === goal.id && globalStyles.optionCardActive,
          ]}
          onPress={() => updatePreference('goal', goal.id)}
        >
          <View style={globalStyles.radioButton}>
            {preferences.goal === goal.id && <View style={globalStyles.radioButtonInner} />}
          </View>
          <View style={globalStyles.optionContent}>
            <Text style={globalStyles.optionTitle}>{goal.title}</Text>
            <Text style={globalStyles.cardDescription}>{goal.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStep3 = () => (
    <View style={globalStyles.stepContainer}>
      <Text style={globalStyles.stepTitle}>👨‍🍳 Meal Preferences</Text>
      <Text style={globalStyles.stepSubtitle}>Select meal types and any dietary restrictions.</Text>

      <Text style={globalStyles.inputLabel}>Meal Types to Include</Text>
      <View style={globalStyles.checkboxGrid}>
        {MEAL_TYPES.map((meal) => (
          <TouchableOpacity
            key={meal.id}
            style={globalStyles.checkboxItem}
            onPress={() => toggleArrayItem('mealTypes', meal.id)}
          >
            <View style={globalStyles.checkbox}>
              {preferences.mealTypes.includes(meal.id) && (
                <Text style={globalStyles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={globalStyles.checkboxLabel}>{meal.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={globalStyles.inputLabel}>Dietary Restrictions (Optional)</Text>
      <View style={globalStyles.checkboxGrid}>
        {DIETARY_RESTRICTIONS.map((restriction) => (
          <TouchableOpacity
            key={restriction}
            style={globalStyles.checkboxItem}
            onPress={() => toggleArrayItem('dietaryRestrictions', restriction)}
          >
            <View style={globalStyles.checkbox}>
              {preferences.dietaryRestrictions.includes(restriction) && (
                <Text style={globalStyles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={globalStyles.checkboxLabel}>{restriction}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={globalStyles.stepContainer}>
      <Text style={globalStyles.stepTitle}>⏱️ Cooking Preferences</Text>
      <Text style={globalStyles.stepSubtitle}>Tell us about your cooking style and available time.</Text>

      <Text style={globalStyles.inputLabel}>Available Cooking Time</Text>
      {COOKING_TIMES.map((time) => (
        <TouchableOpacity
          key={time.id}
          style={[
            globalStyles.optionCard,
            preferences.cookingTime === time.id && globalStyles.optionCardActive,
          ]}
          onPress={() => updatePreference('cookingTime', time.id)}
        >
          <View style={globalStyles.radioButton}>
            {preferences.cookingTime === time.id && <View style={globalStyles.radioButtonInner} />}
          </View>
          <Text style={globalStyles.optionTitle}>{time.label}</Text>
        </TouchableOpacity>
      ))}

      <Text style={[globalStyles.inputLabel, { marginTop: 20 }]}>Cooking Skill Level</Text>
      {SKILL_LEVELS.map((skill) => (
        <TouchableOpacity
          key={skill.id}
          style={[
            globalStyles.optionCard,
            preferences.skillLevel === skill.id && globalStyles.optionCardActive,
          ]}
          onPress={() => updatePreference('skillLevel', skill.id)}
        >
          <View style={globalStyles.radioButton}>
            {preferences.skillLevel === skill.id && <View style={globalStyles.radioButtonInner} />}
          </View>
          <Text style={globalStyles.optionTitle}>{skill.label}</Text>
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
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.headerWithPaddingBottom}>
        <Text style={globalStyles.headerTitle}>📅 Plan Your Nutritious Meals</Text>
        <Text style={globalStyles.headerSubtitle}>
          Set your meal planning preferences and timeframe.
        </Text>
      </View>

      {/* Progress Indicator */}
      <View style={globalStyles.progressContainer}>
        <View style={globalStyles.progressHeader}>
          <Text style={globalStyles.progressText}>Step {currentStep} of {totalSteps}</Text>
          <Text style={globalStyles.progressText}>{Math.round((currentStep / totalSteps) * 100)}% Complete</Text>
        </View>
        <View style={globalStyles.progressBar}>
          <View
            style={[
              globalStyles.progressFill,
              { width: `${(currentStep / totalSteps) * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Current Step */}
      {renderCurrentStep()}

      {/* Navigation Buttons */}
      <View style={globalStyles.navigationButtons}>
        <TouchableOpacity
          style={[globalStyles.navButton, globalStyles.previousButton, currentStep === 1 && globalStyles.disabledButton]}
          onPress={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
        >
          <Text style={globalStyles.previousButtonText}>Previous</Text>
        </TouchableOpacity>

        {currentStep < totalSteps ? (
          <TouchableOpacity
            style={[globalStyles.navButton, globalStyles.nextButton, !canProceedToNext() && globalStyles.disabledButton]}
            onPress={() => setCurrentStep((prev) => prev + 1)}
            disabled={!canProceedToNext()}
          >
            <Text style={globalStyles.nextButtonText}>Next Step →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[globalStyles.navButton, globalStyles.nextButton, !canProceedToNext() && globalStyles.disabledButton]}
            onPress={() => navigation.navigate('Recipes')}
            disabled={!canProceedToNext()}
          >
            <Text style={globalStyles.nextButtonText}>Generate Meal Plan</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Summary */}
      {currentStep > 1 && (
        <View style={globalStyles.summarySection}>
          <Text style={globalStyles.summaryTitle}>Planning Summary</Text>
          <Text style={globalStyles.summaryText}>Duration: {preferences.duration} days</Text>
          <Text style={globalStyles.summaryText}>Servings: {preferences.servings} people</Text>
          {preferences.goal && (
            <Text style={globalStyles.summaryText}>Goal: {preferences.goal.replace('-', ' ')}</Text>
          )}
          {preferences.mealTypes.length > 0 && (
            <Text style={globalStyles.summaryText}>Meals: {preferences.mealTypes.join(', ')}</Text>
          )}
          {preferences.dietaryRestrictions.length > 0 && (
            <Text style={globalStyles.summaryText}>
              Restrictions: {preferences.dietaryRestrictions.join(', ')}
            </Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}
