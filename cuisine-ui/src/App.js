import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@fontsource/merriweather"; 
import "@fontsource/merriweather/400.css";
import "@fontsource/merriweather/400-italic.css"; 
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import UserProfile from "./pages/UserProfile";
import Favorites from "./pages/Favorites";
import Loading from "./components/Loading";
import useAuth from "./auth";
import SearchFood from "./pages/SearchFood";
import Details from "./pages/Details";

export default function App() {
  const { isAuthenticated, isLoading } = useAuth();
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
            <Route path="/" element={ isAuthenticated ? <SearchFood/> : <HomePage />} />
            <Route path='/favorite-recipes' element={<Favorites/>} />
            <Route path='/profile' element={<UserProfile/>} />
            <Route path="/details/:alias" element={<Details />} />
          </Routes>
    </BrowserRouter>
    </>
  )
}
