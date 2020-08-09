import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./UserModel";
import { ISubject } from "./SubjectModel";

export interface IClasses extends Document {
  user: IUser["_id"];
  subject: ISubject["_id"];
  cost: number;
  schedule: [
    {
      week_day: number;
      from: number;
      to: number;
    }
  ];
}

const ClassesSchema: Schema = new Schema({
  cost: { type: Number, required: true },
  schedule: { type: Array, required: true },
  subject: { type: Schema.Types.ObjectId, required: true},
  user: { type: Schema.Types.ObjectId, required: true }
});

export default mongoose.model<IClasses>("classes", ClassesSchema);
