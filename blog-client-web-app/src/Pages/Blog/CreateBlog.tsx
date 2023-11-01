
import './create&update.scss'
import { useState,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { categoryPropsType, errorPostPropsType } from '../../vite-env'
import { createPostRequest, createPostSucceess,createPostFails, postClearState } from '../../Redux/PostSlice'
import { createPost, getUser } from '../../utils/features'
import { toast } from 'react-toastify'
import { userSuccess } from '../../Redux/UserSlice'

interface props {
  post: {
    cmessage: string,
    isLoading: boolean,
    errorMessage: errorPostPropsType
  }
}

interface cateProps {
  category: {
    category: categoryPropsType[]
  }
}

const CreateBlog = () => {

  const { cmessage, isLoading, errorMessage } = useSelector((state: props) => state.post)
  const { category } = useSelector((state: cateProps) => state.category)
  const dispatch = useDispatch()
  const [image, setImage] = useState<File | null>(null)
  const [title, setTitle] = useState<string>('')
  const [subTitle, setSubTitle] = useState<string>('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.[0]) {
      setImage(event.target.files[0]);
    }
  }

  const onOptionChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(event.target.value);

  };

  const createBlogHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formDate = new FormData()
    formDate.append('title', title)
    formDate.append('subtitle', subTitle)
    formDate.append('description', description)
    formDate.append('categoryId', categoryId)
    if (image) {
      formDate.append('image', image)
    }

    dispatch(createPostRequest())
    createPost(formDate).then((res) => {
      dispatch(createPostSucceess(res.data.message))
      getUser().then((res) => {
        dispatch(userSuccess(res.data))
      })
    }).catch((err) => {
      dispatch(createPostFails(err))
    })

  }

  useEffect(()=>{
    if(errorMessage){
      toast.error(errorMessage.message)
      dispatch(postClearState())
    }
    if(cmessage){
      toast.success(cmessage)
      dispatch(postClearState())
    }
  },[errorMessage,cmessage,dispatch])

  return (
    <div className="create-blog-container">
      <form>
        <h1>Create Blog</h1>
        {image && <img src={URL.createObjectURL(image)} alt='Not Found' />}
        <div className='file'>
          <input type="file" name="uploadedFile"
            onChange={onImageChange}
          />
        </div>
        <div>
          <label>Blog-Title</label>
          <input type='text' placeholder="Enter the blog title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Blog-SubTitle</label>
          <input type='text' placeholder="Enter the blog subtitle"
            onChange={(e) => setSubTitle(e.target.value)} />
        </div>
        <div>
          <label>Blog-Description</label>
          <textarea placeholder="Enter the blog description"
            onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Select Category</label>
          <select onChange={onOptionChangeHandler}>
            <option>choose Category</option>
            {

              category?.map((item: categoryPropsType, i: number) => (
                <option key={i} value={item.id}>{item.cateName}</option>
              ))
            }
          </select>
        </div>
        <div>
          <button disabled={!image || !title || !subTitle || !description || !categoryId}
           onClick={createBlogHandler}>
            {isLoading?"Loading...":"Create-Blog"}
            </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog