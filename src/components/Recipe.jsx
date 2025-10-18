// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'

export function Recipe({ title, ingredients, instructions, author }) {
  // Split the ingredients string into an array to create a list
  const ingredientsList = ingredients?.split('\n').filter(item => item.trim() !== '');

  return (
    <article style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0', borderRadius: '8px' }}>
      <h3>{title}</h3>
      
      {ingredientsList && ingredientsList.length > 0 && (
        <>
          <h4>Ingredients</h4>
          <ul>
            {ingredientsList.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </>
      )}
      
      {instructions && (
        <>
          <h4>Instructions</h4>
          <p>{instructions}</p>
        </>
      )}

      {author?.username && (
        <em style={{ fontSize: '0.9em', color: '#555' }}>
          <br />
          Posted by: {author.username}
        </em>
      )}
    </article>
  )
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.string,
  instructions: PropTypes.string,
  // The author prop is now an object with a username
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
}