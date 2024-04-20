import express from 'express';
import axios from 'axios';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config()
const app = express();
const port = process.env.PORT || 5510;


app.use(cors());
const api_key = process.env.REACT_APP_API_KEY;


app.get('/api/search', async (req, res) => {
    const { query } = req.query; 

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const searchUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=15&ignorePantry=true&apiKey=${api_key}`;
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


app.get('/api/recipe-details', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'recipe ID is required!' });
    }

    try {
        const recipeUrl = `https://api.spoonacular.com/recipes/${query}/information?apiKey=${api_key}`;
        const response = await axios.get(recipeUrl);
        const recipeInfo = response.data({
        });
        res.json(recipeInfo);
        console.log(recipeInfo);
    }
    catch (error) {
        console.error('Error retrieving recipe information:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// post request to MySQL DB, all of the favorite recipes 

app.listen(port, () => console.log(`Server listening on port ${port}`));
