import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './auth.scss'
import { toast } from 'react-toastify';
import { sigupUser } from '../../utils/features';
import { useDispatch, useSelector } from 'react-redux';
import { signupCleartState, signupFails, signupRequest, signupSuccess } from '../../Redux/SignupSlice';
import { signupPropsType, errorMessagePropsType } from '../../vite-env';

interface props {
  signup: {
    user: signupPropsType | null;
    isLoading: boolean;
    errorMessage: errorMessagePropsType | null;
  }
}

const SignUp = () => {
  const { user, errorMessage, isLoading } = useSelector((state:props) => state.signup)
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(signupRequest())
    sigupUser(firstName, lastName, email, password).then((res) => {
      dispatch(signupSuccess(res.data))
    }).catch((err) => {
      dispatch(signupFails(err))
    })
  }


  useEffect(() => {
    if (user) {
      toast.success(user.message)
    }
    if (errorMessage) {
      toast.error(errorMessage.message)
    }

    setTimeout(()=>{
      dispatch(signupCleartState())
    },4000)
  }, [user, dispatch, errorMessage])

  return (
    <div className='auth-container'>
      <form>
        <span>SignUp</span>

        <div>
          <label>First Name</label>
          <input
            type="text"
            placeholder='Enter the First Name'
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errorMessage&&<span>{errorMessage?.firstName}</span>}
        </div>

        <div>
          <label>Enter the Last Name</label>
          <input
            type="text"
            placeholder='Enter the Last Name'
            onChange={(e) => setLastName(e.target.value)}
          />
          {errorMessage&&<span>{errorMessage?.lastName}</span>}
        </div>

        <div>
          <label>Enter the Email</label>
          <input
            type="email"
            placeholder='Enter the Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMessage&&<span>{errorMessage?.email}</span>}
        </div>

        <div>
          <label>Enter the password</label>
          <input
            type="password"
            placeholder='Enter the password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>


        <Link to={"/signin"}>Already SignUp? SignIn</Link>


        <div>
          <button
            disabled={!firstName || !lastName || !email || !password}
            onClick={signUpHandler}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUp