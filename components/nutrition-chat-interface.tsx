"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, Send, Bot, User, Sparkles, ChefHat, Calendar } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "text" | "recipe" | "suggestion" | "plan"
  data?: any
}

const quickPrompts = [
  "What can I make with chicken, rice, and broccoli?",
  "I need a high-protein breakfast recipe",
  "Help me plan meals for weight loss",
  "What are some healthy snack options?",
  "I'm vegetarian, suggest a dinner recipe",
  "How can I meal prep for the week?",
]

export function NutritionChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI nutrition assistant. I can help you with meal planning, recipe suggestions, nutrition advice, and dietary guidance. What would you like to know about today?",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage
    if (!messageToSend.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI processing with more sophisticated responses
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageToSend)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()

    // Recipe suggestions
    if (lowerMessage.includes("recipe") || lowerMessage.includes("make") || lowerMessage.includes("cook")) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Based on your request, I found some great recipe options! Here are my top recommendations that match your ingredients and preferences. Each recipe includes detailed nutrition information and cooking instructions.`,
        sender: "ai",
        timestamp: new Date(),
        type: "recipe",
        data: {
          recipes: [
            {
              name: "Mediterranean Chicken Bowl",
              cookTime: "25 min",
              calories: 485,
              protein: "35g",
              difficulty: "Easy",
            },
            {
              name: "Veggie Stir-Fry with Rice",
              cookTime: "20 min",
              calories: 320,
              protein: "12g",
              difficulty: "Easy",
            },
          ],
        },
      }
    }

    // Meal planning
    if (lowerMessage.includes("plan") || lowerMessage.includes("week") || lowerMessage.includes("meal prep")) {
      return {
        id: (Date.now() + 1).toString(),
        content: `I'd be happy to help you create a meal plan! Based on your goals and preferences, here's a structured approach to meal planning that will save you time and ensure balanced nutrition throughout the week.`,
        sender: "ai",
        timestamp: new Date(),
        type: "plan",
        data: {
          tips: [
            "Plan 3 main meals + 2 healthy snacks per day",
            "Prep proteins in bulk (chicken, beans, tofu)",
            "Choose 2-3 base grains (quinoa, rice, oats)",
            "Include 5+ different vegetables throughout the week",
            "Prepare overnight oats or smoothie packs for quick breakfasts",
          ],
        },
      }
    }

    // Weight loss advice
    if (lowerMessage.includes("weight loss") || lowerMessage.includes("lose weight") || lowerMessage.includes("diet")) {
      return {
        id: (Date.now() + 1).toString(),
        content: `For healthy weight management, focus on creating a sustainable calorie deficit through nutritious, filling foods. Here are evidence-based strategies that work well for most people while maintaining energy and satisfaction.`,
        sender: "ai",
        timestamp: new Date(),
        type: "suggestion",
        data: {
          suggestions: [
            "Prioritize protein (0.8-1g per lb body weight) to maintain muscle",
            "Fill half your plate with non-starchy vegetables",
            "Choose complex carbs like quinoa, sweet potatoes, oats",
            "Include healthy fats from nuts, avocado, olive oil",
            "Stay hydrated - aim for 8+ glasses of water daily",
            "Practice portion control using smaller plates",
          ],
        },
      }
    }

    // High protein requests
    if (lowerMessage.includes("protein") || lowerMessage.includes("muscle")) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Great choice focusing on protein! Adequate protein intake supports muscle maintenance, satiety, and metabolic health. Here are excellent high-protein options that are both delicious and nutritious.`,
        sender: "ai",
        timestamp: new Date(),
        type: "suggestion",
        data: {
          suggestions: [
            "Greek yogurt with berries and nuts (20g protein)",
            "Chicken breast with quinoa and vegetables (35g protein)",
            "Lentil soup with whole grain bread (18g protein)",
            "Salmon with sweet potato (30g protein)",
            "Protein smoothie with banana and spinach (25g protein)",
            "Eggs with avocado toast (15g protein)",
          ],
        },
      }
    }

    // Vegetarian requests
    if (lowerMessage.includes("vegetarian") || lowerMessage.includes("vegan") || lowerMessage.includes("plant")) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Plant-based eating can be incredibly nutritious and delicious! Here are some fantastic vegetarian options that provide complete nutrition and amazing flavors. I'll make sure you get all essential nutrients.`,
        sender: "ai",
        timestamp: new Date(),
        type: "recipe",
        data: {
          recipes: [
            {
              name: "Quinoa Buddha Bowl",
              cookTime: "30 min",
              calories: 420,
              protein: "16g",
              difficulty: "Easy",
            },
            {
              name: "Lentil Curry with Rice",
              cookTime: "35 min",
              calories: 380,
              protein: "18g",
              difficulty: "Medium",
            },
          ],
        },
      }
    }

    // Default response
    return {
      id: (Date.now() + 1).toString(),
      content: `That's a great question! I can help you with meal planning, recipe suggestions, nutrition advice, and dietary guidance. Could you tell me more about your specific goals or what you'd like to focus on? For example, are you looking for recipes, meal planning help, or nutrition advice?`,
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    }
  }

  const renderMessage = (message: Message) => {
    const isUser = message.sender === "user"

    return (
      <div key={message.id} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} mb-4`}>
        <div className={`flex gap-3 max-w-[85%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <div
            className={`p-2 rounded-full flex-shrink-0 ${
              isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
            }`}
          >
            {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
          </div>

          <div
            className={`p-4 rounded-lg ${
              isUser
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground border border-border"
            }`}
          >
            <p className="text-sm leading-relaxed">{message.content}</p>

            {/* Special message types */}
            {message.type === "recipe" && message.data?.recipes && (
              <div className="mt-3 space-y-2">
                {message.data.recipes.map((recipe: any, index: number) => (
                  <div key={index} className="bg-background/10 p-3 rounded border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{recipe.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {recipe.difficulty}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-xs">
                      <span>⏱️ {recipe.cookTime}</span>
                      <span>🔥 {recipe.calories} cal</span>
                      <span>💪 {recipe.protein}</span>
                    </div>
                  </div>
                ))}
                <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                  <ChefHat className="mr-2 h-3 w-3" />
                  View Full Recipes
                </Button>
              </div>
            )}

            {message.type === "suggestion" && message.data?.suggestions && (
              <div className="mt-3">
                <ul className="space-y-1 text-sm">
                  {message.data.suggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-current rounded-full mt-2 flex-shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {message.type === "plan" && message.data?.tips && (
              <div className="mt-3">
                <div className="space-y-2">
                  {message.data.tips.map((tip: string, index: number) => (
                    <div key={index} className="bg-background/10 p-2 rounded text-sm">
                      <span className="font-medium">{index + 1}.</span> {tip}
                    </div>
                  ))}
                </div>
                <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                  <Calendar className="mr-2 h-3 w-3" />
                  Create Meal Plan
                </Button>
              </div>
            )}

            <div className="text-xs opacity-70 mt-2">
              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5" />
            Quick Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-2">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(prompt)}
                className="justify-start text-left h-auto p-3 bg-transparent"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Nutrition Assistant Chat
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map(renderMessage)}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-full bg-secondary text-secondary-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="p-4 rounded-lg bg-secondary text-secondary-foreground border border-border">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          <div className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me about nutrition, recipes, meal planning..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isTyping}
                className="flex-1"
              />
              <Button onClick={() => handleSendMessage()} disabled={isTyping || !inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Ask about recipes, meal planning, nutrition advice, or dietary guidance
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
