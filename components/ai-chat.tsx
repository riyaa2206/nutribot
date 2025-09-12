"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface AIChatProps {
  onItemsAdded: (items: string[]) => void
}

export function AIChat({ onItemsAdded }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm your nutrition assistant. Tell me what groceries or pantry items you have, and I'll help organize them for meal planning. You can describe them naturally - like 'I have some chicken, rice, and vegetables in my fridge'.",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI processing
    setTimeout(() => {
      // Mock AI response with extracted items
      const mockExtractedItems = extractItemsFromMessage(inputMessage)

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I found these items: ${mockExtractedItems.join(", ")}. I've added them to your grocery list! Is there anything else you'd like to add?`,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)

      if (mockExtractedItems.length > 0) {
        onItemsAdded(mockExtractedItems)
      }
    }, 1500)
  }

  const extractItemsFromMessage = (message: string): string[] => {
    // Simple mock extraction - in real app this would use NLP
    const commonItems = [
      "chicken",
      "beef",
      "pork",
      "fish",
      "salmon",
      "tuna",
      "rice",
      "pasta",
      "bread",
      "quinoa",
      "oats",
      "broccoli",
      "spinach",
      "carrots",
      "tomatoes",
      "onions",
      "garlic",
      "apples",
      "bananas",
      "oranges",
      "berries",
      "grapes",
      "milk",
      "cheese",
      "yogurt",
      "eggs",
      "butter",
      "olive oil",
      "salt",
      "pepper",
      "herbs",
      "spices",
    ]

    const lowerMessage = message.toLowerCase()
    return commonItems.filter((item) => lowerMessage.includes(item))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            AI Nutrition Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80 w-full border rounded-lg p-4 mb-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`p-2 rounded-full ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                    >
                      {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="flex gap-2">
                    <div className="p-2 rounded-full bg-secondary text-secondary-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="p-3 rounded-lg bg-secondary text-secondary-foreground">
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

          <div className="flex gap-2">
            <Input
              placeholder="Tell me what groceries you have..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isTyping}
            />
            <Button onClick={handleSendMessage} disabled={isTyping || !inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
