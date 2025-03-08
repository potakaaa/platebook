import { BasicUser } from "./authTypes";

export type SubmitRecipe = {
  title: string;
  description: string;
  origin_country: string;
  steps: Step[];
  ingredients: Ingredient[];
  images: File[] | null;
};

export type RecipeImage = {
  id?: string;
  image_url?: string;
  image?: File;
};

export type EditRecipe = {
  title: string;
  description: string;
  origin_country: string;
  steps: Step[];
  ingredients: Ingredient[];
  images: RecipeImage[];
};

export type SubmitEditRecipe = {
  title: string;
  description: string;
  origin_country: string;
  steps: Step[];
  ingredients: Ingredient[];
  images: RecipeImage[];
};

export type Ingredient = {
  id?: string;
  name: string;
  quantity: string;
};

export type Step = {
  id?: string;
  step_num: number;
  description: string;
};

export type ListRecipe = {
  id: number;
  title: string;
  description: string;
  origin_country: string;
  images: RecipeImage[];
  chef: BasicUser;
  likes: number;
  shares: number;
  comments: number;
  isPlateListed: boolean;
  isLiked: boolean;
  isShared: boolean;
};

export type FullRecipe = {
  id: number;
  title: string;
  description: string;
  origin_country: string;
  images: RecipeImage[];
  chef: BasicUser;
  steps: Step[];
  ingredients: Ingredient[];

};
