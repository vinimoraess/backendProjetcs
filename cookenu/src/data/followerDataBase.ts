import { connection } from "./connection"
import { following } from "../business/entities/following"

export const createFollower = async(
    follower: following
):Promise<void> =>{
    await connection
        .insert({
            user_id: follower.user_id,
            following_id: follower.following_id
        })
        .into("cookenu_Followers")
}