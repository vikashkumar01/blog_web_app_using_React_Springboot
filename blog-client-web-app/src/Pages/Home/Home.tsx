import Blog from "../Blog/Blog"
import RightBlog from "../Blog/RightBlog"
import CategoryMenu from "./CategoryMenu"
import FeaturesBlog from "./FeaturesBlog"
import { Link } from "react-router-dom"
const Home = () => {
  return (
    <section>
      <CategoryMenu />

      <div className="latest-blog-container">
        <div className="latest-blog-heading">
          <h2>Latest Blog</h2>
          <Link to={"/all-latest-blog"}>View All</Link>
        </div>
        <FeaturesBlog />
      </div>

      <div className="blog-container">
        <h1>Blog</h1>
        <div>
          <div className="left-blog-container">
            <Blog />
          </div>
          <div className="right-blog-container">
            <h1>Latest Blog</h1>
            <RightBlog/>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Home