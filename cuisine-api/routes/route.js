import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const api_key = process.env.REACT_APP_API_KEY;

router.get('/search', async (req, res) => {
    const { query } = req.query; 

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const searchUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=30&ignorePantry=true&apiKey=${api_key}`;
        const response = await axios.get(searchUrl);
        const recipeArray = response.data.map(info => ({
            id: info.id,
            title: info.title,
            imageUrl: info.image,
            likes: info.likes
        }));
        res.json(recipeArray);
    } catch (error) {
        console.error('Error searching for recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/recipe-details', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'recipe ID is required!' });
    }

    try {
        const recipeUrl = `https://api.spoonacular.com/recipes/${query}/information?apiKey=${api_key}`;
        const response = await axios.get(recipeUrl);
        const recipeInfo = response.data;
        res.json(recipeInfo);
        console.log(recipeInfo);
    } catch (error) {
        console.error('Error retrieving recipe information:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
