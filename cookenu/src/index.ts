import express from "express"
import cors from "cors"
import {AddressInfo} from "net"
import { userRouter } from "./controller/routes/userRouter"
import { recipeRouter } from "./controller/routes/recipesRouter"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)
app.use("/recipes",recipeRouter)

const server = app.listen(process.env.PORT || 3003, ()=>{
    if(server){
        const address = server.address() as AddressInfo
        console.log(`Server is running in http://localhost:${address.port}`)
    } else {
        console.log('Failure upon starting ever')
    }
})