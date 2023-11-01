
import './profile.scss'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { errorUserMessage, userPropsType } from '../../vite-env'
import { updateUserFails, updateUserRequest, updateUserSuccess, userClearState, userSuccess } from '../../Redux/UserSlice'
import { getUser, updateUserById } from '../../utils/features'
import { toast } from 'react-toastify'

interface props {
  user: {
    user: userPropsType,
    isLoading: boolean,
    umessage: string,
    errorMessage: errorUserMessage
  }
}

const UpdateProfile = () => {

  const { id } = useParams()

  const { user, umessage, isLoading, errorMessage } = useSelector((state: props) => state.user)
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState<string>(user?.firstName)
  const [lastName, setLastName] = useState<string>(user?.lastName)
  const [email, setEmail] = useState<string>(user?.email)

  const updateHandle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(updateUserRequest())
    updateUserById(firstName, lastName, email, id).then((res) => {
      dispatch(updateUserSuccess(res.data.message))
      getUser().then((res) => {
        dispatch(userSuccess(res.data))
      })
    }).catch((err) => {
      dispatch(updateUserFails(err.errorMessage))
    })
  }

  useEffect(() => {
     if(umessage){
      toast.success(umessage)
      dispatch(userClearState())
     }
  }, [umessage,dispatch])

  return (
    <div className='update-profile-container'>
      <form className='form-container'>
        <span>Update-Profile</span>
        <div>
          <label>First Name</label>
          <input type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <span>{errorMessage?.firstName}</span>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <span>{errorMessage?.lastName}</span>
        </div>
        <div>
          <label>Email</label>
          <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>{errorMessage?.email}</span>
        </div>
        <div>
          <button disabled={!firstName || !lastName || !email}
            onClick={updateHandle}
          >{isLoading?"Loading...":"Update-profile"}</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfile