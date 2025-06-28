import mongoose,{Schema} from "mongoose";


const subscriptionSchema = new Schema(
    {
        subscriber : {
            type : Schema.Types.ObjectId,  // One who's subscribing
            ref : "User"
        },
        channel : {
            type : Schema.Types.ObjectId, // One who's channel got subscribed,
            ref : "User"
        }
    },
    {timestamps : true}
)

export const Subscription = mongoose.model("Subscription",subscriptionSchema)