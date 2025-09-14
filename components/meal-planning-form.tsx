"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Target, ChefHat, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import { usePrefs, type MealPlanPreferences } from "@/context/PrefsContext"

const NUTRITION_GOALS = [
  {
    id: "balanced",
    title: "Balanced Nutrition",
    description: "Well-rounded meals with all food groups"
  },
  {
    id: "weight-loss",
    title: "Weight Management",
    description: "Lower calorie, high protein meals"
  },
  {
    id: "muscle-gain",
    title: "Muscle Building",
    description: "High protein, nutrient-dense meals"
  },
  {
    id: "energy",
    title: "Energy & Performance",
    description: "Sustained energy for active lifestyles"
  }
]

const MEAL_TYPES = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "snacks", label: "Snacks" },
]

const DIETARY_RESTRICTIONS = [
  "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free",
  "Keto", "Paleo", "Low-Carb", "Nut-Free"
]

interface SliderSectionProps {
  label: string
  value: number
  onChange: (value: number) => void
  max: number
  min: number
  unit: string
  labels: string[]
}

function SliderSection({ label, value, onChange, max, min, unit, labels }: SliderSectionProps) {
  return (
    <div className="space-y-3">
      <Label>{label}: {value} {unit}</Label>
      <Slider
        value={[value]}
        onValueChange={(value) => onChange(value[0])}
        max={max}
        min={min}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        {labels.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
    </div>
  )
}

interface CheckboxGroupProps {
  title: string
  items: Array<{ id: string; label: string }> | string[]
  selectedItems: string[]
  onItemChange: (item: string, checked: boolean) => void
}

function CheckboxGroup({ title, items, selectedItems, onItemChange }: CheckboxGroupProps) {
  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">{title}</Label>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => {
          const id = typeof item === 'string' ? item : item.id
          const label = typeof item === 'string' ? item : item.label
          return (
            <div key={id} className="flex items-center space-x-2">
              <Checkbox
                id={id}
                className="border-black border-2"
                checked={selectedItems.includes(id)}
                onCheckedChange={(checked) => onItemChange(id, checked as boolean)}
              />
              <Label htmlFor={id}>{label}</Label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function MealPlanningForm() {
  const { preferences, setPreferences } = usePrefs()

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const updatePreference = <K extends keyof MealPlanPreferences>(
    key: K,
    value: MealPlanPreferences[K]
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const handleDietaryRestrictionChange = (restriction: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      dietaryRestrictions: checked
        ? [...prev.dietaryRestrictions, restriction]
        : prev.dietaryRestrictions.filter((r) => r !== restriction),
    }))
  }

  const handleMealTypeChange = (mealType: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      mealTypes: checked ? [...prev.mealTypes, mealType] : prev.mealTypes.filter((m) => m !== mealType),
    }))
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return preferences.duration > 0 && preferences.servings > 0
      case 2:
        return preferences.goal !== ""
      case 3:
        return preferences.mealTypes.length > 0
      case 4:
        return preferences.cookingTime !== "" && preferences.skillLevel !== ""
      default:
        return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Duration & Servings
              </CardTitle>
              <CardDescription>How long do you want to plan for and how many people?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SliderSection
                label={`Planning Duration`}
                value={preferences.duration}
                onChange={(value) => updatePreference('duration', value)}
                max={28}
                min={1}
                unit={preferences.duration === 1 ? "day" : "days"}
                labels={["1 day", "2 weeks", "4 weeks"]}
              />

              <SliderSection
                label="Number of Servings"
                value={preferences.servings}
                onChange={(value) => updatePreference('servings', value)}
                max={8}
                min={1}
                unit="people"
                labels={["1 person", "4 people", "8 people"]}
              />
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Nutrition Goals
              </CardTitle>
              <CardDescription>What's your primary nutrition objective?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={preferences.goal}
                onValueChange={(value) => updatePreference('goal', value)}
                className="space-y-4"
              >
                {NUTRITION_GOALS.map((goal) => (
                  <div key={goal.id} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-secondary/50">
                    <RadioGroupItem className="border-black border-2" value={goal.id} id={goal.id} />
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => updatePreference('goal', goal.id)}
                    >
                      <Label htmlFor={goal.id} className="font-medium cursor-pointer">
                        {goal.title}
                      </Label>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                Meal Preferences
              </CardTitle>
              <CardDescription>Select meal types and any dietary restrictions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <CheckboxGroup
                title="Meal Types to Include"
                items={MEAL_TYPES}
                selectedItems={preferences.mealTypes}
                onItemChange={handleMealTypeChange}
              />

              <Separator />

              <CheckboxGroup
                title="Dietary Restrictions (Optional)"
                items={DIETARY_RESTRICTIONS}
                selectedItems={preferences.dietaryRestrictions}
                onItemChange={handleDietaryRestrictionChange}
              />
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Cooking Preferences
              </CardTitle>
              <CardDescription>Tell us about your cooking style and available time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Available Cooking Time</Label>
                <Select
                  value={preferences.cookingTime}
                  onValueChange={(value) => updatePreference('cookingTime', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cooking time preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quick">Quick (15-30 minutes)</SelectItem>
                    <SelectItem value="moderate">Moderate (30-60 minutes)</SelectItem>
                    <SelectItem value="extended">Extended (60+ minutes)</SelectItem>
                    <SelectItem value="mixed">Mixed (variety of times)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Cooking Skill Level</Label>
                <Select
                  value={preferences.skillLevel}
                  onValueChange={(value) => updatePreference('skillLevel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your cooking skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (simple recipes)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (moderate complexity)</SelectItem>
                    <SelectItem value="advanced">Advanced (complex techniques)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Current Step */}
      {renderStep()}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        {currentStep < totalSteps ? (
          <Button onClick={() => setCurrentStep((prev) => prev + 1)} disabled={!canProceedToNext()}>
            Next Step
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Link href="/recipes">
            <Button disabled={!canProceedToNext()}>
              Generate Meal Plan
              <ChefHat className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      {currentStep > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Planning Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Duration:</span> {preferences.duration} days
              </div>
              <div>
                <span className="font-medium">Servings:</span> {preferences.servings} people
              </div>
              {preferences.goal && (
                <div>
                  <span className="font-medium">Goal:</span> {preferences.goal.replace("-", " ")}
                </div>
              )}
              {preferences.mealTypes.length > 0 && (
                <div className="md:col-span-2">
                  <span className="font-medium">Meals:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {preferences.mealTypes.map((meal) => (
                      <Badge key={meal} variant="secondary" className="text-xs">
                        {meal}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {preferences.dietaryRestrictions.length > 0 && (
                <div className="md:col-span-2">
                  <span className="font-medium">Dietary Restrictions:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {preferences.dietaryRestrictions.map((restriction) => (
                      <Badge key={restriction} variant="outline" className="text-xs">
                        {restriction}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
