
import { useEffect } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai';
import './Navbar.scss'
import { useSelector, useDispatch } from 'react-redux';
import {
  logoutUserFails,
  logoutUserRequest,
  logoutUserSuccess,
  userClearState
} from '../Redux/UserSlice';
import { logoutuser } from '../utils/features';
import { toast } from 'react-toastify'

interface props {
  user: {
    isAuthenticated: boolean,
    isAdmin: boolean,
    smessage: string,
    errMessage: string
  }
}

const Navbar = () => {


  const { isAuthenticated, smessage, errMessage, isAdmin } = useSelector((state: props) => state.user)
  const dispatch = useDispatch()
  const navigation = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUserRequest())
    logoutuser().then((res) => {
      dispatch(logoutUserSuccess(res.data.message))
      localStorage.removeItem('authToken')
      navigation("/")
    }).catch((err) => {
      dispatch(logoutUserFails(err.message))
    })
  }

  useEffect(() => {
    if (smessage) {
      toast.success(smessage)
      dispatch(userClearState())
    }
    if (errMessage) {
      toast.error(errMessage)
      dispatch(userClearState())
    }
  }, [dispatch, smessage, errMessage])

  return (
    <nav>
      <div>
        <Link to={"/"}>
          VBlog
        </Link>
      </div>
      <div>
        <Link to={'/search'}>
          <span>Search</span>
          <AiOutlineSearch size={20} color={"grey"} />
        </Link>

        {
          isAuthenticated ?
            <>
              {
                isAdmin ? <Link to={'/admin/dashboard'}>
                  Dashboard
                </Link> : <Link to={'/profile'}>
                  Profile
                </Link>
              }

              <button onClick={logoutHandler}>
                Logout
              </button>
            </>
            :
            <>
              <Link to={'/signin'}>
                Sign In
              </Link>
              <Link to={'/signup'}>
                SignUp
              </Link>
            </>
        }

      </div>
    </nav>
  )
}

export default Navbar