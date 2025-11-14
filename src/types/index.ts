export interface MealPlanPreferences {
  goal: string;
  duration: number;
  servings: number;
  skillLevel: string;
  groceries: string[];
  mealTypes: string[];
  cookingTime: string;
  dietaryRestrictions: string[];
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
