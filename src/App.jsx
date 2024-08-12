import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import Navbar from "./components/NavBar"; // Import the Navbar component

const searchApi = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = async () => {
    setIsLoading(true);
    const url = searchApi + query;
    const res = await fetch(url);
    const data = await res.json();
    setRecipes(data.meals);
    setIsLoading(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchRecipes();
  };

  return (
    <Router>
      <>
        <Navbar /> {/* Replace old nav with the Navbar component */}
        <div className="container">
          <h2>Recipe-Z</h2>
          <SearchBar
            isLoading={isLoading}
            query={query}
            setQuery={setQuery}
            handleSubmit={handleSubmit}
          />
          <div className="recipes">
            {recipes ? (
              recipes.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))
            ) : (
              "No Results."
            )}
          </div>
        </div>

        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<h2>Dashboard</h2>} />
          <Route path="/add-recipe" element={<h2>Add Recipe</h2>} />
          <Route path="/profile" element={<h2>Profile</h2>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
