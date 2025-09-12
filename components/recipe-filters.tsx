"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Filter, RotateCcw } from "lucide-react"

export function RecipeFilters() {
  const [cookTime, setCookTime] = useState([60])
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("")

  const handleMealTypeChange = (mealType: string, checked: boolean) => {
    setSelectedMealTypes((prev) => (checked ? [...prev, mealType] : prev.filter((type) => type !== mealType)))
  }

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    setSelectedDifficulty((prev) => (checked ? [...prev, difficulty] : prev.filter((diff) => diff !== difficulty)))
  }

  const resetFilters = () => {
    setCookTime([60])
    setSelectedMealTypes([])
    setSelectedDifficulty([])
    setSortBy("")
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter Recipes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sort By */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Sort By</Label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Choose sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="cook-time">Cook Time</SelectItem>
              <SelectItem value="nutrition">Nutrition Score</SelectItem>
              <SelectItem value="ingredients">Ingredient Match</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Cook Time */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Max Cook Time: {cookTime[0]} min</Label>
          <Slider value={cookTime} onValueChange={setCookTime} max={120} min={15} step={15} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>15 min</span>
            <span>60 min</span>
            <span>120 min</span>
          </div>
        </div>

        <Separator />

        {/* Meal Types */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Meal Type</Label>
          <div className="space-y-2">
            {["Breakfast", "Lunch", "Dinner", "Snack"].map((mealType) => (
              <div key={mealType} className="flex items-center space-x-2">
                <Checkbox
                  id={mealType}
                  checked={selectedMealTypes.includes(mealType)}
                  onCheckedChange={(checked) => handleMealTypeChange(mealType, checked as boolean)}
                />
                <Label htmlFor={mealType} className="text-sm">
                  {mealType}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Difficulty */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Difficulty</Label>
          <div className="space-y-2">
            {["Easy", "Medium", "Hard"].map((difficulty) => (
              <div key={difficulty} className="flex items-center space-x-2">
                <Checkbox
                  id={difficulty}
                  checked={selectedDifficulty.includes(difficulty)}
                  onCheckedChange={(checked) => handleDifficultyChange(difficulty, checked as boolean)}
                />
                <Label htmlFor={difficulty} className="text-sm">
                  {difficulty}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Dietary Preferences */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Dietary</Label>
          <div className="space-y-2">
            {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"].map((diet) => (
              <div key={diet} className="flex items-center space-x-2">
                <Checkbox id={diet} />
                <Label htmlFor={diet} className="text-sm">
                  {diet}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <Button variant="outline" onClick={resetFilters} className="w-full bg-transparent">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  )
}
