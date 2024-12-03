const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    url_photo: { type: String },
});

module.exports = mongoose.model('Recipe', RecipeSchema);

