import { useEffect } from 'react';
import AdminNavbar from './AdminNavbar'
import './admin.scss'
import Chart from "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
import { useSelector,useDispatch } from 'react-redux';
import { dashboardPropsTypes } from '../../vite-env';
import { getDashBoardData } from '../../utils/features';
import { getDashBoardDataRequest, getDashBoardDataSuccess, getDashBoardDateFails } from '../../Redux/AdminSlice';

Chart.register(CategoryScale)

interface dashboardProps{
    admin:{
      dashboard:dashboardPropsTypes,
      isLoading:boolean,
      errMessage:string
    }
}

const Dashboard = () => {

  const {dashboard,isLoading,errMessage} = useSelector((state:dashboardProps)=>state.admin)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getDashBoardDataRequest())
     getDashBoardData().then((res)=>{
      dispatch(getDashBoardDataSuccess(res.data))
     }).catch((err)=>{
      dispatch(getDashBoardDateFails(err.message))
     })
  },[dispatch])

  if(isLoading){
    return <span>Loading...</span>
  }

  if(errMessage){
    return <span>Something went wrong</span>
  }

  const data = {
    labels: [
      'Blog',
      'User',
      'Category', 
    ],
    datasets: [{
      data: [dashboard?.postCount, dashboard?.userCount, dashboard.categoryCount],
      backgroundColor: [
        'rgb(245, 74, 74)',
        'rgb(59, 59, 252)',
        'rgb(255, 191, 73)'
      ],
      hoverOffset: 4
    }],
   
  };

  const chartOptions = {    
    responsive: true,
    maintainAspectRatio: false

  };

  


  return (
    <div className="admin-container">
      <div className='admin-nav'>
           <AdminNavbar/>
      </div>
      <main>
         <div>
          <div>
            <span>Total Blog</span>
            <h4>{dashboard?.postCount}</h4>
          </div>
          <div>
            <span>Total User</span>
            <h4>{dashboard?.userCount}</h4>
          </div>
          <div>
            <span>Total Category</span>
            <h4>{dashboard?.categoryCount}</h4>
          </div>
         </div>
         <aside>
           <Doughnut data={data}
           options={chartOptions}
           width={400}
           height={400}
           />
         </aside>
      </main>
    </div>
  )
}

export default Dashboard