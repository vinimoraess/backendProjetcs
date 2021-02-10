import { connection } from "../connection/dataBaseConnection"
import { user } from "../types/types"

export const createUser = async (
    user: user
):Promise<void> =>{
    await connection
    .insert({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
    })
}