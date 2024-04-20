import React, { useState, useEffect } from "react";
import axios from "axios";
import ViewRecipes from "../pages/ViewRecipes";

export default function Search() {
  const [search, setSearch] = useState("");
  // const [recipes, setRecipes] = useState([])

  const [recipes, setRecipes] = useState(() => {
    // Initialize recipes from localStorage if available
    const storedRecipes = localStorage.getItem("recipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });

  useEffect(() => {
    // Save recipes to localStorage whenever it changes
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Make a request to your backend API with the search query
    try {
      const response = await axios.get(`/api/search?query=${search}`);
      setRecipes(response.data)
      console.log(response.data); // Log the response from the backend
      // Handle the response data as needed (e.g., update state to display results)
    } catch (error) {
      console.error("Error searching for recipes:", error);
      // Handle errors (e.g., display an error message to the user)
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value); // Update the search state as the user types
  };

  return (
    <>
      <form className="flex justify-center items-center" onSubmit={handleSearch}>
        <input
          className="rounded-lg w-96 border-2 border-slate-500 ml-2 p-1"
          type="text"
          name="recipe"
          placeholder="Search Recipes..."
          value={search}
          onChange={handleChange} // Call handleChange when the input value changes
        />
        <button type="submit" className="border-2 px-2 py-2 rounded-lg">
          Search
        </button>
      </form>
      <ViewRecipes recipes={recipes}/>

    </>
  );
}


