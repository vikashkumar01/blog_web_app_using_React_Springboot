
import './create&update.scss'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPostByIdPostFails, getPostByIdRequest, getPostByIdSucceess, postClearState, updatePostFails, updatePostRequest, updatePostSucceess } from '../../Redux/PostSlice'
import { getPostById, updatePost } from '../../utils/features'
import { toast } from 'react-toastify'
import { errorPostPropsType, postPropsType } from '../../vite-env'

interface updateProps {
  post: {
    singlePost: postPropsType,
    umessage: string,
    errMessage: errorPostPropsType,
    isLoading: boolean
  }
}
const UpdateBlog = () => {

  const { umessage, singlePost, errMessage, isLoading } = useSelector((state: updateProps) => state.post)
  const dispatch = useDispatch()
  const postId = useParams()

  const [title, setTitle] = useState<string>('')
  const [subTitle, setSubTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const updateHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(updatePostRequest())
    updatePost(title, subTitle, description, postId?.id).then((res) => {
      dispatch(updatePostSucceess(res.data.message))
    }).catch((err) => {
      dispatch(updatePostFails(err))
    })
  }

  useEffect(() => {
    if (singlePost) {
      if (singlePost?.id === postId.id) {
        setTitle(singlePost.title)
        setSubTitle(singlePost.subTitle)
        setDescription(singlePost.description)
      } else {
        dispatch(getPostByIdRequest())
        getPostById(postId.id).then((res) => {
          dispatch(getPostByIdSucceess(res.data))
        }).catch((err) => {
          dispatch(getPostByIdPostFails(err.message))
        })
      }
    } else {
      dispatch(getPostByIdRequest())
      getPostById(postId.id).then((res) => {
        dispatch(getPostByIdSucceess(res.data))
      }).catch((err) => {
        dispatch(getPostByIdPostFails(err.message))
      })
    }

  }, [postId, dispatch, singlePost])

  useEffect(() => {
    if (errMessage) {
      toast.error(errMessage.message)
      dispatch(postClearState())
    }
    if (umessage) {
      toast.success(umessage)
      dispatch(postClearState())
    }
  }, [errMessage, dispatch, umessage])

  console.log(umessage)

  return (
    <div className="create-blog-container">
      <form>
        <h1>Update Blog</h1>
        <div>
          <label>Blog-Title</label>
          <input type='text'
            placeholder="Enter the blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Blog-SubTitle</label>
          <input type='text' placeholder="Enter the blog subtitle"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Blog-Description</label>
          <textarea placeholder="Enter the blog description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <button onClick={updateHandler}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "update-Blog"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateBlog