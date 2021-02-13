import express from "express"
import { getOwnProfile, getProfileById, login, signup } from "../userController"

export const userRouter = express.Router()

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.get("/profile",getOwnProfile)
userRouter.get("/profile/:id",getProfileById)