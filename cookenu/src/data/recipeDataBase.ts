import { connection } from "./connection"
import { recipes } from "../business/entities/recipes"

export const insertRecipe = async(
    recipe: recipes
):Promise<void> =>{
    await connection
    .insert({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        createdAt: recipe.createdAt,
        user_id: recipe.user_id
    })
}

export const selectRecipeById = async(
    id:string
):Promise<recipes> =>{
    const result = await connection
        .select("*")
        .from("cookenu_Recipes")
        .where({id})
    
    return{
        id: result[0].id,
        title: result[0].title,
        description: result[0].description,
        createdAt: result[0].createdAt,
        user_id: result[0].user_id
    } 
}