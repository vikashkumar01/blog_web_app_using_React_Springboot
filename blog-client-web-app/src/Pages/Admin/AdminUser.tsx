import { useEffect,useState } from 'react'
import AdminNavbar from "./AdminNavbar"
import { AiFillDelete } from 'react-icons/ai';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify'
import { errorUserMessage, rolesPropsType, userPropsType, userWithPage } from "../../vite-env";
import { deleteUserById, getAllUser, getDashBoardData } from '../../utils/features';
import { deleteUserFails, deleteUserRequest, deleteUserSuccess, 
  getAlluserFails, getAlluserRequest, getAlluserSuccess, getDashBoardDataSuccess, userClearState } from '../../Redux/AdminSlice';
import NextAndPrevPage from './NextAndPrevPage';

interface userProps {
  admin: {
    auser: userWithPage,
    isLoading: boolean,
    errMessage: errorUserMessage,
    dmessage: string,
  }
}
const AdminUser = () => {

  const { auser, dmessage, isLoading, errMessage } = useSelector((state: userProps) => state.admin)
  const dispatch = useDispatch()

  const [offset,setOffset] = useState<number>(0)

  useEffect(() => {
    dispatch(getAlluserRequest())
    getAllUser(offset).then((res) => {
      dispatch(getAlluserSuccess(res.data))
    }).catch((err) => {
      dispatch(getAlluserFails(err))
    })
  }, [dispatch,offset])

  const deleteUserHandler = (id: string) => {
    dispatch(deleteUserRequest())
    deleteUserById(id).then((res) => {
      dispatch(deleteUserSuccess(res.data.message))
      getAllUser().then((res) => {
        dispatch(getAlluserSuccess(res.data))})
        getDashBoardData().then((res)=>{
          dispatch(getDashBoardDataSuccess(res.data))
         })
    }).catch((err) => {
      dispatch(deleteUserFails(err.message))
    })
  }

  useEffect(() => {
    if (dmessage) {
      toast.success(dmessage)
      dispatch(userClearState())
    }

    if (errMessage) {
      toast.error(errMessage.message)
      dispatch(userClearState())
    }
  }, [dispatch, dmessage, errMessage])


  return (
    <div className="admin-container">
      <div className='admin-nav'>
        <AdminNavbar />
      </div>
      <main>
        <h2>All User</h2>
        <table>
          <tr>
            <th>User_id</th>
            <th>Image</th>
            <th>First_Name</th>
            <th>Last_Name</th>
            <th>Email</th>
            <th>Total_post</th>
            <th>Roles</th>
            <th>Created_At</th>
            <th>Updated_At</th>
            <th>Delete</th>
          </tr>
          {
            auser?.content?.length > 0 && auser?.content?.map((user: userPropsType, i: number) => (
              <tr key={i}>
                <td>{user?.id}</td>
                <td>{user?.userPicUrl === null ? "null" : <img src={user?.userPicUrl} alt="" />}</td>
                <td>{user?.firstName}</td>
                <td>{user?.lastName}</td>
                <td>{user?.email}</td>
                <td>{user?.userPost?.length}</td>
                <td>
                  {
                    user?.roles?.map((role: rolesPropsType, i: number) => (
                      <span key={i}>{role.name},</span>
                    ))
                  }
                </td>
                <td>{user?.created_At?.substring(0, 10)}</td>
                <td>{user?.updated_At?.substring(0, 10)}</td>
                <td><button disabled={isLoading} onClick={() => deleteUserHandler(user?.id)}>
                  {
                    isLoading ? "..." : <AiFillDelete />
                  }
                </button></td>
              </tr>
            ))
          }


        </table>
        <footer>
          <NextAndPrevPage
            totalPages={auser.totalPages}
            firstPage={auser.first}
            lastPage={auser.last}
            pageable={auser.pageable}
            setOffset={setOffset}
          />
        </footer>
      </main>
    </div>
  )
}

export default AdminUser