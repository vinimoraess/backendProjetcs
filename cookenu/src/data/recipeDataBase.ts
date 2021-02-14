import { BaseDataBase } from "./BaseDataBase"
import { Recipes } from "../business/entities/Recipes"
import { CustomError } from "../business/error/CustomError"

export class RecipeDataBase extends BaseDataBase {

    private static tableName = "cookenu_Recipes"

    private static toRecipeModel(recipe:any): Recipes{
        return new Recipes(
            recipe.id,
            recipe.title,
            recipe.description,
            recipe.createdAt,
            recipe.user_id
        )
    }

    public insertRecipe = async(
        recipe: Recipes
    ):Promise<void> =>{
        try{
            await BaseDataBase.connection
            .insert({
                id: recipe.id,
                title: recipe.title,
                description: recipe.description,
                createdAt: recipe.createdAt,
                user_id: recipe.user_id
            }).into(RecipeDataBase.tableName)
        }
        catch(error){
            throw new CustomError(500,"An unexpected error ocurred")
        }
    }

    public selectRecipeById= async(
        id:string
    ):Promise<Recipes> =>{
        try{
            const result = await BaseDataBase.connection
            .select("*")
            .from("cookenu_Recipes")
            .where({id})
        
            return RecipeDataBase.toRecipeModel(result[0])
        }
        catch(error){
            throw new CustomError(500,"An unexpected error ocurred")
        }
    }
}

