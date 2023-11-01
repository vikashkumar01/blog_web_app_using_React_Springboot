
import { postPropsType, postWithPage } from '../../vite-env'
import './blog.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


interface props{
    post:{
        latestPost:postWithPage
    }
}
const RightBlog = () => {
     const {latestPost}  = useSelector((state:props) => state.post)

    return (
        <>
            {
                latestPost?.content?.map((blog:postPropsType, i) => (
                    <div className='right-blog' key={i}>
                        <span>0{i+1}.</span>
                        <div>
                            <h3>{blog?.title}</h3>
                            <h4>{blog?.subTitle}</h4>
                            <Link to={'/single-blog/'+blog.id}>Read More...</Link>
                        </div>
                        <div>
                            <img src={blog?.postImgUrl} alt="" />
                        </div>
                    </div>
                ))
            }
            {
                latestPost?.content?.length===0 && <span>No Blog Found</span>
            }

        </>

    )
}

export default RightBlog