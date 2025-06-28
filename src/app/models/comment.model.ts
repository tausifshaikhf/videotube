import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// we can't give all the comments or videos to the user that's why here we're using mongooseAggregatePaginate
const commentSchema = new Schema(
    {
        content : {
            type : String,
            required : true
        },
        video : {
            type : Schema.Types.ObjectId,
            ref : "Video"
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    }   
    ,{timestamps : true}
)

export const Comment = mongoose.model("Comment",commentSchema)

commentSchema.plugin(mongooseAggregatePaginate)