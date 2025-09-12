import { Navigation } from "@/components/navigation"
import { MealPlanningForm } from "@/components/meal-planning-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users, Target } from "lucide-react"

export default function MealPlanningPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl">
              <Calendar className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Plan Your Nutritious Meals
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Set your meal planning preferences and timeframe. We'll generate a personalized nutrition plan based on your
            available ingredients.
          </p>
        </div>

        {/* Planning Benefits */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-3">
              <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mx-auto mb-3">
                <Clock className="h-6 w-6" />
              </div>
              <CardTitle className="text-base">Time Flexible</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-center text-sm">
                Plan for any duration from 1 day to 4 weeks
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-3">
              <div className="bg-accent/10 text-accent p-3 rounded-lg w-fit mx-auto mb-3">
                <Users className="h-6 w-6" />
              </div>
              <CardTitle className="text-base">Family Sized</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-center text-sm">
                Adjust portions for 1-8 people automatically
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-3">
              <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mx-auto mb-3">
                <Target className="h-6 w-6" />
              </div>
              <CardTitle className="text-base">Goal Oriented</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-center text-sm">
                Optimize for health, weight loss, or muscle gain
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-3">
              <div className="bg-accent/10 text-accent p-3 rounded-lg w-fit mx-auto mb-3">
                <Calendar className="h-6 w-6" />
              </div>
              <CardTitle className="text-base">Smart Scheduling</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-center text-sm">
                Balance nutrition across all meals and days
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Main Planning Form */}
        <MealPlanningForm />
      </div>
    </div>
  )
}
