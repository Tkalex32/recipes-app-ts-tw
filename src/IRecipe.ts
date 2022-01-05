export interface IRecipeData {
  recipe: IRecipe;
}

export interface IRecipe {
  image: string;
  label: string;
  uri: string;
  url: string;
  ingredients: IIngredients[];
}

export interface IIngredients {
  food: string;
}
