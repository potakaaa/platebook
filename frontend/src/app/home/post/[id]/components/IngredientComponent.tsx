import type { Ingredient } from '@/lib/types/recipeTypes';
import { CircleSmall } from 'lucide-react'
import React from 'react'


const Ingredient:React.FC<Ingredient> = ({name, quantity}) => {
  return (
    <span className="flex flex-row gap-2 items-center ml-2">
            <CircleSmall className="size-3 sm:size-4 text-primary" />
            <p className="text-sm sm:text-base">{quantity} of {name}</p>
          </span>
  )
}

export default Ingredient