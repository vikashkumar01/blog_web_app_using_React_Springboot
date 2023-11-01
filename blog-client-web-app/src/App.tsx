import './App.scss'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import Home from "./Pages/Home/Home"
import Navbar from "./Component/Navbar"
import Footer from "./Component/Footer"
import Login from "./Pages/Auth/Login"
import SignUp from "./Pages/Auth/SignUp"
import Search from "./Pages/Search/Search"
import Profile from "./Pages/Profile/Profile"
import UpdateBlog from "./Pages/Blog/UpdateBlog"
import CreateBlog from "./Pages/Blog/CreateBlog"
import SingleBlog from "./Pages/Blog/SingleBlog"
import AllLastestBlog from './Pages/Blog/AllLastestBlog'
import UpdateProfile from './Pages/Profile/UpdateProfile'
import ErrorPage from './Component/ErrorPage'
import Dashboard from './Pages/Admin/Dashboard'
import AdminPost from './Pages/Admin/AdminPost'
import AdminUser from './Pages/Admin/AdminUser'
import AdminCategory from './Pages/Admin/AdminCategory'
import CreateCategory from './Pages/Admin/CreateCategory'
import UpdateCategory from './Pages/Admin/UpdateCategory'

import { useDispatch, useSelector } from "react-redux"
import { getUser } from './utils/features'
import { userClearState, userFails, userRequest, userSuccess } from './Redux/UserSlice'
import { errorUserMessage } from './vite-env'
import { toast } from 'react-toastify';
import UserMessage from './Pages/Admin/UserMessage'

interface props {
  user: {
    isAuthenticated: boolean,
    isAdmin: boolean,
    errorMessage: errorUserMessage
  }
}

function App() {
  const { isAuthenticated, isAdmin, errorMessage } = useSelector((state: props) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      dispatch(userRequest())
      getUser().then((res) => {
        dispatch(userSuccess(res.data))
      }).catch((err) => {
        dispatch(userFails(err))
        localStorage.removeItem('authToken')
      })
    }
  }, [dispatch])

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage.message)
      dispatch(userClearState())
    }
  }, [errorMessage, dispatch])


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/single-blog/:id" element={<SingleBlog />}/>
        <Route path="/all-latest-blog" element={<AllLastestBlog/>}/>
        <Route path="/signin" element={isAuthenticated ? <Navigate to={"/"} /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to={"/"} /> : <SignUp />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to={"/"} />} />
        <Route path="/update-blog/:id" element={isAuthenticated ? <UpdateBlog /> : <Navigate to={"/"} />} />
        <Route path="/update-profile/:id" element={isAuthenticated ? <UpdateProfile/> : <Navigate to={"/"} />} />
        <Route path="/create-blog" element={isAuthenticated ? <CreateBlog /> : <Navigate to={"/"} />} />
        <Route path="/admin/dashboard" element={(isAuthenticated && isAdmin) ? <Dashboard /> : <Navigate to={"/"}/>}/>
        <Route path="/admin/blog" element={(isAuthenticated && isAdmin)  ? <AdminPost /> : <Navigate to={"/"}/>}/>
        <Route path="/admin/user" element={(isAuthenticated && isAdmin)  ? <AdminUser/> : <Navigate to={"/"}/>}/>
        <Route path="/admin/category" element={(isAuthenticated && isAdmin) ? < AdminCategory/> : <Navigate to={"/"}/>}/>
        <Route path="/admin/category/create" element={(isAuthenticated && isAdmin)  ? < CreateCategory/> : <Navigate to={"/"}/>}/>
        <Route path="/admin/update/category/:id" element={(isAuthenticated && isAdmin)  ? < UpdateCategory/> : <Navigate to={"/"}/>}/>
        <Route path="/admin/usermessage" element={(isAuthenticated && isAdmin)  ? < UserMessage/> : <Navigate to={"/"}/>}/>
        
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
