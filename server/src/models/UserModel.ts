import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: String;
  avatar: String;
  whatsapp: String;
  bio: String;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  whatsapp: { type: String, required: true },
  bio: { type: String, required: true },
  createdAt: {type: Date, default: Date.now}
});

export default mongoose.model<IUser>("user", UserSchema);
