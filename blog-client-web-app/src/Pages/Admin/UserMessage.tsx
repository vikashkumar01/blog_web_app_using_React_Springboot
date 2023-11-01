import { useEffect, useState } from 'react'
import AdminNavbar from "./AdminNavbar"
import NextAndPrevPage from "./NextAndPrevPage"
import { AiFillDelete, AiOutlineFolderView } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { messageWithPage } from '../../vite-env';
import { deleteUserMessage, getAllUserMessage } from '../../utils/features';
import {
  clearContactState,
  deleteContactMessageFails,
  deleteContactMessageRequest,
  deleteContactMessageSuccess,
  getAllContactMessageFails,
  getAllContactMessageRequest,
  getAllContactMessageSuccess
} from '../../Redux/ContactSlice';
import { toast } from 'react-toastify';

interface contactProps {
  contact: {
    isLoading: boolean,
    allMessage: messageWithPage,
    errMessage: string,
    dmessage: string
  }
}
const UserMessage = () => {

  const { isLoading, allMessage, errMessage, dmessage } = useSelector((state: contactProps) => state.contact)
  const dispatch = useDispatch()

  const [offset, setOffset] = useState<number>(0)
  const [openModel, setOpenModel] = useState<boolean>(false)
  const [userMessage, setUserMessage] = useState<string>('')

  useEffect(() => {
    dispatch(getAllContactMessageRequest())
    getAllUserMessage(offset).then((res) => {
      dispatch(getAllContactMessageSuccess(res.data))
    }).catch((err) => {
      console.log(err)
      dispatch(getAllContactMessageFails(err.message))
    })
  }, [dispatch, offset])

  useEffect(() => {
    if (errMessage) {
      toast.error(errMessage)
      dispatch(clearContactState())
    }
    if (dmessage) {
      toast.success(dmessage)
      dispatch(clearContactState())
    }
  }, [errMessage, dmessage, dispatch])

  const deleteContactMessageHandler = (id: string) => {
    dispatch(deleteContactMessageRequest())
    deleteUserMessage(id).then((res) => {
      dispatch(deleteContactMessageSuccess(res.data.message))
      getAllUserMessage().then((res) => {
        dispatch(getAllContactMessageSuccess(res.data))
      })
    }).catch((err) => {
      dispatch(deleteContactMessageFails(err.message))
    })
  }


  return (
    <div className="admin-container">
      <div className='admin-nav'>
        <AdminNavbar />
      </div>
      <main>
        {
          openModel ? <>
            <table>
              <tr>
                <td>{userMessage}</td>
                <td><button onClick={() => { setUserMessage(""), setOpenModel(false) }}>X</button></td>
              </tr>
            </table>
          </>
            :
            <>
              <h2>User Query</h2>
              <table>
                <tr>
                  <th>User_id</th>
                  <th>Name</th>
                  <th>email</th>
                  <th>message</th>
                  <th>Created_At</th>
                  <th>View</th>
                  <th>Delete</th>
                </tr>

                {
                  allMessage?.content?.map((mess, i: number) => (
                    <tr key={i}>
                      <td>{mess?.id}</td>
                      <td>{mess?.name}</td>
                      <td>{mess?.email}</td>
                      <td>{mess?.message}</td>
                      <td>{mess.created_At}</td>
                      <td><button onClick={() => { setUserMessage(mess?.message), setOpenModel(true) }}><AiOutlineFolderView /></button></td>
                      <td><button disabled={isLoading} onClick={() => deleteContactMessageHandler(mess.id)}>
                        {isLoading ? "..." : <AiFillDelete />}
                      </button></td>
                    </tr>
                  ))
                }

              </table>
              <footer>
                <NextAndPrevPage
                  totalPages={allMessage.totalPages}
                  firstPage={allMessage.first}
                  lastPage={allMessage.last}
                  pageable={allMessage.pageable}
                  setOffset={setOffset}
                />
              </footer>
            </>
        }

      </main>
    </div>
  )
}

export default UserMessage