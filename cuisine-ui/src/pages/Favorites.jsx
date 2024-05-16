import React, { useEffect, useState } from 'react';
import useAuth from '../auth';

export default function Favorites() {
    const { userId } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`https://6xrrjp4jg3.execute-api.us-east-1.amazonaws.com/Prod/user/${userId}/favorites`);
                const data = await response.json();
                setFavorites(data.userFavorites); // Assuming the response structure has a key 'userFavorites' containing an array of favorites
                setIsLoading(false);
            } catch (error) {
                console.error(error); 
                setIsLoading(false);
            }
        };
        fetchFavorites();
    }, [userId]);

    const navigateToDetails = (alias) => {
        window.location.href = `/details/${alias}`;
    };

    return (
        <>
            <h1 className='text-center text-2xl mt-8 font-bold'> Favorite Restaurants </h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                        <div className="results flex flex-wrap flex-row font-serif text-lg justify-center mb-24">
                        {favorites.map((favorite) => (
                          <div
                            key={favorite.id}
                            className="result mt-20 px-20 cursor-pointer hover:hover:bg-amber-300 rounded-xl pt-2"
                          >
                            <div className="text-center pb-5">
                              <p className="underline"> {favorite.name}</p>
                              <p> {favorite.address}</p>
                            </div>
              
                            <div className="flex justify-center items-center">
                              <img
                                src={favorite.image}
                                alt={favorite.alt}
                                className="size-96 content-center"
                              />
                            </div>
                            <div className="p-5">
                              <p> Phone: {favorite.phone}</p>
                              <p> Address: {favorite.address}</p>
                              <p> ID: {favorite.id} </p>
                              <p> ID: {favorite.alias} </p>
                              <button onClick={() => navigateToDetails(favorite.alias)}> VIEW DETAILS</button>
                            </div>                               

                          </div>
                        ))}
                      </div>

            )}
        </>
    );
}
