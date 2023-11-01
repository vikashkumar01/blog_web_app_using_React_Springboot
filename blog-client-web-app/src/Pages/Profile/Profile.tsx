import { useEffect, useState } from 'react';
import './profile.scss'
import {
  AiFillEdit,
  AiFillFileImage,
  AiFillDelete,
  AiOutlineFolderView
} from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { errorPostPropsType, postPropsType, userPropsType } from '../../vite-env';
import { Link } from 'react-router-dom'
import {
  deleteUserFails,
  deleteUserRequest,
  deleteUserSuccess,
  uploadUserImageFails,
  uploadUserImageRequest,
  uploadUserImageSuccess,
  userClearState,
  userSuccess
} from '../../Redux/UserSlice';
import { toast } from 'react-toastify';
import {
  deletePostById,
  deleteUserById,
  getUser,
  uploadePostImage,
  uploadeUserImage
} from '../../utils/features';
import {
  deletePostByIdFails,
  deletePostByIdRequest,
  deletePostByIdSucceess,
  postClearState,
  updatePostImageFails,
  updatePostImageRequest,
  updatePostImageSucceess
} from '../../Redux/PostSlice';

interface props {
  user: {
    user: userPropsType,
    Imessage: string,
    dmessage: string,
    isLoading: boolean,
  }
}

interface deleteProps {
  post: {
    dpmessage: string,
    umessage: string,
    isLoading: boolean,
    errMessage: errorPostPropsType
  }
}

const Profile = () => {

  const { isLoading, user, dmessage, Imessage } = useSelector((state: props) => state.user)
  const { isLoading: ploading, dpmessage, umessage, errMessage } = useSelector((state: deleteProps) => state.post)

  const dispatch = useDispatch()
  const [image, setImage] = useState<File | null>(null);
  const [postImg, setPostImg] = useState<File | null>(null);
  const [postId,setPostId] = useState<string>('');

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  }

  const onPostImageChange = (event: React.ChangeEvent<HTMLInputElement>,postId:string) => {
    if (event.target.files && event.target.files[0]) {
      setPostImg(event.target.files[0]);
      setPostId(postId)
    }
  }

  useEffect(() => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      dispatch(uploadUserImageRequest())
      uploadeUserImage(formData, user?.id).then((res) => {
        dispatch(uploadUserImageSuccess(res.data.message))
        getUser().then((res) => {
          dispatch(userSuccess(res.data))
        })
        setImage(null)
      }).catch((err) => {
        dispatch(uploadUserImageFails(err.message))
        setImage(null)
      })
    }
  }, [image, dispatch, user])

  useEffect(() => {
    if (postImg) {
      const formData = new FormData();
      formData.append('image', postImg);
      dispatch(updatePostImageRequest())
      uploadePostImage(formData, postId).then((res) => {
        dispatch(updatePostImageSucceess(res.data.message))
        getUser().then((res) => {
          dispatch(userSuccess(res.data))
        })
        setPostImg(null)
        setPostId("")
      }).catch((err) => {
        dispatch(updatePostImageFails(err))
        setPostImg(null)
        setPostId("")
      })
    }
  }, [postImg, dispatch, postId])

  

  const deleteUser = (id: string) => {
    dispatch(deleteUserRequest())
    deleteUserById(id).then((res) => {
      dispatch(deleteUserSuccess(res.data.message))
      localStorage.removeItem('authToken')
      window.location.href = '/'
    }).catch((err) => {
      dispatch(deleteUserFails(err.message))
    })
  }

  const deleteBlogHandler = (id: string) => {
    dispatch(deletePostByIdRequest())
    deletePostById(id).then((res) => {
      dispatch(deletePostByIdSucceess(res.data.message))
      getUser().then((res) => {
        dispatch(userSuccess(res.data))
      })
    }).catch((err) => {
      dispatch(deletePostByIdFails(err.message))
    })
  }


  useEffect(() => {
    if (dmessage) {
      toast.success(dmessage)
      dispatch(userClearState())
    }
    if (Imessage) {
      toast.success(Imessage)
    }
    if (dpmessage) {
      toast.success(dpmessage)
      dispatch(postClearState())
    }
    if (umessage) {
      toast.success(umessage)
      dispatch(postClearState())
    }
    if (errMessage) {
      toast.error(errMessage.message)
    }
  }, [errMessage, dmessage, Imessage, dispatch, dpmessage, umessage])

  return (
    <div className="profile-container">

      <div>
        <div >
          {
            !user?.userPicUrl && <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="not_found" />
          }
          {
            user?.userPicUrl && <img src={user?.userPicUrl} alt="not_found" />
          }

          <label className="custom-file-upload">
            {
              isLoading ? <span>...</span> : <AiFillFileImage size={18} />
            }

            <input type="file" id="file-upload" name="file" onChange={onImageChange} />
          </label>
        </div>
        <aside>
          <h1>{user?.firstName} {user?.lastName}</h1>
          <h3>{user?.email}</h3>
          <h3>Blog-Creator</h3>
          <div>
            <div>
              <span>Edit User</span>
              <Link to={`/update-profile/${user?.id}`}><AiFillEdit /></Link>
            </div>
            <div>
              <span>Delete User</span>
              <button onClick={() => deleteUser(user?.id)}><AiFillDelete /></button>
            </div>

          </div>
        </aside>
      </div>

      <div>
        <div>
          <span>Total Blog</span>
          <h3>{user?.userPost?.length > 0 ? user?.userPost?.length : 0}</h3>
        </div>

        <div>
          <span>Create Blog</span>
          <Link to={`/create-blog`}><AiFillEdit /></Link>
        </div>
      </div>

      <div>
        <h3>Yours Blog</h3>

        {
          user?.userPost?.length === 0 && <span>Not Blog Found</span>
        }

        {
          user?.userPost?.length > 0 && user?.userPost?.slice(0, 5).map((blog: postPropsType, i: number) => (

            <div className='profile-blog' key={i}>
              <div >
                <img src={blog?.postImgUrl} alt="not_found" />
              </div>
              <div>
                <h1>{blog?.title} ({blog?.category?.cateName})</h1>
                <h2>{blog?.subTitle.substring(0,20)+"..."}</h2>
                <p>{blog?.description.substring(0,100)}</p>
                <h1>{blog?.createdAt.substring(0,10)}</h1>
                <div>
                  <Link to={`/single-blog/${blog?.id}`}><AiOutlineFolderView /></Link>
                  <Link to={`/update-blog/${blog?.id}`}><AiFillEdit /></Link>
                  <button onClick={() => deleteBlogHandler(blog?.id)}><AiFillDelete /></button>

                  {
                    <label className="custom-file-upload">
                      {
                        ploading ? <span>...</span> : <AiFillFileImage size={18} />
                      }

                      <input type="file" onChange={(e)=>onPostImageChange(e,blog?.id)} />
                    </label>
                  }

                </div>
              </div>

            </div>

          ))
        }

      </div>

    </div>
  )
}

export default Profile