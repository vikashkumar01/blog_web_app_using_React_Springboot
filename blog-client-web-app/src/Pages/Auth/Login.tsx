
import { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './auth.scss'
import { errorMessageProps } from '../../vite-env';
import { useDispatch, useSelector } from 'react-redux'
import {  siginUser } from '../../utils/features';
import { userClearState, signinFails, signinRequest, signinSuccess } from '../../Redux/UserSlice';
import { toast } from 'react-toastify'

interface props {
  user: {
    smessage: string;
    isLoading: boolean;
    errorMessage: errorMessageProps | null;
  }
}

const Login = () => {

  const { smessage, errorMessage, isLoading } = useSelector((state: props) => state.user)
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(signinRequest())
    siginUser(email, password).then((res) => {
      dispatch(signinSuccess(res.data))
      localStorage.setItem('authToken', res.data.token)
      navigation('/')
    }).catch((err) => {
      dispatch(signinFails(err))
    })

  }

  useEffect(() => {

    if (smessage) {
      toast.success(smessage)
    }

    if (errorMessage?.message) {
      toast.error(errorMessage.message)
      dispatch(userClearState())
    }

  }, [dispatch, smessage, errorMessage])


  return (
    <div className='auth-container'>
      <form>
        <span>LogIn</span>
        <div>
          <label>Enter the Email</label>
          <input
            type="email"
            placeholder='Enter the Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          {
            errorMessage && <span>{errorMessage?.email}</span>
          }
        </div>

        <div>
          <label>Enter the Password</label>
          <input
            type="password"
            placeholder='Enter the password'
            onChange={(e) => setPassword(e.target.value)}
          />
          {
            errorMessage && <span>{errorMessage?.password}</span>
          }

        </div>

        <Link to={"/signup"}>New User? SignUp</Link>

        <div>
          <button disabled={email === "" || password === ''}
            onClick={loginHandler}
          >{isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login