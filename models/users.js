import { Schema, model,models } from "mongoose";
import Email from "next-auth/providers/email";
import { unique } from "next/dist/build/utils";

const userSchema = new Schema({
    email : {
        type : String,
        unique : [true, 'Email already Exists!'],
        required : [true, 'Email required']
    },
    username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
    image : {
        type : String,
    }
});

const User = models.User || model("User", UserSchema);

export default User;