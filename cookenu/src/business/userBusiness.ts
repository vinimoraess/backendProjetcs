import { insertUser, selectUserByEmail, selectUserById } from "../data/userDataBase";
import { generateToken, getTokenData } from "./services/authenticator";
import { authenticationData, loginInput, signupInputDTO, user } from "./entities/user";
import { compareHash, generateHash } from "./services/hashManager";
import { generateId } from "./services/idGenerator"

export const businessSignup = async(
    input: signupInputDTO
):Promise<string> =>{
    if(!input.name || !input.email || !input.password){        
        throw new Error(`Fill all the fields, name, email and password corretly`)
    }

    const id: string = generateId()
    const cypherPassword = await generateHash(input.password)
    const user = {
        id,
        name: input.name,
        email: input.email,
        password: cypherPassword
    }

    await insertUser(user)

    const token: string = generateToken({id})

    return token

}

export const businessLogin = async(
    input: loginInput
):Promise<string> =>{
    
    if(!input.email || !input.password){
        throw new Error(" 'email' and 'password' must be provided")
    }

    const user: user = await selectUserByEmail(input.email)
    if(!user){
        throw new Error('User not found')
    }

    const checkPassword: boolean = await compareHash(
        input.password,
        user.password
    )
    if(!checkPassword){
        throw new Error('Invalid Password')
    }

    const token: string = generateToken({id:user.id})
    return token
}

export const businessGetProfile = async(
    id:string,
    authorization: string
):Promise<any> =>{
    if(!authorization){
        throw new Error("You must pass an authentication in headers")
    }

    const verifyToken:authenticationData = await getTokenData(authorization as string)
        if(!verifyToken){            
            throw new Error("You must be logged in to search a profile")
        }
        
    const user = await selectUserById(id)
    if(!user){
        throw new Error("User not found")
    }
    
    return user
}