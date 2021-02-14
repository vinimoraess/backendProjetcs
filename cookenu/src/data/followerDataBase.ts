import { BaseDataBase } from "./BaseDataBase"
import { following } from "../business/entities/following"
import { CustomError } from "../business/error/CustomError"

export class FollowerDataBase extends BaseDataBase {

    public createFollower = async(
        follower: following
    ):Promise<void> =>{
        try{
            await BaseDataBase.connection
            .insert({
                user_id: follower.user_id,
                following_id: follower.following_id
            })
            .into("cookenu_Followers")
        }
        catch(error){
            throw new CustomError(500,"An unexpected error ocurred")
        }
    }    
}
