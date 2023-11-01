import { errorCategoryPropsType } from '../../vite-env'
import './CreateUpdateCategory.scss'
import {useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { clearCategoryState, createCategoryFails, createCategoryRequest, createCategorySuccess, getAllAdminCategorySuccess } from '../../Redux/CategorySlice'
import { createCategory, getAllAdminCategory, getDashBoardData } from '../../utils/features'
import { getDashBoardDataSuccess } from '../../Redux/AdminSlice'

interface categoryProps{
   category:{
    cmessage:string,
    errMessage:errorCategoryPropsType,
    isLoading:boolean
   }

}
const CreateCategory = () => {
 
  const {cmessage,isLoading,errMessage} = useSelector((state:categoryProps)=>state.category)
  const dispatch = useDispatch()
  const [name,setName] = useState<string>('')
  
  const createCategoryHandler = (e:React.MouseEvent<HTMLButtonElement> ) =>{
       e.preventDefault()
       dispatch(createCategoryRequest())
       createCategory(name).then((res)=>{
        dispatch(createCategorySuccess(res.data.message))
        getDashBoardData().then((res)=>{
          dispatch(getDashBoardDataSuccess(res.data))
         })
         getAllAdminCategory().then((res) => {
          dispatch(getAllAdminCategorySuccess(res.data))
        })
       }).catch((err)=>{
        dispatch(createCategoryFails(err.message))
       })
       
  } 


  useEffect(()=>{
    if(cmessage){
      toast.success(cmessage)
      dispatch(clearCategoryState())
    }
  },[dispatch,cmessage])

  return (
    <div className="create-update-category">
      <form>
        <h2>Create Category</h2>
        <div>
          <label>Category Name</label>
          <input type="text" placeholder="Enter Category Name"
          onChange={(e)=>setName(e.target.value)} />
          {errMessage && <span>{errMessage.message}</span>}
        </div>
        <div>
          <button disabled={isLoading} onClick={createCategoryHandler}>
            {isLoading?"Loading...":"Create-Category"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCategory