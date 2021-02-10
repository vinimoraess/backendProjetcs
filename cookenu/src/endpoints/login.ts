import { Request, Response } from "express"
import { getUserByEmail } from "../data/getUserByEmail"
import { generateToken } from "../services/authenticator"
import { compareHash } from "../services/hashManager"
import { loginInput } from "../types/types"

let errorCode:number  = 400

export const login = async(
    req: Request,
    res: Response
):Promise<void> =>{

    try{
        const { email, password } = req.body as loginInput

        if(!email || password){
            errorCode = 406
            throw new Error("Please type all values, name and password")
        }

        if(!email.includes("@")){
            errorCode = 406
            throw new Error("Invalid email, '@' is missing")
        }

        if(password.length < 6){
            errorCode = 406
            throw new Error("Password must be longer than 6 characters")
        }

        const findUser = await getUserByEmail(email)
        if(!findUser){
            errorCode = 404
            throw new Error("User not found")
        }

        const comparePassword = await compareHash(password,findUser.password)
        if(!comparePassword){
            errorCode = 401
            throw new Error("Invalid password")
        }

        const token = generateToken({id:findUser.id})
        res.status(200).send({token:token})
    }
    catch(error){
        res.status(errorCode).send({message:error.message})
    }
}