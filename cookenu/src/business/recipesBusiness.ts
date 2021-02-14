import { GenerateData } from "../data/model/RecipeModel";
import { RecipeDataBase } from "../data/RecipeDataBase";
import { UserDataBase } from "../data/UserDataBase";
import { inputRecipesDTO, Recipes} from "./entities/Recipes";
import { CustomError } from "./error/CustomError";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";

export class RecipesBusiness {
    
    constructor(
        private authenticator: Authenticator,
        private userDataBase: UserDataBase,
        private idGenerator: IdGenerator,
        private generateData: GenerateData,
        private recipeDataBase: RecipeDataBase
    ){}

    public createRecipe = async(
        recipe: inputRecipesDTO,
        authorization: string
    ):Promise<void> =>{
    
        if(!recipe.title || !recipe.description){
            throw new CustomError(204,"Please type all values, title, description")
        }
        if(!authorization){
            throw new CustomError(204,"You must inform authorization token in headers")
        }
        const verifyToken = this.authenticator.getTokenData(authorization)
        if(!verifyToken){
            throw new CustomError(404,"You must logged in !")
        }
        const user_id = await this.userDataBase.selectUserById((await verifyToken).id)
        const recipeId = this.idGenerator.generate()
    
        /*const now = new Date
        const day = String(now.getDate())
        const month = String(now.getMonth()+1).padStart(2,'0')
        const year = String(now.getFullYear())
        const today = (`${year}-${month}-${day}`)*/
    
        const recipeData: Recipes = {
            id: recipeId,
            title:recipe.title,
            description:recipe.description,
            createdAt: this.generateData.getDate(),
            user_id: user_id.id
        }
        
        await this.recipeDataBase.insertRecipe(recipeData)
    }

    public getRecipeById = async(
        id: string,
        authorization: string
    ):Promise<any> =>{
        if(!authorization){
            throw new CustomError(204,"You must pass an authentication in headers")
        }
    
        const verifyToken = await this.authenticator.getTokenData(authorization as string)
        if(!verifyToken){
            throw new CustomError(404,"You must be logged in to search a recipe")
        }
    
        const recipe = await this.recipeDataBase.selectRecipeById(id)
        if(!recipe){
            throw new CustomError(404,"Recipe not found")
        }
    
        return recipe
    }
}

