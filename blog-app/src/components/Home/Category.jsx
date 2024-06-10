/* eslint-disable no-undef */
import "bootstrap/dist/css/bootstrap.min.css";
import { categories } from "../../constants/data";
import { Link, useSearchParams } from "react-router-dom";




const Category = () => {

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category')

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mb-3">
            <Link to={`/create?category=${category || ''}`}>
                <button className="btn btn-primary mt-3">Create Blog</button>
            </Link>
        </div>
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <Link to='/'><th scope="col">All Category</th></Link>
                
              </tr>
            </thead>
            {categories.map(category => (
              <tbody key={category.id}>
                <tr>
                    <Link to={`/?category=${category.type}`}><td>{category.type}</td></Link>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Category;
