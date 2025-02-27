export type SubmitRecipe = {
  title: string
  description: string
  origin_country: string
  steps: Step[]
  ingredients: Ingredient[]
  images: File[] | null

}

export type Ingredient = {
  name: string
  quantity: string
}

export type Step = {
  step_num: Number
  description: string
}

export type ListRecipe = {

}

export type FullRecipe = {

}
