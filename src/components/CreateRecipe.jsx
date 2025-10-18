// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createRecipe } from '../api/recipes.js' 
import { useAuth } from '../contexts/AuthContext.jsx'

export function CreateRecipe() {
  const [ token ] = useAuth()

  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')

  const queryClient = useQueryClient()

  const createRecipeMutation = useMutation({
    mutationFn: () => createRecipe(token, { title, ingredients, instructions }),
   
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] })
      // Optionally clear the form
      setTitle('')
      setIngredients('')
      setInstructions('')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createRecipeMutation.mutate()
  }

  if (!token) {
    return <div>Please log in to create new recipes.</div>
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '1rem 0' }}>
      <h3>Add a New Recipe</h3>
      <div>
        <label htmlFor='create-title'>Title:</label>
        <input
          id='create-title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor='create-ingredients'>Ingredients (one per line):</label>
        <textarea
          id='create-ingredients'
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={5}
        />
      </div>

      <div>
        <label htmlFor='create-instructions'>Instructions:</label>
        <textarea
          id='create-instructions'
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={8}
        />
      </div>
      
      <input
        type='submit'
        value={createRecipeMutation.isPending ? 'Creating...' : 'Create Recipe'}
        disabled={!title || createRecipeMutation.isPending}
      />
      
      {createRecipeMutation.isSuccess && (
        <div style={{ color: 'green' }}>Recipe created successfully!</div>
      )}
      {createRecipeMutation.isError && (
        <div style={{ color: 'red' }}>Error: {createRecipeMutation.error.message}</div>
      )}
    </form>
  )
}