import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/AppNavigator';
import { usePrefs } from '../context/PrefsContext';
import raxios from '../utils/axiosHelper';
import { Recipe } from '../types';
import { globalStyles, colors } from '../styles/globalStyles';

type RecipesScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Recipes'>;

interface Props {
  navigation: RecipesScreenNavigationProp;
}

const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Chicken Bowl',
    description: 'Fresh and healthy bowl with grilled chicken, quinoa, and Mediterranean vegetables',
    cookTime: 25,
    servings: 2,
    difficulty: 'Easy',
    mealType: 'Lunch',
    rating: 4.8,
    image: '/mediterranean-chicken-bowl.jpg',
    ingredients: [
      '2 chicken breasts',
      '1 cup quinoa',
      '1 cucumber',
      '2 tomatoes',
      '1/2 red onion',
      '1/4 cup olive oil',
      '2 tbsp lemon juice',
      'Fresh herbs',
    ],
    instructions: [
      'Cook quinoa according to package instructions',
      'Season and grill chicken breasts for 6-7 minutes per side',
      'Dice cucumber, tomatoes, and red onion',
      'Whisk olive oil with lemon juice and herbs',
      'Slice chicken and serve over quinoa with vegetables',
      'Drizzle with dressing and enjoy',
    ],
    nutrition: { calories: 485, protein: 35, carbs: 42, fat: 18 },
    tags: ['High Protein', 'Mediterranean', 'Gluten-Free'],
  },
  {
    id: '2',
    title: 'Veggie-Packed Breakfast Scramble',
    description: 'Nutritious morning meal with eggs, spinach, bell peppers, and cheese',
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    mealType: 'Breakfast',
    rating: 4.6,
    image: '/vegetable-breakfast-scramble-eggs.jpg',
    ingredients: [
      '4 large eggs',
      '2 cups fresh spinach',
      '1 bell pepper',
      '1/4 cup cheese',
      '2 tbsp olive oil',
      'Salt and pepper',
      'Fresh herbs',
    ],
    instructions: [
      'Heat olive oil in a large pan',
      'Sauté diced bell pepper for 3 minutes',
      'Add spinach and cook until wilted',
      'Beat eggs and pour into pan',
      'Scramble gently, adding cheese at the end',
      'Season with salt, pepper, and herbs',
    ],
    nutrition: { calories: 320, protein: 22, carbs: 8, fat: 24 },
    tags: ['Vegetarian', 'Quick', 'High Protein'],
  },
  {
    id: '3',
    title: 'Asian-Style Salmon with Rice',
    description: 'Glazed salmon fillet with steamed vegetables and jasmine rice',
    cookTime: 30,
    servings: 2,
    difficulty: 'Medium',
    mealType: 'Dinner',
    rating: 4.9,
    image: '/asian-glazed-salmon-with-rice.jpg',
    ingredients: [
      '2 salmon fillets',
      '1 cup jasmine rice',
      '2 cups broccoli',
      '2 tbsp soy sauce',
      '1 tbsp honey',
      '1 tsp ginger',
      '2 cloves garlic',
      'Sesame seeds',
    ],
    instructions: [
      'Cook jasmine rice according to package instructions',
      'Mix soy sauce, honey, ginger, and garlic for glaze',
      'Pan-sear salmon for 4 minutes per side',
      'Brush with glaze in last 2 minutes',
      'Steam broccoli until tender-crisp',
      'Serve salmon over rice with vegetables',
    ],
    nutrition: { calories: 520, protein: 38, carbs: 45, fat: 22 },
    tags: ['High Protein', 'Omega-3', 'Asian'],
  },
  {
    id: '4',
    title: 'Quinoa Power Salad',
    description: 'Nutrient-dense salad with quinoa, mixed greens, nuts, and tahini dressing',
    cookTime: 20,
    servings: 2,
    difficulty: 'Easy',
    mealType: 'Lunch',
    rating: 4.7,
    image: '/quinoa-power-salad-with-nuts.jpg',
    ingredients: [
      '1 cup quinoa',
      '4 cups mixed greens',
      '1/4 cup almonds',
      '1/4 cup dried cranberries',
      '2 tbsp tahini',
      '1 lemon',
      '1 tbsp olive oil',
      'Salt to taste',
    ],
    instructions: [
      'Cook quinoa and let cool completely',
      'Toast almonds in a dry pan until fragrant',
      'Whisk tahini with lemon juice and olive oil',
      'Combine quinoa with mixed greens',
      'Add almonds and cranberries',
      'Toss with dressing and serve',
    ],
    nutrition: { calories: 420, protein: 16, carbs: 52, fat: 18 },
    tags: ['Vegan', 'High Fiber', 'Superfood'],
  },
  {
    id: '5',
    title: 'Hearty Lentil Soup',
    description: 'Warming and nutritious soup with red lentils, vegetables, and aromatic spices',
    cookTime: 35,
    servings: 4,
    difficulty: 'Easy',
    mealType: 'Dinner',
    rating: 4.5,
    image: '/hearty-red-lentil-soup-vegetables.jpg',
    ingredients: [
      '1 cup red lentils',
      '2 carrots',
      '2 celery stalks',
      '1 onion',
      '3 cups vegetable broth',
      '2 tsp cumin',
      '1 tsp turmeric',
      '2 tbsp olive oil',
    ],
    instructions: [
      'Heat olive oil and sauté diced onion',
      'Add carrots and celery, cook for 5 minutes',
      'Stir in spices and cook for 1 minute',
      'Add lentils and broth, bring to boil',
      'Simmer for 20-25 minutes until lentils are soft',
      'Season with salt and pepper to taste',
    ],
    nutrition: { calories: 280, protein: 18, carbs: 45, fat: 6 },
    tags: ['Vegan', 'High Fiber', 'Comfort Food'],
  },
  {
    id: '6',
    title: 'Greek Yogurt Berry Parfait',
    description: 'Layered parfait with Greek yogurt, fresh berries, and crunchy granola',
    cookTime: 10,
    servings: 2,
    difficulty: 'Easy',
    mealType: 'Breakfast',
    rating: 4.4,
    image: '/greek-yogurt-berry-parfait-granola.jpg',
    ingredients: [
      '2 cups Greek yogurt',
      '1 cup mixed berries',
      '1/2 cup granola',
      '2 tbsp honey',
      '1 tsp vanilla',
      'Mint leaves',
    ],
    instructions: [
      'Mix Greek yogurt with vanilla and half the honey',
      'Layer yogurt in glasses or bowls',
      'Add a layer of mixed berries',
      'Sprinkle granola on top',
      'Repeat layers as desired',
      'Drizzle with remaining honey and garnish with mint',
    ],
    nutrition: { calories: 340, protein: 20, carbs: 45, fat: 8 },
    tags: ['Vegetarian', 'High Protein', 'Quick'],
  },
];

export default function RecipesScreen({ navigation }: Props) {
  const { preferences } = usePrefs();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const fetchRecipes = async () => {
    try {
      const response = await raxios.post('/meals', {
        preferences,
      });
      console.log('Fetched recipes:', response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '#10b981';
      case 'Medium':
        return '#f59e0b';
      case 'Hard':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerIcon}>👨‍🍳</Text>
        <Text style={globalStyles.headerTitle}>Your Personalized Recipe Collection</Text>
        <Text style={globalStyles.headerSubtitle}>
          AI-generated recipes tailored to your ingredients, preferences, and nutrition goals. Each recipe is optimized for your meal planning timeline.
        </Text>
      </View>

      {/* Generation Status */}
      <View style={globalStyles.statusCard}>
        <Text style={globalStyles.statusTitle}>✨ Recipe Generation Complete</Text>
        <Text style={globalStyles.statusDescription}>
          Generated 24 personalized recipes based on your ingredients and 7-day meal plan for 2 people.
        </Text>
        <View style={globalStyles.statusMetrics}>
          <Text style={globalStyles.metricText}>⏱️ Avg. 25 min cook time</Text>
          <Text style={globalStyles.metricText}>👥 2 servings each</Text>
          <Text style={globalStyles.metricText}>👨‍🍳 Balanced nutrition</Text>
          <Text style={globalStyles.metricText}>✨ 95% ingredient match</Text>
        </View>
      </View>

      {/* Recipe Grid */}
      <View style={globalStyles.stepContainer}>
        <Text style={globalStyles.stepTitle}>Your Recipes ({mockRecipes.length})</Text>

        {mockRecipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            style={globalStyles.recipeCard}
            onPress={() => setSelectedRecipe(recipe)}
          >
            <View style={globalStyles.recipeHeader}>
              <View style={globalStyles.recipeHeaderText}>
                <Text style={globalStyles.recipeTitle}>{recipe.title}</Text>
                <Text style={globalStyles.recipeRating}>⭐ {recipe.rating}</Text>
              </View>
              <View
                style={[
                  globalStyles.difficultyBadge,
                  { backgroundColor: getDifficultyColor(recipe.difficulty) },
                ]}
              >
                <Text style={globalStyles.difficultyText}>{recipe.difficulty}</Text>
              </View>
            </View>

            <Text style={globalStyles.cardDescription}>{recipe.description}</Text>

            <View style={globalStyles.recipeMetrics}>
              <Text style={globalStyles.metricItem}>⏱️ {recipe.cookTime} min</Text>
              <Text style={globalStyles.metricItem}>👥 {recipe.servings} servings</Text>
              <Text style={globalStyles.metricItem}>{recipe.mealType}</Text>
            </View>

            <View style={globalStyles.recipeTags}>
              {recipe.tags.map((tag) => (
                <View key={tag} style={globalStyles.tag}>
                  <Text style={globalStyles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <View style={globalStyles.nutritionGrid}>
              <View style={globalStyles.nutritionItem}>
                <Text style={globalStyles.nutritionValue}>{recipe.nutrition.calories}</Text>
                <Text style={globalStyles.nutritionLabel}>cal</Text>
              </View>
              <View style={globalStyles.nutritionItem}>
                <Text style={globalStyles.nutritionValue}>{recipe.nutrition.protein}g</Text>
                <Text style={globalStyles.nutritionLabel}>protein</Text>
              </View>
              <View style={globalStyles.nutritionItem}>
                <Text style={globalStyles.nutritionValue}>{recipe.nutrition.carbs}g</Text>
                <Text style={globalStyles.nutritionLabel}>carbs</Text>
              </View>
              <View style={globalStyles.nutritionItem}>
                <Text style={globalStyles.nutritionValue}>{recipe.nutrition.fat}g</Text>
                <Text style={globalStyles.nutritionLabel}>fat</Text>
              </View>
            </View>

            <TouchableOpacity style={globalStyles.viewButton}>
              <Text style={globalStyles.viewButtonText}>👨‍🍳 View Recipe</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recipe Modal */}
      <Modal visible={!!selectedRecipe} animationType="slide" onRequestClose={() => setSelectedRecipe(null)}>
        {selectedRecipe && (
          <ScrollView style={globalStyles.modalContainer}>
            <View style={globalStyles.modalHeader}>
              <Text style={globalStyles.modalTitle}>{selectedRecipe.title}</Text>
              <TouchableOpacity onPress={() => setSelectedRecipe(null)} style={globalStyles.closeButton}>
                <Text style={globalStyles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <Text style={globalStyles.cardDescription}>{selectedRecipe.description}</Text>

            <View style={globalStyles.modalSection}>
              <Text style={globalStyles.modalSectionTitle}>Ingredients</Text>
              {selectedRecipe.ingredients.map((ingredient, idx) => (
                <Text key={idx} style={globalStyles.modalListItem}>• {ingredient}</Text>
              ))}
            </View>

            <View style={globalStyles.modalSection}>
              <Text style={globalStyles.modalSectionTitle}>Instructions</Text>
              {selectedRecipe.instructions.map((instruction, idx) => (
                <Text key={idx} style={globalStyles.modalListItem}>
                  {idx + 1}. {instruction}
                </Text>
              ))}
            </View>

            <View style={globalStyles.modalSection}>
              <Text style={globalStyles.modalSectionTitle}>Nutrition Information</Text>
              <Text style={globalStyles.modalListItem}>Calories: {selectedRecipe.nutrition.calories}</Text>
              <Text style={globalStyles.modalListItem}>Protein: {selectedRecipe.nutrition.protein}g</Text>
              <Text style={globalStyles.modalListItem}>Carbs: {selectedRecipe.nutrition.carbs}g</Text>
              <Text style={globalStyles.modalListItem}>Fat: {selectedRecipe.nutrition.fat}g</Text>
            </View>
          </ScrollView>
        )}
      </Modal>
    </ScrollView>
  );
}
