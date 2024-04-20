import React from "react";
import "../styles/View.css";

export default function ViewRecipes({ recipes }) {

  recipes.forEach(recipe => {
    console.log(recipe.title);
    console.log(recipe.imageUrl);
  });

  return (
    <>
      <h1 className="text-center mt-8 mb-8">View Recipes</h1>
      <div className="recipe-container">
        <div className="recipe-card">
          {recipes &&
            recipes.map((recipe) => (
              <div key={recipe.id} className="">
                <h2>{recipe.title}</h2>
                <p>{recipe.id}</p>
                <img
                  src={recipe.imageUrl ? recipe.imageUrl : "default.png"}
                  alt={"Image of " + recipe.title + "."}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
