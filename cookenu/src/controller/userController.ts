import { Request, Response } from "express"
import { authenticationData, signupInputDTO } from "../business/entities/user"
import { getTokenData } from "../business/services/authenticator"
import { businessGetProfile, businessLogin, businessSignup } from "../business/userBusiness"

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

export const getOwnProfile = async(
    req: Request,
    res: Response
):Promise<void> =>{
    try{
        const { authorization } = req.headers
        const verifyToken: authenticationData = getTokenData(authorization as string)
        const findUser = await businessGetProfile(verifyToken.id,authorization as string)

        const profile = {
            id:findUser.id,
            name:findUser.name,
            email:findUser.email
        }
        res.status(200).send({User:profile})
    }
    catch(error){
        res.status(400).send({message:error.message})
    }
}

export const getProfileById = async(
    req:Request,
    res:Response
):Promise<void> =>{
    try{
        const { authorization } = req.headers
        const { id } = req.params
        const findUser = await businessGetProfile(id,authorization as string)

        const profile = {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email
        }

        res.status(200).send({Profile: profile})
    }
    catch(error){
        res.status(400).send({message:error.message})
    }
}