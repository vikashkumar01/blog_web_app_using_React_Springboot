import { Link, useLocation } from 'react-router-dom'
import './admin.scss'

import {
  BiSolidDashboard,
  BiLogoBlogger,
  BiCategory,
  BiUserCircle,
  BiSolidContact
} from 'react-icons/bi';

const AdminNavbar = () => {
  const location = useLocation()
  return (
    <>
      <Link to={"/admin/dashboard"}
        style={location.pathname === '/admin/dashboard' ? {
          backgroundColor: '#f2f2f2'
        } : undefined}><BiSolidDashboard /><span>Dashboard</span>
      </Link>

      <Link to={'/admin/blog'}
        style={location.pathname === '/admin/blog' ? {
          backgroundColor: '#f2f2f2'
        } : undefined}
      ><BiLogoBlogger /><span>Blog</span>
      </Link>

      <Link to={'/admin/user'}
        style={location.pathname === '/admin/user' ? {
          backgroundColor: '#f2f2f2'
        } : undefined}
      ><BiUserCircle /><span>User</span>
      </Link>

      <Link to={'/admin/category'}
        style={location.pathname === '/admin/category' ? {
          backgroundColor: '#f2f2f2'
        } : undefined}
      ><BiCategory /><span>Category</span></Link>

      <Link to={'/admin/usermessage'}
        style={location.pathname === '/admin/usermessage' ? {
          backgroundColor: '#f2f2f2'
        } : undefined}
      ><BiSolidContact /><span>UserMessage</span></Link>
    </>
  )
}

export default AdminNavbar