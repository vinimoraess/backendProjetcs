import { insertRecipe, selectRecipeById } from "../data/recipeDataBase";
import { selectUserById } from "../data/userDataBase";
import { inputRecipesDTO, recipes } from "./entities/recipes";
import { authenticationData } from "./entities/user";
import { getTokenData } from "./services/authenticator";
import { generateId } from "./services/idGenerator";

export const businessCreateRecipe = async(
    recipe: inputRecipesDTO,
    authorization: string
):Promise<void> =>{

    if(!recipe.title || !recipe.description){
        throw new Error("Please type all values, title, description")
    }
    if(!authorization){
        throw new Error("You must inform authorization token in headers")
    }
    const verifyToken: authenticationData = getTokenData(authorization)
    if(!verifyToken){
        throw new Error("You must logged in !")
    }
    const user_id = await selectUserById(verifyToken.id)
    const recipeId: string = generateId()

    const now = new Date
    const day = String(now.getDate())
    const month = String(now.getMonth()+1).padStart(2,'0')
    const year = String(now.getFullYear())
    const today = (`${year}-${month}-${day}`)

    const recipeData: recipes = {
        id: recipeId,
        title:recipe.title,
        description:recipe.description,
        createdAt: today,
        user_id: user_id.id
    }
    
    await insertRecipe(recipeData)
}

export const businessGetRecipeById = async(
    id: string,
    authorization: string
):Promise<any> =>{
    if(!authorization){
        throw new Error("You must pass an authentication in headers")
    }

    const verifyToken:authenticationData = await getTokenData(authorization as string)
    if(!verifyToken){        
        throw new Error("You must be logged in to search a recipe")
    }

    const recipe = await selectRecipeById(id)
    if(!recipe){
        throw new Error("Recipe not found")
    }

    return recipe
}