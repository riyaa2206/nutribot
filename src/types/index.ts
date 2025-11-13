export interface MealPlanPreferences {
  duration: number;
  servings: number;
  goal: string;
  dietaryRestrictions: string[];
  mealTypes: string[];
  cookingTime: string;
  skillLevel: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  mealType: string;
  rating: number;
  image: string;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  tags: string[];
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "recipe" | "suggestion" | "plan";
  data?: any;
}
