import { connection } from "./connection"
import { user } from "../business/entities/user"

export const insertUser = async (
    user: user
):Promise<void> =>{
    await connection
    .insert({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password
    })
    .into("cookenu_Users")
}

export const selectUserById = async (
    id: string
):Promise<user> =>{
    const result = await connection
        .select("*")
        .from("cookenu_Users")
        .where({id})

    return {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        password: result[0].password
    }
}

export const selectUserByEmail = async (
    email: string
):Promise<user> =>{
    const result = await connection
        .select("*")
        .from("cookenu_Users")
        .where({email})

    return {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        password: result[0].password
    }
}