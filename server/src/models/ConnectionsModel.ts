import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./UserModel";

export interface IConnections extends Document {
  user: IUser["_id"];
  createdAt: Date;
}

const ConnectionsSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now(),}
});

export default mongoose.model<IConnections>("connections", ConnectionsSchema);
