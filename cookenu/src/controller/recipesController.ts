import { Request, Response } from "express"
import { inputRecipesDTO } from "../business/entities/Recipes"
import { RecipesBusiness } from "../business/RecipesBusiness"
import { Authenticator } from "../business/services/Authenticator"
import { IdGenerator } from "../business/services/IdGenerator"
import { GenerateData } from "../data/model/RecipeModel"
import { RecipeDataBase } from "../data/RecipeDataBase"
import { UserDataBase } from "../data/UserDataBase"

const recipesBusiness = new RecipesBusiness(
    new Authenticator,
    new UserDataBase,
    new IdGenerator,
    new GenerateData,
    new RecipeDataBase
)

export class RecipesController {
    public createRecipe = async(
        req:Request,
        res:Response
    ):Promise<void> =>{
        try{
            const { authorization } = req.headers
            const{ title, description } = req.body
    
            const input: inputRecipesDTO ={
                title,
                description
            }
    
            await recipesBusiness.createRecipe(input,authorization as string)
    
            res.status(200).send({
                message:"Recipe created successfully"
            })
        }    
        catch(error){
            res.status(error.statusCode).send({
                error:error.message
            })
        }   
    }

    public searchRecipeById = async(
        req: Request,
        res: Response
    ):Promise<void> =>{
        try{
            const { authorization } = req.headers
            const { id } = req.params
    
            const result = await recipesBusiness.getRecipeById(
                id,
                authorization as string
            )
    
            res.status(200).send({
                Recipe:result
            })
        }
        catch(error){
            res.status(error.statusCode).send({
                error:error.message
            })
        }
    }
}


