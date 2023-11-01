import './blog.scss'
import { useEffect, useState } from 'react'
import NextAndPrev from './NextAndPrev'
import { useDispatch, useSelector } from 'react-redux'
import { postPropsType, postWithPage } from '../../vite-env'
import { getAllPost } from '../../utils/features'
import { Link } from 'react-router-dom'
import { getAllPostFails, getAllPostRequest, getAllPostSucceess } from '../../Redux/PostSlice'


interface props {
  post: {
    post: postWithPage,
    isLoading: boolean,
  }
}

const Blog = () => {

  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state: props) => state.post);
  const [offset, setOffset] = useState<number>(0)

  useEffect(() => {
    dispatch(getAllPostRequest())
    getAllPost(undefined, offset).then((res) => {
      dispatch(getAllPostSucceess(res.data));
    }).catch((err) => {
      dispatch(getAllPostFails(err.message));
    })
  }, [dispatch, offset])

  return (
    <>
      {
        post?.content?.length > 0 && post?.content?.map((blog: postPropsType, i) => (

          <div className="blog" key={i}>
            <div>
              <img src={blog?.postImgUrl} />
            </div>
            <div >
              <h1>{blog?.title} (<span>{blog.category.cateName}</span>)</h1>
              <h2>{blog?.subTitle}</h2>
              <p>{blog?.description.substring(0,60)}...</p>
              <h5>{blog?.createdAt?.substring(0,10)}</h5>
              <Link to={"/single-blog/" + blog?.id} >Read More...</Link>
            </div>
          </div>

        ))
      }
      {
        isLoading && <span>Loading...</span>
      }
      <NextAndPrev
        totalPages={post?.totalPages}
        firstPage={post?.first}
        lastPage={post?.last}
        pageable={post?.pageable}
        setOffset={setOffset}
      />
    </>
  )
}

export default Blog