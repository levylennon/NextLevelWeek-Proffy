import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: String;
  lastname: String;
  email: String;
  password: String;
  
  avatar?: String;
  whatsapp?: String;
  bio?: String;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },


  avatar: String ,
  whatsapp: String,
  bio: String,
  createdAt: {type: Date, default: Date.now}
});

export default mongoose.model<IUser>("user", UserSchema);
