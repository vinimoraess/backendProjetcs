export type user = {
    id: string,
    name: string,
    email:string,
    password: string
}

export type authenticationData = {
    id:string
}

export type loginInput = {
    email:string,
    password: string
}

export type signupInputDTO = {
    name: string,
    email:string,
    password: string 
}