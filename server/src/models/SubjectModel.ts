import mongoose, { Schema, Document } from "mongoose";

export interface ISubject extends Document {
  description: String;
}

const SubjectSchema: Schema = new Schema({
  description: { type: String, required: true },
});

export default mongoose.model<ISubject>("subject", SubjectSchema);
