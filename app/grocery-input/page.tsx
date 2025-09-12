import { Navigation } from "@/components/navigation"
import { GroceryInputForm } from "@/components/grocery-input-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Camera, MessageCircle, Type } from "lucide-react"

export default function GroceryInputPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl">
              <ShoppingCart className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Add Your Groceries & Pantry Items
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose your preferred method to input ingredients. We support text lists, photo uploads, and natural
            conversation.
          </p>
        </div>

        {/* Input Methods Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mx-auto mb-4">
                <Type className="h-8 w-8" />
              </div>
              <CardTitle className="text-lg">Text Input</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Type or paste your grocery list. Separate items with commas or new lines.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="bg-accent/10 text-accent p-3 rounded-lg w-fit mx-auto mb-4">
                <Camera className="h-8 w-8" />
              </div>
              <CardTitle className="text-lg">Photo Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Take a photo of your grocery list or pantry items for automatic recognition.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mx-auto mb-4">
                <MessageCircle className="h-8 w-8" />
              </div>
              <CardTitle className="text-lg">AI Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Describe what you have in natural language and let our AI understand.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Main Input Form */}
        <GroceryInputForm />
      </div>
    </div>
  )
}
