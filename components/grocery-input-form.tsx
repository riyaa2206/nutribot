"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PhotoUpload } from "@/components/photo-upload"
import { AIChat } from "@/components/ai-chat"
import { Plus, X, ShoppingCart, ArrowRight, Camera, MessageCircle, Type } from "lucide-react"
import Link from "next/link"

export function GroceryInputForm() {
  const [textInput, setTextInput] = useState("")
  const [groceryItems, setGroceryItems] = useState<string[]>([])
  const [newItem, setNewItem] = useState("")
  const [activeTab, setActiveTab] = useState("")

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      const items = textInput
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0)

      setGroceryItems((prev) => [...prev, ...items])
      setTextInput("")
    }
  }

  const handleAddSingleItem = () => {
    if (newItem.trim()) {
      setGroceryItems((prev) => [...prev, newItem.trim()])
      setNewItem("")
    }
  }

  const handleRemoveItem = (index: number) => {
    setGroceryItems((prev) => prev.filter((_, i) => i !== index))
  }

  const handlePhotoItems = (items: string[]) => {
    setGroceryItems((prev) => [...prev, ...items])
  }

  const handleChatItems = (items: string[]) => {
    setGroceryItems((prev) => [...prev, ...items])
  }

  return (
    <div className="space-y-8">
      {/* Input Methods Overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="border-border hover:shadow-lg transition-shadow" onClick={() => setActiveTab("text")}>
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

        <Card className="border-border hover:shadow-lg transition-shadow" onClick={() => setActiveTab("photo")}>
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

        <Card className="border-border hover:shadow-lg transition-shadow" onClick={() => setActiveTab("chat")}>
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
      {/* Input Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Add Your Ingredients
          </CardTitle>
          <CardDescription>Choose your preferred method to input your grocery and pantry items.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full">

            {activeTab === 'text' ?
              <div className="space-y-4">
                <div>
                  <Label htmlFor="grocery-list">Grocery List</Label>
                  <Textarea
                    id="grocery-list"
                    placeholder="Enter your grocery items separated by commas or new lines:&#10;&#10;Apples, Bananas, Chicken breast&#10;Rice&#10;Broccoli&#10;Olive oil"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="min-h-32"
                  />
                </div>
                <Button onClick={handleTextSubmit} className="w-full">
                  Add Items from List
                </Button>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add single item..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSingleItem()}
                  />
                  <Button onClick={handleAddSingleItem} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              : activeTab === 'photo' ? <PhotoUpload onItemsDetected={handlePhotoItems} /> : activeTab === 'chat' ? <AIChat onItemsAdded={handleChatItems} /> : null
            }
          </div>
        </CardContent>
      </Card>

      {/* Current Items Display */}
      {groceryItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Ingredients ({groceryItems.length} items)</CardTitle>
            <CardDescription>Review your ingredients before proceeding to meal planning.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-6">
              {groceryItems.map((item, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                  {item}
                  <button onClick={() => handleRemoveItem(index)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-4">
              <Button onClick={() => setGroceryItems([])} variant="outline">
                Clear All
              </Button>
              <Link href="/meal-planning" className="flex-1">
                <Button className="w-full">
                  Continue to Meal Planning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State
      {groceryItems.length === 0 && (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No ingredients added yet</h3>
            <p className="text-muted-foreground text-center">
              Use one of the methods above to add your grocery and pantry items.
            </p>
          </CardContent>
        </Card>
      )} */}
    </div>
  )
}
