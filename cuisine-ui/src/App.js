import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fontsource/merriweather"; 
import "@fontsource/merriweather/400.css";
import "@fontsource/merriweather/400-italic.css"; 
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import UserProfile from "./pages/UserProfile";
import FavoriteRecipes from "./pages/FavoriteRecipes";
import Loading from "./components/Loading";
import Search from "./components/Search";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log(isAuthenticated)

  if(isLoading){
    return(
      <>
      <Loading/>
      </>
    )
  }

  return(
    <>
    <BrowserRouter>
    <Navbar/> 
    <Routes>
            <Route path="/" element={ isAuthenticated ? <Search/> : <HomePage />} />
            <Route path='/favorite-recipes' element={<FavoriteRecipes/>} />
            <Route path='/profile' element={<UserProfile/>} />
          </Routes>
    </BrowserRouter>
    </>
  )
}
