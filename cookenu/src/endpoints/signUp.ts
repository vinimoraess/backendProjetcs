import {Request,Response} from "express"
import { createUser } from "../data/createUser"
import { getUserByEmail } from "../data/getUserByEmail"
import { generateToken } from "../services/authenticator"
import { generateHash } from "../services/hashManager"
import { generateId } from "../services/idGenerator"
import { user } from "../types/types"

let errorCode = 400

export const signUp = async(req:Request,res:Response):Promise<void> =>{
    try{
        const { name,email,password } = req.body as user

        if(!name || !email || !password){
            errorCode = 403
            throw new Error("Please type all values, name, email, password")
        }

        if(!email.includes("@")){
            errorCode = 406
            throw new Error ("Invalid email, '@' missing")
        }

        if(password.length < 6){
            errorCode = 406
            throw new Error("Password must be longer than 6 characters")
        }

        const findEmail = await getUserByEmail(email)
        console.log("email:",findEmail)
        if(findEmail){
            errorCode = 406
            throw new Error ("Email already exists")
        }

        const userId: string = generateId()
        const cypherPassword: string = await generateHash(password)
        const userData:user = {
            id:userId,
            name:name,
            email:email,
            password:cypherPassword
        }
        await createUser(userData)
        const token: string = generateToken({id:userId})

        res.status(200).send({token:token})
    }
    catch(error){
        res.status(errorCode).send({message:error.message})
    }
}