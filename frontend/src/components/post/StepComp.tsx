import { Step } from '@/lib/types/recipeTypes'
import React from 'react'

const StepComp:React.FC<Step> = ({ step_num, description }) => {
  return (
    <span className="text-sm sm:text-base">
    <p className="font-semibold">Step {step_num}:</p> {description}
  </span>
  )
}

export default StepComp