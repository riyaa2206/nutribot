"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Upload, Loader2, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface PhotoUploadProps {
  onItemsDetected: (items: string[]) => void
}

export function PhotoUpload({ onItemsDetected }: PhotoUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find((file) => file.type.startsWith("image/"))

    if (imageFile) {
      processImage(imageFile)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      processImage(file)
    }
  }

  const processImage = async (file: File) => {
    setIsProcessing(true)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Simulate AI processing (in real app, this would call an AI service)
    setTimeout(() => {
      // Mock detected items - in real app this would be AI-powered
      const mockDetectedItems = [
        "Apples",
        "Bananas",
        "Milk",
        "Bread",
        "Chicken breast",
        "Broccoli",
        "Rice",
        "Olive oil",
        "Tomatoes",
        "Onions",
      ]

      onItemsDetected(mockDetectedItems)
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <Card
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          isProcessing && "pointer-events-none opacity-50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="flex flex-col items-center justify-center py-12">
          {isProcessing ? (
            <>
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Processing Image...</h3>
              <p className="text-muted-foreground text-center">
                Our AI is analyzing your photo to detect grocery items.
              </p>
            </>
          ) : uploadedImage ? (
            <>
              <CheckCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Image Processed!</h3>
              <p className="text-muted-foreground text-center">Items have been detected and added to your list.</p>
            </>
          ) : (
            <>
              <Camera className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Upload Grocery Photo</h3>
              <p className="text-muted-foreground text-center mb-4">
                Drag and drop an image here, or click to select a file
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => document.getElementById("photo-input")?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {uploadedImage && (
        <Card>
          <CardContent className="p-4">
            <img
              src={uploadedImage || "/placeholder.svg"}
              alt="Uploaded grocery photo"
              className="w-full max-w-md mx-auto rounded-lg"
            />
          </CardContent>
        </Card>
      )}

      <input id="photo-input" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </div>
  )
}
