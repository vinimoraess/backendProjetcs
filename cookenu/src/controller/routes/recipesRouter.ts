import express from "express"
import { RecipesController } from "../RecipesController"

export const recipeRouter = express.Router()
const recipesController = new RecipesController()

recipeRouter.post("/create",recipesController.createRecipe)
recipeRouter.get("/search/:id",recipesController.searchRecipeById)