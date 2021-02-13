import { Request, Response } from "express"
import { inputRecipesDTO } from "../business/entities/recipes"
import { businessCreateRecipe, businessGetRecipeById } from "../business/recipesBusiness"

export const createRecipe = async(
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

        await businessCreateRecipe(input,authorization as string)

        res.status(200).send({
            message:"Recipe created successfully"
        })
    }    
    catch(error){
        res.status(400).send({
            message:error.message
        })
    }   
}

export const searchRecipeById = async(
    req: Request,
    res: Response
):Promise<void> =>{
    try{
        const { authorization } = req.headers
        const { id } = req.params

        const result = await businessGetRecipeById(id,authorization as string)

        res.status(200).send({
            Recipe:result
        })
    }
    catch(error){
        res.status(400).send({
            message:error.message
        })
    }
}