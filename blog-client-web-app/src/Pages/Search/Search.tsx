
import { useState, useEffect } from 'react'
import './search.scss'
import { searchPost } from '../../utils/features'
import { useSelector, useDispatch } from 'react-redux'
import { getSearchPostFails, getSearchPostRequest, getSearchPostSucceess } from '../../Redux/PostSlice'
import { postPropsType, postWithPage } from '../../vite-env'
import { Link } from 'react-router-dom'

interface props {
  post: {
    searchedPost: postWithPage
  }
}
const Search = () => {

  const { searchedPost } = useSelector((state: props) => state.post)
  const dispatch = useDispatch()
  const [searchKey, setSearchKey] = useState<string>("")

  useEffect(() => {
    if (searchKey !== "") {
      dispatch(getSearchPostRequest())
      searchPost(searchKey).then((res) => {
        dispatch(getSearchPostSucceess(res.data))
      }).catch((err) => {
        dispatch(getSearchPostFails(err.message))
      })
    } else {
      dispatch(getSearchPostSucceess(null))
    }
  }, [searchKey, dispatch])


  return (
    <div className='search-container'>

      <div>
        <span>Search-Blog</span>
        <input type="text"
          placeholder='search-blog'
          onChange={(e) => setSearchKey(e.target.value)} />
      </div>

      <div>
        {searchedPost?.content?.length === 0 && <span>No Blog Found</span>}
        {
          searchedPost?.content?.length > 0 && searchedPost?.content?.map((blog: postPropsType, i: number) => (
            <div key={i}>
             
              <div>
                <h1>{blog.title} ({blog?.category?.cateName})</h1>
                <h2>{blog.subTitle}</h2>
                <h4>{blog.createdAt.substring(0, 10)}</h4>
                <Link to={`/single-blog/${blog?.id}`}>Read More...</Link>
              </div>
              <div>
                <img src={blog?.postImgUrl} alt="not_found" />
              </div>
            </div>
          ))
        }

      </div>

    </div>
  )
}

export default Search