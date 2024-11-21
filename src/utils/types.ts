export interface Dripper {
    name: string;
    image: string;
  }
  
  export interface RecipeVar {
    ratio: number;
    water: number;
    time: string[];
    pour: ((water: number) => number[])[];
  }
  
  export interface CardRecipe {
    id: string;
    name: string;
    recipeName: string;
    image: string;
    dripper: Dripper;
    description: string;
    recipeVar: RecipeVar; // Add recipeVar to CardRecipe
  }