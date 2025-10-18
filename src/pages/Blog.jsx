// eslint-disable-next-line no-unused-vars
import React from 'react'
// import { PostList } from '../components/PostList.jsx'
// import { CreatePost } from '../components/CreatePost.jsx'
import { PostFilter } from '../components/PostFilter.jsx'
import { PostSorting } from '../components/PostSorting.jsx'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../api/posts.js'
import { Header } from '../components/Header.jsx'

import { CreateRecipe } from '../components/CreateRecipe.jsx'
import { RecipeList } from '../components/RecipeList.jsx'
import { useAuth } from '../contexts/AuthContext.jsx';

export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })

  const posts = postsQuery.data ?? []

  const [ token ] = useAuth();

  return (
    <div style={{ padding: 8 }}>
      <Header />

<main style={{ maxWidth: '960px', margin: '0 auto', padding: '1rem' }}>
  <h1 style={{ textAlign: 'center' }}>Recipe Sharing App</h1>

  {token && (
    <>
      <hr style={{ margin: '2rem 0', border: 0, borderTop: '1px solid #eee' }} />
      <CreateRecipe />
    </>
  )}

  {/* This section is now outside the login check and will always be visible */}
  <hr style={{ margin: '2rem 0', border: 0, borderTop: '1px solid #eee' }} />
  <h2>All Recipes</h2>
  
  <div>
    Filter by:
    <PostFilter
      field='author'
      value={author}
      onChange={(value) => setAuthor(value)}
    />
    <br />
    <PostSorting
      fields={['createdAt', 'updatedAt']}
      value={sortBy}
      onChange={(value) => setSortBy(value)}
      orderValue={sortOrder}
      onOrderChange={(orderValue) => setSortOrder(orderValue)}
    />
  </div>
  
  <hr />
  <RecipeList posts={posts} />
</main>
    </div>
  )
}
