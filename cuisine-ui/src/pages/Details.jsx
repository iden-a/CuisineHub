import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Reviews from "./Reviews";
import useAuth from '../auth';

export default function Details() {
  const { alias } = useParams();
  const [details, setDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const { userId } = useAuth();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://6xrrjp4jg3.execute-api.us-east-1.amazonaws.com/Prod/api/businesses/${alias}`);
        const data = await response.json();
        console.log(data);
        setIsLoading(true);
        console.log(isLoading);
        setDetails(data);
        console.log("Details: ", details)
      } catch (err) {
        setError("The server ran into an error, please try again!");
        console.log(error);
      }
    };
    fetchDetails();
  }, [alias, isLoading, error]);

  const handleSaveToFavorites = async () => {
    try {
      const response = await fetch(`/user/${userId}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });
      if (!response.ok) {
        throw new Error('Failed to save to favorites');
      }
      setSuccessMessage("Successfully added to favorites!"); // Set success message
      console.log('Favorite saved successfully');
    } catch (err) {
      console.error('Error saving to favorites:', err);
      setError("Server Error")
    }
  };

  return (
    <>
      <div>
        {isLoading ? (
          <>
            <div className="text-center font-serif mt-20">
              <h1 className="text-4xl pb-3">{details.name}</h1>
              <div className="flex justify-center items-center">
                <img src={details.image} alt={details.alt} />
              </div>
              <div className="text-xl pt-4">
                <p> {details.address}</p>
                <p> {details.alias}</p>
                <a href={details.url} className="underline hover:text-amber-500"> {details.name} Yelp Profile </a>
                <p> Phone: {details.phone}</p>
                <p> Tags: {details.categories} </p>
                <button 
                  className="border-2 font-serif px-2 py-2 rounded-lg mb-10 text-2xl bg-amber-500 hover:bg-amber-300"
                  onClick={handleSaveToFavorites}
                >
                  Save To Favorites
                </button>
                {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Display success message */}
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
            <Reviews/>
          </>
        ) : (
          <> 
            <p className="text-center mt-96 font-serif text-4xl animate-spin"> 🥘</p> 
            <p className="text-center mt-10 font-serif text-2xl">Loading Restaurant Details...</p> 
          </>
        )}
      </div>      
    </>
  );
}
