import { useEffect, useState } from 'react'
import {   createBrowserRouter,
  RouterProvider,
  Outlet, } from 'react-router-dom';

import Search from './components/Search/Search';
import Footer from './components/Footer/Footer';
import Single from './components/Single/Single';
import Loader from './components/Loader/Loader';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile';



import { FaArrowUp } from 'react-icons/fa';
import LoginForm from './pages/Auth/LoginForm';
import RegisterForm from './pages/Auth/RegisterForm';
import { UserContext } from './UserContext';
import Blogs from './pages/Blogs/Blogs';
import SingleBlog from './pages/Blogs/SingleBlog';
import Store from './pages/Store/Store';

import { useAuth } from '../firebase';
import Cart from './pages/Cart/Cart';
import Topnav from './components/Topnav/Topnav';
import NotFound from './pages/NotFound/NotFound';
import Order from './pages/Order/Order';


const Layout = () => {

  return (
    <>
      <Topnav />
      <Search />
      <Outlet />
      <Footer />
      <button className="btn-top" onClick={() => {window.scrollTo(0, 0);}} >
        <FaArrowUp/>
      </button>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/shop",
        element: <Store/>
      },
      {
        path: "/shop/:id",
        element: <Single />
      },
      {
        path: "/blogs",
        element: <Blogs/>
      },
      {
        path: "/blogs/:id",
        element: <SingleBlog />
      },
      {
        path: "/about-us",
        element: <About/>
      },
      {
        path: "/contact-us",
        element: <Contact />
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/checkout",
        element: <Order/>
      },
    ]
  },
  {
    path: "/login",
    element: <LoginForm />
  },
  {
    path: "/get-started",
    element: <RegisterForm/>
  },
  {
    path: "/profile/:username",
    element:<Profile />
  },
  {
        path: "/profile/:username/edit",
        element: <EditProfile/>
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

function App() {
  const [loading, setLoading] = useState(true);
  const signedUser = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(signedUser);
  }, [signedUser]);
  
  useEffect(() => {
    setTimeout(() =>{
      setLoading(!loading);
    }, 1500);
  }, []);
  
  return (
    <UserContext.Provider value={{user, setUser}} >
      {
        loading && <Loader />
      }
      {!loading && <RouterProvider router={router} />}
    </UserContext.Provider>
  )
}

export default App