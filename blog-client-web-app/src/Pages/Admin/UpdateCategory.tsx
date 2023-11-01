import './CreateUpdateCategory.scss'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  categoryPropsType,
  errorCategoryPropsType
} from '../../vite-env'
import {
  clearCategoryState,
  getAllCategorySuccess,
  getCategoryByIdFails,
  getCategoryByIdRequest,
  getCategoryByIdSuccess,
  upadateCategoryRequest,
  updateCategoryFails,
  updateCategorySuccess
} from '../../Redux/CategorySlice'
import {
  getAllCategory,
  getCategoryById,
  updateCategory
} from '../../utils/features'

interface categoryProps {
  category: {
    scategory: categoryPropsType,
    umessage: string,
    isLoading: boolean,
    errMessage: errorCategoryPropsType
  }
}

const UpdateCategory = () => {

  const { umessage, scategory, errMessage, isLoading } = useSelector((state: categoryProps) => state.category)
  const dispatch = useDispatch()
  const cateId = useParams()
  const [name, setName] = useState<string>()

  const updateCategoryHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(upadateCategoryRequest())
    updateCategory(name, cateId.id).then((res) => {
      dispatch(updateCategorySuccess(res.data.message))
      getAllCategory().then((res) => {
        dispatch(getAllCategorySuccess(res.data))
      })
    }).catch((err) => {
      dispatch(updateCategoryFails(err))
    })
  }

  useEffect(() => {
    if (scategory) {
      if (scategory?.id === cateId.id) {
        setName(scategory.cateName)
      } else {
        dispatch(getCategoryByIdRequest())
        getCategoryById(cateId.id).then((res) => {
          dispatch(getCategoryByIdSuccess(res.data))
        }).catch((err) => {
          dispatch(getCategoryByIdFails(err))
        })
      }
    } else {
      dispatch(getCategoryByIdRequest())
      getCategoryById(cateId.id).then((res) => {
        dispatch(getCategoryByIdSuccess(res.data))
      }).catch((err) => {
        dispatch(getCategoryByIdFails(err))
      })
    }
  }, [cateId, scategory, dispatch])

  useEffect(() => {
    if (umessage) {
      toast.success(umessage)
      dispatch(clearCategoryState())
    }
    if (errMessage) {
      toast.error(errMessage.message)
    }
  }, [umessage, dispatch, errMessage])

  return (
    <div className="create-update-category">
      <form>
        <h2>Update Category</h2>
        <div>
          <label>Category Name</label>
          <input type="text"
            placeholder="Enter Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <button disabled={isLoading}
            onClick={updateCategoryHandler}
          >{isLoading ? "Loading..." : "Update-Category"}</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateCategory