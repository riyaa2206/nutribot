'use client'

import { Navigation } from "@/components/navigation"
import { RecipeGrid } from "@/components/recipe-grid"
import { RecipeFilters } from "@/components/recipe-filters"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat, Sparkles, Clock, Users } from "lucide-react"
import { usePrefs } from "@/context/PrefsContext"
import raxios from "@/lib/axiosHelper"
import { useEffect } from "react"


export default function RecipesPage() {
  const { preferences } = usePrefs()

  const fetchRecipes = async () => {
    try {
      const response = await raxios.post("/meals", {
        preferences,
      })
      console.log("Fetched recipes:", response.data)
    } catch (error) {
      console.error("Error fetching recipes:", error)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl">
              <ChefHat className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Your Personalized Recipe Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            AI-generated recipes tailored to your ingredients, preferences, and nutrition goals. Each recipe is
            optimized for your meal planning timeline.
          </p>
        </div>

        {/* Generation Status */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              Recipe Generation Complete
            </CardTitle>
            <CardDescription>
              Generated 24 personalized recipes based on your ingredients and 7-day meal plan for 2 people.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Avg. 25 min cook time</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>2 servings each</span>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-muted-foreground" />
                <span>Balanced nutrition</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                <span>95% ingredient match</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Recipe Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <RecipeFilters />
          </div>

          {/* Recipe Grid */}
          <div className="lg:col-span-3">
            <RecipeGrid />
          </div>
        </div>
      </div>
    </div>
  )
}
