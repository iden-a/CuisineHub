import "../styles/HomePage.css";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
    <div className="homeContainer">
      <div className="homeInfo-container">
        <h1 className="text-5xl">CuisineHub</h1>
        <div className="mt-4 text-lg">
        <p>Find Your Favorite Restaurants with CuisineHub!</p>
        <p>Dedicated to Making Your Search Easy, For Fast and Seamless Experiences!</p>
        </div>

        <button className="home-btn text-lg border-2 px-2 py-2 rounded-lg bg-amber-500 hover:bg-amber-300">Get Started!</button>
      </div>
        <img src="homeimg.png" alt="CuisineHub chefs cooking!" className="homeImg"/>
      </div>
      <Footer/>
    </>
  );
}
