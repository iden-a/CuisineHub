import { useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import Reviews from "./Reviews";

export default function Details() {
  const { alias } = useParams();
  const [details, setDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    (e) => {
      const fetchDetails = async () => {
        try {
          const response = await fetch(
            `/api/businesses/${alias}`
          );
          const data = await response.json();
          console.log(data);
          setIsLoading(true);
          console.log(isLoading);
          setDetails(data);
        } catch (err) {
          setError( "The server ran into an error getting the events, please try again!");
          console.log(error);
        }
      };
      fetchDetails();
    },
    [alias, isLoading, error]
  );

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
                <a href={details.url} className="underline hover:text-amber-500"> {details.name} Yelp Profile </a>
                <p> Phone: {details.phone}</p>
                <p> Tags: {details.categories} </p>
              </div>
            </div>
            <Reviews/>
          </>
        ) : (
          <> <p className="text-center mt-96 font-serif text-4xl animate-spin"> 🥘</p> <p className="text-center mt-10 font-serif text-2xl">Loading Restaurant Details...</p> </>
        )}
      </div>      
    </>
  );
}