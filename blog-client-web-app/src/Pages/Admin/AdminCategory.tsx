
import AdminNavbar from "./AdminNavbar"
import { AiOutlineEdit, AiFillDelete } from 'react-icons/ai';
import { Link } from "react-router-dom"
import { CategoryWithPage, categoryPropsType, errorCategoryPropsType } from "../../vite-env";
import { useSelector, useDispatch } from "react-redux";
import {
  clearCategoryState,
  deleteCategoryFails,
  deleteCategoryRequest,
  deleteCategorySuccess,
  getAllAdminCategoryFails,
  getAllAdminCategoryRequest,
  getAllAdminCategorySuccess,
  getAllCategorySuccess
} from "../../Redux/CategorySlice";
import {
  deleteCategory,
  getAllAdminCategory,
  getAllCategory,
  getDashBoardData
} from "../../utils/features";
import { useEffect,useState } from "react";
import { toast } from "react-toastify";
import { getDashBoardDataSuccess } from "../../Redux/AdminSlice";
import NextAndPrevPage from "./NextAndPrevPage";
interface categoryProps {
  category: {
    aCategory: CategoryWithPage,
    dmessage: string,
    errMessage: errorCategoryPropsType,
    isLoading: boolean
  }
}

const AdminCategory = () => {

  const { isLoading, aCategory, dmessage, errMessage } = useSelector((state: categoryProps) => state.category)
  const dispatch = useDispatch()

  const [offset,setOffset] = useState<number>(0)

  const deleteCategoryHandler = (id: string) => {
    dispatch(deleteCategoryRequest())
    deleteCategory(id).then((res) => {
      dispatch(deleteCategorySuccess(res.data.message))
      getAllCategory().then((res) => {
        dispatch(getAllCategorySuccess(res.data));
      })
      getAllAdminCategory(offset).then((res) => {
        dispatch(getAllAdminCategorySuccess(res.data))
      })
      getDashBoardData().then((res) => {
        dispatch(getDashBoardDataSuccess(res.data))
      })
    }).catch((err) => {
      dispatch(deleteCategoryFails(err))
    })

  }

  useEffect(() => {
    dispatch(getAllAdminCategoryRequest())
    getAllAdminCategory(offset).then((res) => {
      dispatch(getAllAdminCategorySuccess(res.data))
    }).catch((err) => {
      dispatch(getAllAdminCategoryFails(err.message))
    })
  }, [dispatch,offset])

  useEffect(() => {
    if (dmessage) {
      toast.success(dmessage)
      dispatch(clearCategoryState())
    }

    if (errMessage) {
      toast.error(errMessage.message)
      dispatch(clearCategoryState())
    }
  }, [dmessage, dispatch, errMessage])


  return (
    <div className="admin-container">
      <div className='admin-nav'>
        <AdminNavbar />
      </div>
      <main>
        <div className="cate-heading">
          <h2>All Category</h2>
          <Link to={'/admin/category/create'}>Create</Link>
        </div>

        <table>
          <tr>
            <th>Category_id</th>
            <th>Category_Name</th>
            <th>Created_At</th>
            <th>Updated_At</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
          {
            aCategory?.content?.length > 0 && aCategory?.content?.map((cate: categoryPropsType, i: number) => (
              <tr key={i}>
                <td>{cate?.id}</td>
                <td>{cate?.cateName}</td>
                <td>{cate?.created_At?.substring(0, 10)}</td>
                <td>{cate?.updated_At?.substring(0, 10)}</td>
                <td><Link to={`/admin/update/category/${cate.id}`}><AiOutlineEdit /></Link></td>
                <td><button onClick={() => deleteCategoryHandler(cate?.id)}>
                  {
                    isLoading ? "..." : <AiFillDelete />
                  }

                </button></td>
              </tr>
            ))
          }
        </table>
        <footer>
          <NextAndPrevPage
            totalPages={aCategory.totalPages}
            firstPage={aCategory.first}
            lastPage={aCategory.last}
            pageable={aCategory.pageable}
            setOffset={setOffset}
          />
        </footer>
      </main>
    </div>
  )
}

export default AdminCategory