
import mongoose,{Schema , Document} from "mongoose";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import bcrypt from 'bcrypt'

export interface User extends Document{
    username : string,
    email : string,
    fullName : string,
    avatar : string,
    coverImage : string,
    watchHistory : Array<mongoose.Types.ObjectId>,
    password : string,
    refreshToken? : string,
}


const userSchema = new Schema( {
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        // The index will make the database tasks a bit expensive but as we are gonna use the username alot in our app for searching so it's a good idea to put index : true
        index : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true
    },
    fullName : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avatar : {
        type : String, // we're going to use the URL of the avatar from the cloudinary
        required : true
    },
    coverImage : {
        type : String
    },
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    refreshToken : {
        type : String,
    }
},
{timestamps : true}
)

// Here we're going to use pre hook of mongoose to encrypt the password before saving it in the database Link : https://mongoosejs.com/docs/middleware.html#pre
// First we'll specify the event on which this middleware should run https://mongoosejs.com/docs/middleware.html
// Don't use arrow functions here — we need `function` to access the correct `this` (bound to the Mongoose document)


userSchema.pre("save",async function(next){
    // Only hash the password if it's created for first time or only the password field has been changed
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
//  Pass the control to the next middleware
    next()
    
})

// here, i will define custom methods using the methods object of mongoose's schemas
// It will also has access to this document before saving or after saving it into the database
// I would have no access to this model fields if i had created a normal functions
userSchema.methods.isPasswordCorrect = async function(password: string){
    return await bcrypt.compare(password, this.password)
    // It will return true or false
}

// we're going to generate access token and refresh token both with different uses but are jwt
// Here both the tokens are doing the same work but the refresh token will contain less information compared to access token
userSchema.methods.generateAccessToken = function () {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not set");
  }
  

  const payload = {
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName
  };

  return jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: "1d"
    }
  );
};

userSchema.methods.generateRefreshToken = function(){
    // these methods have the access of all the fields in the database and we can access them using this keyword
    return jwt.sign(
        {
            // this object contains the payload
            _id : this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET as Secret,
        // the below object contains the expiry information of this token
        {
            expiresIn : '10d'
        }
    ) 
}

export const User = mongoose.models.User || mongoose.model<User>("User",userSchema)