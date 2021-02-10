import express from "express"
import cors from "cors"
import {AddressInfo} from "net"
import { signUp } from "./endpoints/signUp"
import { login } from "./endpoints/login"
import { getOwnProfile } from "./endpoints/getOwnProfile"
import { getProfileById } from "./endpoints/getProfileById"
import { insertRecipe } from "./endpoints/insertRecipe"
import { searchRecipesById } from "./endpoints/searchRecipesById"

const app = express()
app.use(express.json())
app.use(cors())

app.post("/signup",signUp)
app.post("/login",login)
app.get("/user/profile",getOwnProfile)
app.get("/user/:id",getProfileById)
app.post("/recipe",insertRecipe)
app.get("/recipe/:id",searchRecipesById)

const server = app.listen(process.env.PORT || 3003, ()=>{
    if(server){
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`)
    } else {
        console.log('Failure upon starting ever')
    }
})