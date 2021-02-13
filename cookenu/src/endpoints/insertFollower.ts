/*import { Request, Response } from "express"
import { createFollower } from "../data/createFollower"
import { getUserById } from "../data/getUserById"
import { getTokenData } from "../services/authenticator"
import { authenticationData } from "../types/types"

let errorCode: number = 400

export const insertFollower = async(
    req: Request,
    res: Response
): Promise<void> =>{

    try{
        const { authorization } = req.headers
        const verifyToken: authenticationData = getTokenData(authorization as string)
        const findUser = await getUserById(verifyToken.id)

        if(!authorization){
            throw new Error("You must send an token authorization in headers")
        }

        if(!findUser){
            errorCode = 404
            throw new Error("User not found")
        }

        const { following_id } = req.body
        if(!following_id){
            errorCode = 403
            throw new Error("Please type the user to Follow ID")
        }

        const user_id = findUser.id
        await createFollower({user_id,following_id})

        res.status(200).send({
            message:"Followed Successfully"
        })
    }
    catch(error){
       res.status(errorCode).send({
           message:error.message
       })
    }
}*/