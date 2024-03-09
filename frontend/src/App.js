import { Routes, Route, Outlet, useNavigate, useLocation } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import RecipeDetail from './pages/RecipeDetail';
import Recipes from './components/Recipes';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { isAuthenticated } from './utils/authService';
import { useEffect } from 'react';

function Layout(){
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

function App() {
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (
      (location.pathname === '/recipes' || location.pathname.startsWith('/recipes/') || location.pathname==="/") &&
      !isAuthenticated()
    ) {
      navigate('/login');
    }
  }, [location.pathname]);

  return (
    <div className="bg-black">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/:id" element={<RecipeDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Registration />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
