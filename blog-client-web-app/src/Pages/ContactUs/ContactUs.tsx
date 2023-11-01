
import './contactus.scss'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  clearContactState,
  createContactMessageFails,
  createContactMessageRequest,
  createContactMessageSuccess,
  getAllContactMessageSuccess
} from '../../Redux/ContactSlice'
import { getAllUserMessage, sendUserMessage } from '../../utils/features'
import { toast } from 'react-toastify'

interface contactProps {
  contact: {
    cmessage: string,
    isLoading: boolean,
    errMessage: string
  }
}

const ContactUs = () => {
  const { cmessage, isLoading, errMessage } = useSelector((state: contactProps) => state.contact)
  const dispatch = useDispatch()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [userMessage, setUserMessage] = useState<string>('')

  const sendUserMessageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(createContactMessageRequest())
    sendUserMessage(name, email, userMessage).then((res) => {
      dispatch(createContactMessageSuccess(res.data.message))
      getAllUserMessage().then((res) => {
        dispatch(getAllContactMessageSuccess(res.data))
      })
    }).catch((err) => {
      dispatch(createContactMessageFails(err.message))
    })

  }

  useEffect(() => {
    if (cmessage) {
      toast.success(cmessage)
      dispatch(clearContactState())
    }
    if (errMessage) {
      toast.error(errMessage)
      dispatch(clearContactState())
    }
  }, [cmessage, errMessage, dispatch])


  return (
    <div className='contact-container'>
      <div>
        <label>Enter the Name</label>
        <input type="text" placeholder='Enter the name' onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Enter the Email</label>
        <input type="email" placeholder='Enter the Email' onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div style={{ height: '20rem' }}>
        <label htmlFor="">Enter the Message</label>
        <textarea placeholder='Enter the Message' onChange={(e) => setUserMessage(e.target.value)} />
      </div>
      <div>
        <button disabled={name === "" || email === "" || userMessage === "" || isLoading}
          onClick={sendUserMessageHandler}>
          {isLoading ? "Loading..." : "Send"}
        </button>
      </div>

    </div>
  )
}

export default ContactUs