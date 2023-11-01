
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { postPropsType, postWithPage } from '../../vite-env'
import './blog.scss'
import { useSelector, useDispatch } from 'react-redux'
import NextAndPrev from './NextAndPrev'
import { getLatestPostFails, getLatestPostRequest, getLatestPostSucceess } from '../../Redux/PostSlice'
import { getLatestPost } from '../../utils/features'

interface latestPostProps {
  post: {
    latestPost: postWithPage
    isLoading: boolean
  }
}
const AllLastestBlog = () => {

  const { latestPost,isLoading } = useSelector((state: latestPostProps) => state.post)

  const dispatch = useDispatch()

  const [offset,setOffset] = useState<number>(0)

  useEffect(() => {
    dispatch(getLatestPostRequest())
    getLatestPost(offset).then((res) => {
        dispatch(getLatestPostSucceess(res.data))
    }).catch((err) => {
        dispatch(getLatestPostFails(err.message))
    })
}, [dispatch,offset])


  return (
    <div className="all-Latest-Blog-Container">
      <span>All Latest Blog</span>
      
      <div>
        {
          latestPost?.content?.map((blog: postPropsType, i: number) => (
            <div key={i}>
              <div>
                <h1>{blog?.title} (<span>{blog?.category?.cateName}</span>)</h1>
                <h2>{blog?.subTitle}</h2>
                <p>{blog?.description.substring(0, 100)}...</p>
                <h5>{blog?.createdAt.substring(0, 10)}</h5>
                <Link to={`/single-blog/${blog?.id}`}>Read More...</Link>
              </div>
              <div>
                <img src={blog?.postImgUrl} alt="Not_found" />
              </div>
            </div>
          ))
        }
        {
          isLoading && <span>Loading...</span>
        }
        <footer>
          <NextAndPrev
           totalPages={latestPost?.totalPages}
           firstPage={latestPost?.first}
           lastPage={latestPost?.last}
           pageable={latestPost?.pageable}
           setOffset={setOffset}
           
          />
        </footer>

      </div>

    </div>
  )
}

export default AllLastestBlog