import express from "express"
import { createRecipe, searchRecipeById } from "../recipesController"

export const recipeRouter = express.Router()

recipeRouter.post("/create",createRecipe)
recipeRouter.get("/search/:id",searchRecipeById)