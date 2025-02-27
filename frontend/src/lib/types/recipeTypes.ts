import { User } from "./authTypes";

export type SubmitRecipe = {
  title: string;
  description: string;
  origin_country: string;
  steps: Step[];
  ingredients: Ingredient[];
  images: File[] | null;
};

export type Ingredient = {
  name: string;
  quantity: string;
};

export type Step = {
  step_num: Number;
  description: string;
};

export type ListRecipe = {
  id: number;
  title: string;
  description: string;
  origin_country: string;
  images: string[];
  chef: User;
};

export type FullRecipe = {};
