export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email:string,
        public readonly password: string
    ){}    
}

export interface authenticationData {
    id:string
}

export interface loginInput {
    email:string,
    password: string
}

export interface signupInputDTO {
    name: string,
    email:string,
    password: string 
}