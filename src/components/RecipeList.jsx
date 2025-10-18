// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllRecipes } from '../api/recipes.js'
import { Recipe } from './Recipe.jsx'

export function RecipeList() {
  const {
    data: recipes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['recipes'],
    queryFn: getAllRecipes,
  })

  if (isLoading) {
    return <div>Loading recipes...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <Recipe key={recipe._id} {...recipe} />
      ))}
    </div>
  )
}