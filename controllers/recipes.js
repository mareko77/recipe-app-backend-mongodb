const Recipe = require('../models/Recipe');

const handleAddRecipe = async (req, res) => {
    const { name, description, ingredients, url_photo, userId } = req.body;

    if (!name || !description || !ingredients || !userId) {
        return res.status(400).json('Incomplete recipe data');
    }

    try {
        const newRecipe = new Recipe({
            name,
            description,
            ingredients: Array.isArray(ingredients) ? ingredients : ingredients.split(','),
            url_photo,
            userId,
        });

        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).json('Error adding recipe');
    }
};

const handleGetRecipes = async (req, res) => {
    const { userId } = req.params;

    try {
        const recipes = await Recipe.find({ userId });
        res.json(recipes);
    } catch (err) {
        console.error(err);
        res.status(400).json('Unable to fetch recipes');
    }
};

const handleDeleteRecipe = async (req, res) => {
    const { id } = req.params;

    try {
        await Recipe.findByIdAndDelete(id);
        res.json('Recipe deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(400).json('Unable to delete recipe');
    }
};

const handleUpdateRecipe = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, description, url_photo } = req.body;

    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { name, ingredients, description, url_photo },
            { new: true }
        );
        res.json(updatedRecipe);
    } catch (err) {
        console.error(err);
        res.status(400).json('Unable to update recipe');
    }
};

module.exports = {
    handleAddRecipe,
    handleGetRecipes,
    handleDeleteRecipe,
    handleUpdateRecipe,
};



  
