import mongoose, {Schema, models, model} from "mongoose";

const SimpleSchema = new Schema({
    num: String
});

export const Simple = models.Simple || model('Simple', SimpleSchema);