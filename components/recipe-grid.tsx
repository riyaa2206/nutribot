"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RecipeModal } from "@/components/recipe-modal"
import { Clock, Users, Star, ChefHat } from "lucide-react"

interface Recipe {
  id: string
  title: string
  description: string
  cookTime: number
  servings: number
  difficulty: "Easy" | "Medium" | "Hard"
  mealType: string
  rating: number
  image: string
  ingredients: string[]
  instructions: string[]
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  tags: string[]
}

const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Mediterranean Chicken Bowl",
    description: "Fresh and healthy bowl with grilled chicken, quinoa, and Mediterranean vegetables",
    cookTime: 25,
    servings: 2,
    difficulty: "Easy",
    mealType: "Lunch",
    rating: 4.8,
    image: "/mediterranean-chicken-bowl.jpg",
    ingredients: [
      "2 chicken breasts",
      "1 cup quinoa",
      "1 cucumber",
      "2 tomatoes",
      "1/2 red onion",
      "1/4 cup olive oil",
      "2 tbsp lemon juice",
      "Fresh herbs",
    ],
    instructions: [
      "Cook quinoa according to package instructions",
      "Season and grill chicken breasts for 6-7 minutes per side",
      "Dice cucumber, tomatoes, and red onion",
      "Whisk olive oil with lemon juice and herbs",
      "Slice chicken and serve over quinoa with vegetables",
      "Drizzle with dressing and enjoy",
    ],
    nutrition: { calories: 485, protein: 35, carbs: 42, fat: 18 },
    tags: ["High Protein", "Mediterranean", "Gluten-Free"],
  },
  {
    id: "2",
    title: "Veggie-Packed Breakfast Scramble",
    description: "Nutritious morning meal with eggs, spinach, bell peppers, and cheese",
    cookTime: 15,
    servings: 2,
    difficulty: "Easy",
    mealType: "Breakfast",
    rating: 4.6,
    image: "/vegetable-breakfast-scramble-eggs.jpg",
    ingredients: [
      "4 large eggs",
      "2 cups fresh spinach",
      "1 bell pepper",
      "1/4 cup cheese",
      "2 tbsp olive oil",
      "Salt and pepper",
      "Fresh herbs",
    ],
    instructions: [
      "Heat olive oil in a large pan",
      "Sauté diced bell pepper for 3 minutes",
      "Add spinach and cook until wilted",
      "Beat eggs and pour into pan",
      "Scramble gently, adding cheese at the end",
      "Season with salt, pepper, and herbs",
    ],
    nutrition: { calories: 320, protein: 22, carbs: 8, fat: 24 },
    tags: ["Vegetarian", "Quick", "High Protein"],
  },
  {
    id: "3",
    title: "Asian-Style Salmon with Rice",
    description: "Glazed salmon fillet with steamed vegetables and jasmine rice",
    cookTime: 30,
    servings: 2,
    difficulty: "Medium",
    mealType: "Dinner",
    rating: 4.9,
    image: "/asian-glazed-salmon-with-rice.jpg",
    ingredients: [
      "2 salmon fillets",
      "1 cup jasmine rice",
      "2 cups broccoli",
      "2 tbsp soy sauce",
      "1 tbsp honey",
      "1 tsp ginger",
      "2 cloves garlic",
      "Sesame seeds",
    ],
    instructions: [
      "Cook jasmine rice according to package instructions",
      "Mix soy sauce, honey, ginger, and garlic for glaze",
      "Pan-sear salmon for 4 minutes per side",
      "Brush with glaze in last 2 minutes",
      "Steam broccoli until tender-crisp",
      "Serve salmon over rice with vegetables",
    ],
    nutrition: { calories: 520, protein: 38, carbs: 45, fat: 22 },
    tags: ["High Protein", "Omega-3", "Asian"],
  },
  {
    id: "4",
    title: "Quinoa Power Salad",
    description: "Nutrient-dense salad with quinoa, mixed greens, nuts, and tahini dressing",
    cookTime: 20,
    servings: 2,
    difficulty: "Easy",
    mealType: "Lunch",
    rating: 4.7,
    image: "/quinoa-power-salad-with-nuts.jpg",
    ingredients: [
      "1 cup quinoa",
      "4 cups mixed greens",
      "1/4 cup almonds",
      "1/4 cup dried cranberries",
      "2 tbsp tahini",
      "1 lemon",
      "1 tbsp olive oil",
      "Salt to taste",
    ],
    instructions: [
      "Cook quinoa and let cool completely",
      "Toast almonds in a dry pan until fragrant",
      "Whisk tahini with lemon juice and olive oil",
      "Combine quinoa with mixed greens",
      "Add almonds and cranberries",
      "Toss with dressing and serve",
    ],
    nutrition: { calories: 420, protein: 16, carbs: 52, fat: 18 },
    tags: ["Vegan", "High Fiber", "Superfood"],
  },
  {
    id: "5",
    title: "Hearty Lentil Soup",
    description: "Warming and nutritious soup with red lentils, vegetables, and aromatic spices",
    cookTime: 35,
    servings: 4,
    difficulty: "Easy",
    mealType: "Dinner",
    rating: 4.5,
    image: "/hearty-red-lentil-soup-vegetables.jpg",
    ingredients: [
      "1 cup red lentils",
      "2 carrots",
      "2 celery stalks",
      "1 onion",
      "3 cups vegetable broth",
      "2 tsp cumin",
      "1 tsp turmeric",
      "2 tbsp olive oil",
    ],
    instructions: [
      "Heat olive oil and sauté diced onion",
      "Add carrots and celery, cook for 5 minutes",
      "Stir in spices and cook for 1 minute",
      "Add lentils and broth, bring to boil",
      "Simmer for 20-25 minutes until lentils are soft",
      "Season with salt and pepper to taste",
    ],
    nutrition: { calories: 280, protein: 18, carbs: 45, fat: 6 },
    tags: ["Vegan", "High Fiber", "Comfort Food"],
  },
  {
    id: "6",
    title: "Greek Yogurt Berry Parfait",
    description: "Layered parfait with Greek yogurt, fresh berries, and crunchy granola",
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    mealType: "Breakfast",
    rating: 4.4,
    image: "/greek-yogurt-berry-parfait-granola.jpg",
    ingredients: [
      "2 cups Greek yogurt",
      "1 cup mixed berries",
      "1/2 cup granola",
      "2 tbsp honey",
      "1 tsp vanilla",
      "Mint leaves",
    ],
    instructions: [
      "Mix Greek yogurt with vanilla and half the honey",
      "Layer yogurt in glasses or bowls",
      "Add a layer of mixed berries",
      "Sprinkle granola on top",
      "Repeat layers as desired",
      "Drizzle with remaining honey and garnish with mint",
    ],
    nutrition: { calories: 340, protein: 20, carbs: 45, fat: 8 },
    tags: ["Vegetarian", "High Protein", "Quick"],
  },
]

export function RecipeGrid() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Your Recipes ({mockRecipes.length})</h2>
          <Badge variant="secondary" className="px-3 py-1">
            Showing all recipes
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockRecipes.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2">{recipe.title}</CardTitle>
                  <div className="flex items-center gap-1 ml-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{recipe.rating}</span>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">{recipe.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.cookTime} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {recipe.mealType}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1">
                  {recipe.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {recipe.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{recipe.tags.length - 2}
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2 text-xs text-center">
                  <div>
                    <div className="font-medium">{recipe.nutrition.calories}</div>
                    <div className="text-muted-foreground">cal</div>
                  </div>
                  <div>
                    <div className="font-medium">{recipe.nutrition.protein}g</div>
                    <div className="text-muted-foreground">protein</div>
                  </div>
                  <div>
                    <div className="font-medium">{recipe.nutrition.carbs}g</div>
                    <div className="text-muted-foreground">carbs</div>
                  </div>
                  <div>
                    <div className="font-medium">{recipe.nutrition.fat}g</div>
                    <div className="text-muted-foreground">fat</div>
                  </div>
                </div>

                <Button className="w-full" onClick={() => setSelectedRecipe(recipe)} variant="outline">
                  <ChefHat className="mr-2 h-4 w-4" />
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} isOpen={!!selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </>
  )
}
