import './errorpage.scss'
import { Link } from 'react-router-dom'



const ErrorPage = () => {
  return (
    <div className='errorPage'>
        <h1>404 Page Not Found</h1>
        <Link to={"/"}>Go to Home Page</Link>
    </div>
  )
}

export default ErrorPage