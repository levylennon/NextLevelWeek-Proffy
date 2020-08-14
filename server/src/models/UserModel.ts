import mongoose, { Schema, Document } from "mongoose";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export interface IUser extends Document {
  generateToken(): any;
  compareHash(password: string): boolean;
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
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  avatar: String,
  whatsapp: String,
  bio: String,
  createdAt: { type: Date, default: Date.now },
});

UserSchema.methods = {
  compareHash(hash: String) {
    return bcrypt.compare(hash, this.password)
  },
  generateToken() {
    return jwt.sign({ id: this.id }, "secret", {
      expiresIn: 86400,
    });
  },
};

export default mongoose.model<IUser>("user", UserSchema);
