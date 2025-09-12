import { Navigation } from "@/components/navigation"
import { InteractiveBackground } from "@/components/interactive-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ShoppingCart, Calendar, ChefHat, MessageCircle, Sparkles, Clock, Users, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative">
      <InteractiveBackground />

      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/20 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary text-primary-foreground p-4 rounded-2xl">
                <Sparkles className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Smart Nutrition Planning with <span className="text-primary">NUTRIBOT</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Transform your grocery list into personalized meal plans. Upload ingredients via text, photo, or chat with
              our AI to get nutritious recipes tailored to your timeframe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/grocery-input">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Start Planning Meals
                  <ChefHat className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/ai-chat">
                <Button size="lg" variant="outline">
                  Chat with AI Assistant
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Everything You Need for Smart Nutrition
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Multiple ways to input your ingredients, intelligent meal planning, and personalized recipe generation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border hover:shadow-lg transition-shadow backdrop-blur-sm bg-background/80">
                <CardHeader className="text-center">
                  <div className="bg-accent/10 text-accent p-3 rounded-lg w-fit mx-auto mb-4">
                    <ShoppingCart className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">Multiple Input Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Add groceries via text, photo upload, or natural conversation with our AI assistant.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow backdrop-blur-sm bg-background/80">
                <CardHeader className="text-center">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mx-auto mb-4">
                    <Calendar className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">Custom Timeframes</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Plan meals for any duration - from a few days to several weeks based on your needs.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow backdrop-blur-sm bg-background/80">
                <CardHeader className="text-center">
                  <div className="bg-accent/10 text-accent p-3 rounded-lg w-fit mx-auto mb-4">
                    <ChefHat className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">Smart Recipe Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Get personalized, nutritious recipes that make the most of your available ingredients.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow backdrop-blur-sm bg-background/80">
                <CardHeader className="text-center">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mx-auto mb-4">
                    <MessageCircle className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">AI-Powered Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Chat naturally about your dietary preferences and get instant nutrition advice.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-secondary/30 py-16 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground p-4 rounded-full mb-4">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">5 min</h3>
                <p className="text-muted-foreground">Average time to generate meal plans</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-accent text-accent-foreground p-4 rounded-full mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">10K+</h3>
                <p className="text-muted-foreground">Recipes in our database</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground p-4 rounded-full mb-4">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">95%</h3>
                <p className="text-muted-foreground">User satisfaction rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Meal Planning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who have revolutionized their nutrition with NUTRIBOT's intelligent meal planning.
            </p>
            <Link href="/grocery-input">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Get Started Now
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
