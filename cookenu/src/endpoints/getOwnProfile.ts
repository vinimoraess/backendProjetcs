import { Request, Response } from "express"
import { getUserById } from "../data/getUserById"
import { getTokenData } from "../services/authenticator"
import { authenticationData } from "../types/types"

let errorCode: number = 400

export const getOwnProfile = async(
    req: Request,
    res: Response
):Promise<void> =>{

    try{
        const { authorization } = req.headers
        const verifyToken: authenticationData = getTokenData(authorization as string)
        const findUser = await getUserById(verifyToken.id)

        if(!authorization){
            throw new Error("You must send an token authorization in headers")
        }

        const userData = {
            id:findUser.id,
            name:findUser.name,
            email:findUser.email
        }

        res.status(200).send(userData)
    }
    catch(error){
        res.status(errorCode).send({
            message:error.message
        })
    }
}