import { UserDataBase } from "../data/UserDataBase"
import { authenticationData, loginInput, signupInputDTO } from "./entities/User"
import { CustomError } from "./error/CustomError"
import { Authenticator } from "./services/Authenticator"
import { HashManager } from "./services/HashManager"
import { IdGenerator } from "./services/IdGenerator"

export class UserBusiness{

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        public authenticator: Authenticator,
        private userDataBase: UserDataBase
    ){}

    public createUser = async(
        user: signupInputDTO
    ):Promise<string> =>{
        if(!user.name || !user.email || !user.password){        
            throw new CustomError(204,`Fill all the fields, name, email and password corretly`)
        }

        if (!user.email.includes("@")) {
            throw new CustomError (404, "Invalid email")
        }
    
        if (user.password.length<6) {
            throw new CustomError (411, "Enter at least 6 characters")
        }

        const id: string = this.idGenerator.generate()
        const hashPassword = await this.hashManager.hash(user.password)
        const input ={
            id,
            name:user.name,
            email:user.email,
            password:hashPassword
        }
        await this.userDataBase.insertUser(input)
    
        const accessToken = this.authenticator.generateToken({id})
    
        return accessToken
    
    }
      
    public getUserById = async(
        id:string,
        authorization: string
    ):Promise<any> =>{
        if(!authorization){
            throw new CustomError(406,"You must pass an authentication in headers")
        }
    
        const verifyToken:authenticationData = await this.authenticator.getTokenData(
            authorization as string
        )
        
        if(!verifyToken){            
            throw new CustomError(406,"Invalid Credentials")
        }
    
        const user = await this.userDataBase.selectUserById(id)
        if(!user){
            throw new CustomError(404,"User not found")
        }
        
        return user
    }

    public getUserByEmail = async(
        user:loginInput
    ):Promise<any>=>{
        const userFromDB = await this.userDataBase.selectUserByEmail(user.email);

        if (!userFromDB) {
            throw new CustomError (406, "Invalid credentials")
        }

        if (!user.email || !user.password) {
            throw new CustomError (404, "Enter email and password")
        }

      const passwordIsCorrect = await this.hashManager.compare(
         user.password,
         userFromDB.password
      )

      const accessToken = this.authenticator.generateToken({
         id: userFromDB.id         
      })

      if (!passwordIsCorrect) {
         throw new CustomError(401, "Invalid password!");
      }

      return accessToken;
    }
}
