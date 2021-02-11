import * as bcrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config()

export const generateHash = async(
    plainText: string
):Promise<string> =>{
    
    const cost: number = Number(process.env.BCRYPT_COST)
    const salt: string = await bcrypt.genSalt(cost)
    const cypherText: string = await bcrypt.hash(plainText,salt)

    return cypherText
}

export const compareHash = async(
    plainText: string,
    cypherText: string
):Promise<boolean> =>{
    
    const result = bcrypt.compare(plainText,cypherText)

    return result
}