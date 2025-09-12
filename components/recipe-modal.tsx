"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, Users, Star, ChefHat, ShoppingCart, Heart } from "lucide-react"

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

interface RecipeModalProps {
  recipe: Recipe
  isOpen: boolean
  onClose: () => void
}

export function RecipeModal({ recipe, isOpen, onClose }: RecipeModalProps) {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">{recipe.title}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Recipe Image and Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">{recipe.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{recipe.cookTime} minutes</div>
                      <div className="text-sm text-muted-foreground">Cook time</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{recipe.servings} servings</div>
                      <div className="text-sm text-muted-foreground">Serves</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    <div>
                      <div className="font-medium">{recipe.rating}/5</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{recipe.mealType}</div>
                      <div className="text-sm text-muted-foreground">Meal type</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Nutrition Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Nutrition Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{recipe.nutrition.calories}</div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{recipe.nutrition.protein}g</div>
                  <div className="text-sm text-muted-foreground">Protein</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{recipe.nutrition.carbs}g</div>
                  <div className="text-sm text-muted-foreground">Carbs</div>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{recipe.nutrition.fat}g</div>
                  <div className="text-sm text-muted-foreground">Fat</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Ingredients and Instructions */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Instructions</h3>
                <ol className="space-y-3">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-sm leading-relaxed">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Shopping List
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Heart className="mr-2 h-4 w-4" />
                Save to Favorites
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
