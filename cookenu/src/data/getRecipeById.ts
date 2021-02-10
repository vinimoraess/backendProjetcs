import { connection } from "../connection/dataBaseConnection"

export const getRecipeById = async(
    id:string
):Promise<any> =>{
    const result = await connection
        .select("*")
        .from("cookenu_Recipes")
        .where({id})
    
    return result[0]
}