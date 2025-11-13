import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { usePrefs } from '../context/PrefsContext';
import raxios from '../utils/axiosHelper';
import { Recipe } from '../types';

type RecipesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Recipes'>;

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>👨‍🍳</Text>
        <Text style={styles.headerTitle}>Your Personalized Recipe Collection</Text>
        <Text style={styles.headerSubtitle}>
          AI-generated recipes tailored to your ingredients, preferences, and nutrition goals. Each recipe is optimized for your meal planning timeline.
        </Text>
      </View>

      {/* Generation Status */}
      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>✨ Recipe Generation Complete</Text>
        <Text style={styles.statusDescription}>
          Generated 24 personalized recipes based on your ingredients and 7-day meal plan for 2 people.
        </Text>
        <View style={styles.statusMetrics}>
          <Text style={styles.metricText}>⏱️ Avg. 25 min cook time</Text>
          <Text style={styles.metricText}>👥 2 servings each</Text>
          <Text style={styles.metricText}>👨‍🍳 Balanced nutrition</Text>
          <Text style={styles.metricText}>✨ 95% ingredient match</Text>
        </View>
      </View>

      {/* Recipe Grid */}
      <View style={styles.recipesSection}>
        <Text style={styles.recipesTitle}>Your Recipes ({mockRecipes.length})</Text>
        
        {mockRecipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            style={styles.recipeCard}
            onPress={() => setSelectedRecipe(recipe)}
          >
            <View style={styles.recipeHeader}>
              <View style={styles.recipeHeaderText}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeRating}>⭐ {recipe.rating}</Text>
              </View>
              <View
                style={[
                  styles.difficultyBadge,
                  { backgroundColor: getDifficultyColor(recipe.difficulty) },
                ]}
              >
                <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
              </View>
            </View>

            <Text style={styles.recipeDescription}>{recipe.description}</Text>

            <View style={styles.recipeMetrics}>
              <Text style={styles.metricItem}>⏱️ {recipe.cookTime} min</Text>
              <Text style={styles.metricItem}>👥 {recipe.servings} servings</Text>
              <Text style={styles.metricItem}>{recipe.mealType}</Text>
            </View>

            <View style={styles.recipeTags}>
              {recipe.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{recipe.nutrition.calories}</Text>
                <Text style={styles.nutritionLabel}>cal</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{recipe.nutrition.protein}g</Text>
                <Text style={styles.nutritionLabel}>protein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{recipe.nutrition.carbs}g</Text>
                <Text style={styles.nutritionLabel}>carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{recipe.nutrition.fat}g</Text>
                <Text style={styles.nutritionLabel}>fat</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>👨‍🍳 View Recipe</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recipe Modal */}
      <Modal visible={!!selectedRecipe} animationType="slide" onRequestClose={() => setSelectedRecipe(null)}>
        {selectedRecipe && (
          <ScrollView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedRecipe.title}</Text>
              <TouchableOpacity onPress={() => setSelectedRecipe(null)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDescription}>{selectedRecipe.description}</Text>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Ingredients</Text>
              {selectedRecipe.ingredients.map((ingredient, idx) => (
                <Text key={idx} style={styles.modalListItem}>• {ingredient}</Text>
              ))}
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Instructions</Text>
              {selectedRecipe.instructions.map((instruction, idx) => (
                <Text key={idx} style={styles.modalListItem}>
                  {idx + 1}. {instruction}
                </Text>
              ))}
            </View>

            <View style={styles.modalSection}>
              <Text style={styles.modalSectionTitle}>Nutrition Information</Text>
              <Text style={styles.modalListItem}>Calories: {selectedRecipe.nutrition.calories}</Text>
              <Text style={styles.modalListItem}>Protein: {selectedRecipe.nutrition.protein}g</Text>
              <Text style={styles.modalListItem}>Carbs: {selectedRecipe.nutrition.carbs}g</Text>
              <Text style={styles.modalListItem}>Fat: {selectedRecipe.nutrition.fat}g</Text>
            </View>
          </ScrollView>
        )}
      </Modal>
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
  statusCard: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 8,
    padding: 16,
    margin: 16,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 12,
  },
  statusMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricText: {
    fontSize: 12,
    color: '#6b7280',
  },
  recipesSection: {
    padding: 16,
  },
  recipesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 16,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recipeHeaderText: {
    flex: 1,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  recipeRating: {
    fontSize: 13,
    color: '#6b7280',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  recipeDescription: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 12,
  },
  recipeMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metricItem: {
    fontSize: 12,
    color: '#6b7280',
  },
  recipeTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 11,
    color: '#1f2937',
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginBottom: 12,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  nutritionLabel: {
    fontSize: 11,
    color: '#6b7280',
  },
  viewButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 32,
    color: '#6b7280',
  },
  modalDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  modalListItem: {
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 8,
    lineHeight: 20,
  },
});
