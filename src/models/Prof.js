import mongoose, {Schema, models, model} from "mongoose";

const ProfSchema = new Schema({
    Name: String,
    Department: String,
    OverallQuality: String,
    TakeAgain: String,
    Difficulty: String,
    Tags: [String],
})

export const Prof = models.Prof || model('Prof', ProfSchema);