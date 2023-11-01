import { useEffect,useState } from "react";
import { Link } from "react-router-dom"
import AdminNavbar from "./AdminNavbar"
import { AiOutlineFolderView, AiFillDelete } from 'react-icons/ai';
import { useSelector, useDispatch } from "react-redux";
import { errorPostPropsType, postPropsType, postWithPage } from "../../vite-env";
import { deletePostById, getAllPost, getDashBoardData } from "../../utils/features";
import { deletePostByIdFails, deletePostByIdRequest, deletePostByIdSucceess, getAllPostFails, getAllPostRequest, getAllPostSucceess, postClearState } from "../../Redux/PostSlice";
import { toast } from "react-toastify";
import { getDashBoardDataSuccess } from "../../Redux/AdminSlice";
import NextAndPrevPage from "./NextAndPrevPage";

interface postProps {
  post: {
    post: postWithPage,
    isLoading: boolean,
    errMessage: errorPostPropsType,
    dpmessage: string
  }
}

const AdminPost = () => {

  const { post, dpmessage, isLoading, errMessage } = useSelector((state: postProps) => state.post)
  const dispatch = useDispatch()
  const [offset,setOffset] = useState<number>(0)

  const deletePostHandler = (id: string) => {
    dispatch(deletePostByIdRequest())
    deletePostById(id).then((res) => {
      dispatch(deletePostByIdSucceess(res.data.message))
      getAllPost().then((res) => {
        dispatch(getAllPostSucceess(res.data))
      })
      getDashBoardData().then((res) => {
        dispatch(getDashBoardDataSuccess(res.data))
      })
    }).catch((err) => {
      dispatch(deletePostByIdFails(err))
    })
  }

  useEffect(() => {
    dispatch(getAllPostRequest())
    getAllPost(undefined,offset).then((res) => {
      dispatch(getAllPostSucceess(res.data));
    }).catch((err) => {
      dispatch(getAllPostFails(err.message));
    })
  }, [dispatch,offset])

  useEffect(() => {
    if (dpmessage) {
      toast.success(dpmessage)
      dispatch(postClearState())
    }

    if (errMessage) {
      toast.error(errMessage.message)
      dispatch(postClearState())
    }
  }, [dispatch, dpmessage, errMessage])


  return (
    <div className="admin-container">
      <div className='admin-nav'>
        <AdminNavbar />
      </div>
      <main>
        <h2>All Blog</h2>
        <table>
          <tr>
            <th>Post_id</th>
            <th>Img</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Description</th>
            <th>Created_At</th>
            <th>Updated_At</th>
            <th>View</th>
            <th>Delete</th>
          </tr>

          {
            post?.content?.map((blog: postPropsType, i: number) => (
              <tr key={i}>
                <td>{blog?.id}</td>
                <td><img src={blog?.postImgUrl} alt="" /></td>
                <td>{blog?.title.substring(0, 10)}</td>
                <td>{blog?.subTitle.substring(0, 10)}</td>
                <td>{blog?.description.substring(0, 10)}</td>
                <td>{blog?.createdAt.substring(0, 10)}</td>
                <td>{blog?.updatedAt.substring(0, 10)}</td>
                <td><Link to={`/single-blog/${blog?.id}`}><AiOutlineFolderView /></Link></td>
                <td><button disabled={isLoading} onClick={() => deletePostHandler(blog?.id)}>
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
            totalPages={post.totalPages}
            firstPage={post.first}
            lastPage={post.last}
            pageable={post.pageable}
            setOffset={setOffset}
          />
        </footer>
      </main>
    </div>
  )
}

export default AdminPost