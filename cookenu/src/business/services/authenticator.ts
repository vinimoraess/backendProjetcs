import * as jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { authenticationData } from "../entities/User"

dotenv.config()

export class Authenticator {

    public generateToken = async(
        input: authenticationData,
        expiresIn: string = "1d"
    ):Promise<string>=>{
        const token = jwt.sign(
            input,
            process.env.JWT_KEY as string,
            {expiresIn}
        )
        return token
    }
    
    public getTokenData = async(
        token: string
    ):Promise<authenticationData> =>{
        const payload = jwt.verify(
            token,
            process.env.JWT_KEY as string
        ) as any
        const result = { id: payload.id }
        return result
    }
}