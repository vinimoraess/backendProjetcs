import { Request, Response} from "express"
import { getRecipeById } from "../data/getRecipeById"
import { getTokenData } from "../services/authenticator"
import { authenticationData } from "../types/types"

let errorCode: number = 400

export const searchRecipesById = async(req:Request,res:Response):Promise<void> =>{
    try{
        const { authorization } = req.headers
        if(!authorization){
            throw new Error("You must send an token authorization in headers")
        }

        const verifyToken:authenticationData = await getTokenData(authorization as string)
        if(!verifyToken){
            errorCode = 401
            throw new Error("You must be logged in to search a profile")
        }

        const { id } = req.params
        const findRecipe = await getRecipeById(id)
        if(!findRecipe){
            errorCode = 404
            throw new Error("Recipe not found")
        }

        const recipeData = {
            id: findRecipe.id,
            title: findRecipe.title,
            description: findRecipe.description,
            createdAt: findRecipe.createdAt
        }
        
        res.status(200).send(recipeData)
    }
    catch(error){
        res.status(errorCode).send({message:error.message})
    }
}