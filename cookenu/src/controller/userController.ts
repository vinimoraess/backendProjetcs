import { Request, Response } from "express"
import { signupInputDTO } from "../business/entities/user"
import { businessLogin, businessSignup } from "../business/userBusiness"

let errorCode: number = 400

export const signup = async(
    req: Request,
    res: Response    
): Promise<void> =>{
    try{
        const input: signupInputDTO = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const token = await businessSignup(input)
        res.status(200).send({
            message:"User created successfully!",
            token
        })
    }
    catch(error){
        res.status(errorCode).send(error.message)
    }
}

export const login = async(
    req: Request,
    res: Response
):Promise<void> =>{
    try{
        const { email, password } = req.body
        const token = await businessLogin({email,password})

        res.status(200).send({
            message:"User Logged In",
            token
        })
    }
    catch(error){
        res.status(errorCode).send(error.message)
    }
}