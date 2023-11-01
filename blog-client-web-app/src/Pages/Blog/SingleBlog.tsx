
import './singleBlog.scss'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { errorPostPropsType, postPropsType } from '../../vite-env'
import { useEffect } from 'react'
import { getPostByIdPostFails, getPostByIdRequest, getPostByIdSucceess, postClearState } from '../../Redux/PostSlice'
import { getPostById } from '../../utils/features'
import { toast } from 'react-toastify'

interface props {
    post: {
        singlePost: postPropsType,
        isLoading: boolean,
        errMessage: errorPostPropsType
    }
}
const SingleBlog = () => {

    const { singlePost, isLoading, errMessage } = useSelector((state: props) => state.post)
    const dispatch = useDispatch()
    const postId = useParams()

    useEffect(() => {
        dispatch(getPostByIdRequest())
        getPostById(postId.id).then((res) => {
            dispatch(getPostByIdSucceess(res.data))
        }).catch((err) => {
            dispatch(getPostByIdPostFails(err.message))
        })
    }, [postId, dispatch])

    useEffect(() => {
        if (errMessage) {
            toast.error(errMessage.message)
            dispatch(postClearState())
        }
    }, [errMessage, dispatch])

    return (
        <div className='single-blog-container'>
            {isLoading ? <span>Loading...</span> :
                <>
                    <div>
                        <span>{singlePost?.title}</span>
                    </div>

                    <div>
                        <h4>{singlePost?.createdAt?.substring(0, 10)}</h4>
                        <h4>{singlePost?.category?.cateName}</h4>
                    </div>

                    <div>
                        <img src={singlePost?.postImgUrl} alt="not_found" />
                    </div>

                    <div>
                        <h3>{singlePost?.subTitle}</h3>
                    </div>

                    <div>
                        <p>{singlePost?.description}</p>
                    </div>
                </>
            }



        </div>
    )
}

export default SingleBlog