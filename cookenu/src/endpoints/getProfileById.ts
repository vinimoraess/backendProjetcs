import { Request, Response } from "express"
import { getUserById } from "../data/getUserById"
import { getTokenData } from "../services/authenticator"
import { authenticationData } from "../types/types"

let errorCode:number  = 400

export const getProfileById = async(
    req: Request,
    res: Response
):Promise<void> =>{

    try{
        const { authorization } = req.headers
        const { id } = req.params

        if(!authorization){
            throw new Error("You must send an token authorization in headers")
        }

        const verifyToken: authenticationData = getTokenData(authorization as string)
        if(!verifyToken){
            errorCode = 401
            throw new Error("You must be logged in to search a profile")
        }

        const findUser = await getUserById(id)
        if(!findUser){
            errorCode = 404
            throw new Error("User not found")
        }

        const userData = {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email
        }

        res.status(200).send(userData)
    }
    catch(error){   
        res.status(errorCode).send({
            message:error.message
        })
    }
}