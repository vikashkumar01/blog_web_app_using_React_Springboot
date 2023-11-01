
import { useState, useEffect } from 'react'
import './Home.scss'
import { getAllCategory, getAllPost } from '../../utils/features'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoryFails, getAllCategoryRequest, getAllCategorySuccess } from '../../Redux/CategorySlice'
import { categoryPropsType } from '../../vite-env'
import { getAllPostFails, getAllPostRequest, getAllPostSucceess } from '../../Redux/PostSlice'


interface props {
    category: {
        category: categoryPropsType[],
    }
}

const CategoryMenu = () => {

    const dispatch = useDispatch();
    const { category } = useSelector((state: props) => state.category)

    const [activeCategory, setActiveCategory] = useState<number>(-1)

    useEffect(() => {
        dispatch(getAllCategoryRequest())
        getAllCategory().then((res) => {
            dispatch(getAllCategorySuccess(res.data))
        }).catch((err) => {
            dispatch(getAllCategoryFails(err.message))
        })
    }, [dispatch])

    const getPostByCategoryHandler = (cateName?:string) =>{
        dispatch(getAllPostRequest())
        getAllPost(cateName).then((res)=>{
            dispatch(getAllPostSucceess(res.data))
        }).catch((err)=>{dispatch(getAllPostFails(err.message))})
    }

    return (
        <div className="catemenu">
            <button
                style={activeCategory === -1 ? { backgroundColor: 'black', color: '#fff' } : undefined}
                onClick={() => {setActiveCategory(-1),getPostByCategoryHandler()}}
            >
                All
            </button>
            {
                category.length > 0 && category?.map((c: categoryPropsType, i: number) => (
                    <button key={i}
                        style={activeCategory === i ? { backgroundColor: 'black', color: '#fff' } : undefined}
                        onClick={() => {setActiveCategory(i), getPostByCategoryHandler(c.cateName)}}
                    >
                        {c.cateName}
                    </button>
                ))
            }
        </div>
    )
}

export default CategoryMenu