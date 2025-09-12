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

        

        {/* Main Input Form */}
        <GroceryInputForm />
      </div>
    </div>
  )
}
