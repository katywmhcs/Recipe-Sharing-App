
import express from 'express'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'

import { recipesRoutes } from './routes/recipes.js'

import bodyParser from 'body-parser'
import cors from 'cors'

import './db/models/user.js'

const app = express()

app.use(bodyParser.json())
app.use(cors())

postsRoutes(app)
userRoutes(app)
recipesRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express Nodemon!')
})

export { app }