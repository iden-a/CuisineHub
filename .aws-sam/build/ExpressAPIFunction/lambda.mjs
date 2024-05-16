import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/route.js';
import { collection, query, where, addDoc, getDocs, doc } from 'firebase/firestore';
import  db  from './config.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 5510;

app.use(cors());
app.use(express.json());

app.use('/api', routes);
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
// app.options('/create', cors());

app.post('/create', async (req, res) => {
    const data = req.body;
    try {
        // Check if the user already exists in the database based on the email
        const existingUserQuery = query(collection(db, 'Users'), where('email', '==', data.email));
        const existingUserSnapshot = await getDocs(existingUserQuery);
        if (!existingUserSnapshot.empty) {
            // If the user already exists, send the ID of the existing user
            const existingUserDoc = existingUserSnapshot.docs[0];
            const existingUserId = existingUserDoc.id;
            console.log("User already exists with ID:", existingUserId);
            res.status(400).json({ msg: "User already exists", id: existingUserId });
            return;
        }

        // If the user does not exist, add the user to the database
        const docRef = await addDoc(collection(db, 'Users'), data);
        console.log("New user added with ID:", docRef.id);
        res.status(201).json({ msg: "User added with ID:", id: docRef.id });
    } catch (error) {
        console.error("Error adding document:", error);
        res.status(500).json({ msg: "Failed to add user" });
    }
});


app.post('/user/:userId/favorites', async (req, res) => {
    const userId = req.params.userId;
    const favoriteData = req.body;
    
    try {
        const userDocRef = doc(db, 'Users', userId);  // Get the reference to the specific user document
        const favoritesCollectionRef = collection(userDocRef, 'Favorites');  // Reference to the Favorites subcollection
        const favoriteDocRef = await addDoc(favoritesCollectionRef, favoriteData);
        console.log("Favorite added with ID:", favoriteDocRef.id);
        res.status(201).json({ msg: "Favorite added", id: favoriteDocRef.id });
    } catch (error) {
        console.error("Error adding favorite: ", error);
        res.status(500).json({ msg: "Failed to add favorite" });
    }
});

app.get('/user/:userId/favorites', async (req, res) => {
    const userId = req.params.userId;
    
    try {
        // Query the 'Favorites' subcollection for the specified user
        const userFavoritesQuerySnapshot = await getDocs(collection(db, 'Users', userId, 'Favorites'));
        // Initialize an array to store the retrieved favorites
        const userFavorites = [];
        // Iterate over the query to extract the data
        userFavoritesQuerySnapshot.forEach((doc) => {
            // Extract data from each document and push it to the 'userFavorites' array
            userFavorites.push({ id: doc.id, ...doc.data() });
        });
        // Return the user's favorites array as a JSON response
        res.status(200).json({ userFavorites });
        console.log("Success", userFavorites);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error retrieving user's favorites:", error);
        res.status(500).json({ msg: "Failed to retrieve user's favorites" });
    }
});


app.listen(port, () => console.log(`Server listening on port ${port}`));

export default app;