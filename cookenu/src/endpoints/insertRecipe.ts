import { Request, Response } from "express"
import { createRecipe } from "../data/createRecipe"
import { getUserById } from "../data/getUserById"
import { getTokenData } from "../services/authenticator"
import { generateId } from "../services/idGenerator"
import { authenticationData, recipes } from "../types/types"

let errorCode:number  = 400

export const insertRecipe = async(
    req: Request,
    res: Response
):Promise<void> =>{

    try{
        const { authorization } =req.headers
        const verifyToken: authenticationData = getTokenData(authorization as string)
        const findUser = await getUserById(verifyToken.id)

        if(!authorization){
            throw new Error("You must send an token authorization in headers")
        }

        if(!findUser){
            errorCode = 404
            throw new Error("User not found")
        }

        const { title, description } = req.body as recipes
        if(!title || !description){
            errorCode = 403
            throw new Error("Please type all values, title, description")
        }

        const recipeId = generateId()
        const now = new Date
        const day = String(now.getDate())
        const month = String(now.getMonth()+1).padStart(2,'0')
        const year = String(now.getFullYear())
        const today = (`${year}-${month}-${day}`)

        const recipeData: recipes = {
            id: recipeId,
            title,
            description,
            createdAt: today,
            user_id: findUser.id
        }

        await createRecipe(recipeData)
        res.status(200).send({
            message: "recipe successfully created"
        })
    }
    catch(error){
        res.status(errorCode).send({
            message:error.message
        })
    }
}