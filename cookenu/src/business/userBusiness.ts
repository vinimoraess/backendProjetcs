import { insertUser, selectUserByEmail } from "../data/userDataBase";
import { generateToken } from "./services/authenticator";
import { loginInput, signupInputDTO, user } from "./entities/user";
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