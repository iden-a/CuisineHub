import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../styles/Reviews.css';

export default function Reviews() {
  const { alias } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Set to true initially
  const navigateTo = useNavigate();

  useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await fetch(`/api/businesses/${alias}/reviews`);
          const data = await response.json();
          console.log(data);
          setReviews(data); // Update reviews
          setLoading(false); // Set loading to false once data is loaded
        } catch (error) {
          console.log(error);
          setLoading(false); // Ensure loading is set to false on error
        }
      };
      fetchReviews();
    }, [alias]);

  const navigateToResults = (e) => {
    e.preventDefault();
    navigateTo("/");
  };

  return (
    <>
      <div className="font-serif">
        <div className="text-center font-serif font-bold text-3xl">
          <h1 className="mt-36">Top Reviews</h1>
        </div>

        <div className="reviews flex flex-row mt-20 mb-48 mx-24 space-x-10">
          {loading ? (
            <p>Loading...</p> // Optionally handle the loading state
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="review text-xl mx-10 border py-10 px-10 rounded-lg bg-slate-50"
              >
                <p>Name: {review.name}</p>
                <p>Rating: {review.rating}/5</p>
                <p>Date: {review.date}</p>
                <p>{review.review_message}</p>
                <a href={review.url} className="underline hover:text-amber-500">
                  Read More!
                </a>
              </div>
            ))
          ) : (
            <p className="text-xl ml-8">No reviews available.</p>
          )}
        </div>
      </div>

      <button
        onClick={navigateToResults}
        className="border-2 font-serif px-2 py-2 rounded-lg mb-10 text-2xl bg-amber-500 hover:bg-amber-300 ml-36"
      >
        Back
      </button>
    </>
  );
}
