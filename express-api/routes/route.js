import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';


dotenv.config();

const router = express.Router();
const API_KEY = process.env.REACT_APP_API_KEY;

router.get('/search', async (req, res) => {
    const url = "https://api.yelp.com/v3/businesses/search";
    const headers = {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type' : 'application/json'
    };

    const { location, radius, limit } = req.query;
    const parameters = {
        location,
        term: 'food',
        categories: 'african',
        radius: parseInt(radius) * 1600,
        limit: parseInt(limit),
    };

    try {
        const response = await axios.get(url, { headers, params: parameters });
        const results = response.data.businesses;

        const restaurantResults = results.map(restaurant => ({
            id: restaurant.id,
            alias: restaurant.alias,
            name: restaurant.name,
            address: `${restaurant.location.address1}, ${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zip_code}`,
            phone: restaurant.display_phone || 'N/A',
            price: restaurant.price || 'N/A',
            category: restaurant.categories[0].title,
            rating: `${restaurant.rating}/5.0 with ${restaurant.review_count} Reviews`,
            image: restaurant.image_url,
            alt: `image of ${restaurant.name} from yelp!`
        }));

        res.json(restaurantResults);
    } catch (error) {
        console.error('ERROR:', error);
        res.status(500).json({ error: error.toString() });
    }
});

router.get('/businesses/:alias', async (req, res) => {
    const url = `https://api.yelp.com/v3/businesses/${req.params.alias}`;
    const headers = {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type' : 'application/json'
    };

    try {
        const response = await axios.get(url, { headers });
        const result = response.data;

        const capitalizeFirstLetter = (string) => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        const restaurantDetails = {
            name: result.name,
            alias: result.alias,
            image: result.image_url,
            phone: result.display_phone || 'N/A',
            photos: result.photos,
            reviews: result.review_count,
            url: result.url,
            address: `${result.location.address1}, ${result.location.city}, ${result.location.state} ${result.location.zip_code}`,
            alt: `image of ${result.name} from yelp!`,
            transactions: result.transactions.map(transaction => capitalizeFirstLetter(transaction) + " "),
            categories: result.categories.map(category => capitalizeFirstLetter(category.title) + " ")
        };

        res.json(restaurantDetails);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.get('/businesses/:alias/reviews', async (req, res) => {
    const url = `https://api.yelp.com/v3/businesses/${req.params.alias}/reviews`;
    const headers = {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type' : 'application/json'
    };

    try {
        const response = await axios.get(url, { headers });
        const reviews = response.data.reviews;

        const restaurantReviews = reviews.map(review => ({
            id: review.user.id,
            review_message: review.text,
            rating: review.rating,
            date: new Date(review.time_created).toLocaleString(),
            url: review.url,
            name: review.user.name
        }));

        res.json(restaurantReviews);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});


export default router;
