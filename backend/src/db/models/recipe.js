import mongoose, { Schema } from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true,
    },
    ingredients: String, 
    instructions: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user', 
      required: true,
    },
  },
  { timestamps: true }
);

export const Recipe = mongoose.model('Recipe', recipeSchema);