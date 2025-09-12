import { Navigation } from "@/components/navigation"
import { NutritionChatInterface } from "@/components/nutrition-chat-interface"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Brain, Lightbulb, Target } from "lucide-react"

export default function AIChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl">
              <MessageCircle className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">AI Nutrition Assistant</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Chat with our intelligent nutrition assistant for personalized meal advice, recipe suggestions, and dietary
            guidance tailored to your goals.
          </p>
        </div>

        {/* AI Capabilities */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mx-auto mb-4">
                <Brain className="h-8 w-8" />
              </div>
              <CardTitle className="text-lg">Smart Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Get personalized meal and recipe suggestions based on your ingredients and preferences.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="bg-accent/10 text-accent p-3 rounded-lg w-fit mx-auto mb-4">
                <Lightbulb className="h-8 w-8" />
              </div>
              <CardTitle className="text-lg">Nutrition Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Ask questions about nutrition, dietary restrictions, and healthy eating habits.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mx-auto mb-4">
                <Target className="h-8 w-8" />
              </div>
              <CardTitle className="text-lg">Goal-Oriented Advice</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Receive tailored advice for weight management, muscle building, or general wellness goals.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <NutritionChatInterface />
      </div>
    </div>
  )
}
