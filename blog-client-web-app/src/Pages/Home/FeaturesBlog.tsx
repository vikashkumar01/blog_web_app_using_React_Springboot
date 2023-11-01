
import './Home.scss'
import { useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { postWithPage } from '../../vite-env';
import { getLatestPost } from '../../utils/features';
import { getLatestPostFails, getLatestPostRequest, getLatestPostSucceess } from '../../Redux/PostSlice';

interface props {
    post: {
        latestPost: postWithPage
    }
}
const FeaturesBlog = () => {

    const { latestPost } = useSelector((state: props) => state.post)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLatestPostRequest())
        getLatestPost().then((res) => {
            dispatch(getLatestPostSucceess(res.data))
        }).catch((err) => {
            dispatch(getLatestPostFails(err.message))
        })
    }, [dispatch])

    return (
        <div className="carousel-container">
            <Carousel
                autoPlay={true}
                interval={2000}
                infiniteLoop={true}
                width={'100%'}
                showThumbs={false}
                showArrows={true}
                showStatus={false}

            >

                {
                    latestPost?.content?.slice(0, 3).map((blog, i) => (
                        <div className="fblog" key={i}>

                            <div>
                                <h3>
                                    {blog.title}
                                </h3>
                                <h5>
                                    {blog.subTitle}
                                </h5>
                                <p>
                                    {blog.description}
                                </p>
                            </div>

                            <div>
                                <img src={blog.postImgUrl} />
                            </div>


                        </div>
                    ))
                }

            </Carousel>

        </div>
    )
}

export default FeaturesBlog