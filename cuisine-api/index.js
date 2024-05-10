import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/route.js';
import User from './config.js';
import { doc, collection, addDoc } from 'firebase/firestore';


dotenv.config();

const app = express();

const port = process.env.PORT || 5510;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.post("/create", async (req, res) => {
    const data = req.body;
    try {
        const docRef = await addDoc(User, data);
        console.log("Document written with ID: ", docRef.id);
        res.status(201).send({ msg: "User Added", id: docRef.id });
    } catch (error) {
        console.error("Error adding document: ", error);
        res.status(500).json({ msg: "Failed to add user" });
    }
});

app.post('/user/:userId/favorites', async (req, res) => {
    const userId = req.params.userId;
    const favoriteData = req.body;
    
    try {
        const userDocRef = doc(User, userId);  // Get the reference to the specific user
        const favoritesCollectionRef = collection(userDocRef, 'Favorites');  // Reference to the Favorites subcollection
        const favoriteDocRef = await addDoc(favoritesCollectionRef, favoriteData);
        console.log("Favorite added with ID:", favoriteDocRef.id);
        res.status(201).json({ msg: "Favorite added", id: favoriteDocRef.id });
    } catch (error) {
        console.error("Error adding favorite: ", error);
        res.status(500).json({ msg: "Failed to add favorite" });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));





