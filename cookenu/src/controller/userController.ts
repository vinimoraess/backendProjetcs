import { Request, Response } from "express"
import { loginInput, signupInputDTO } from "../business/entities/User"
import { Authenticator} from "../business/services/Authenticator"
import { HashManager } from "../business/services/HashManager"
import { IdGenerator } from "../business/services/IdGenerator"
import { UserBusiness } from "../business/UserBusiness"
import { UserDataBase } from "../data/UserDataBase"

const userBusiness = new UserBusiness(
    new IdGenerator,
    new HashManager,
    new Authenticator,
    new UserDataBase
)

export class UserController {
    public signup = async(
        req: Request,
        res: Response    
    ): Promise<void> =>{
        try{
            const input: signupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
    
            const token = await userBusiness.createUser(input)
            res.status(200).send({
                message:"User created successfully!",
                token
            })
        }
        catch(error){
            res.status(error.statusCode || 400).send({
                error:error.message
            })
        }
    }

    public login = async(
        req: Request,
        res: Response
    ):Promise<void> =>{
        try{
            const loginData: loginInput={
                email: req.body.email,
                password: req.body.password
            }
            const token = await userBusiness.getUserByEmail(loginData)
    
            res.status(200).send({
                message:"User Logged In",
                token
            })
        }
        catch(error){
            res.status(error.statusCode).send({
                error:error.message
            })
        }
    }

    public ownProfile = async(
        req: Request,
        res: Response
    ):Promise<void> =>{
        try{
            const { authorization } = req.headers
            const verifyToken = await userBusiness.authenticator.getTokenData(
                authorization as string
            )
            const findUser = await userBusiness.getUserById(
                verifyToken.id,authorization as string
            )

            const profile = {
                id:findUser.id,
                name:findUser.name,
                email:findUser.email
            }
            res.status(200).send({User:profile})
        }
        catch(error){
            res.status(error.statusCode).send({
                error:error.message
            })
        }
    }
    
    public getProfile = async(
        req:Request,
        res:Response
    ):Promise<void> =>{
        try{
            const { authorization } = req.headers
            const { id } = req.params
            const findUser = await userBusiness.getUserById(id,authorization as string)
    
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
}


