import { connection } from "../connection/dataBaseConnection"

export const getUserById = async (
    id: string
):Promise<any> =>{
    const result = await connection
        .select("*")
        .from("cookenu_Users")
        .where({id})

    return result[0]
}