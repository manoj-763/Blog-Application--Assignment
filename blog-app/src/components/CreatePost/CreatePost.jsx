import { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreatePost.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FormControl } from "@mui/material";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";
// import { categories } from "../../constants/data";

const initialPost={
    title:'',
    description:'',
    picture:'',
    username:'',
    categories: '',
    createdDate: new Date(),
}

const CreatePost = () => {
  
    const [post,setPost] = useState(initialPost)
    const [file, setFile] = useState('');
    const location = useLocation();
    const {account} = useContext(DataContext)

    const imageUrl =post.picture ? post.picture :"https://res.cloudinary.com/dbiapxs2s/image/upload/v1718004206/blog-app/5744010_olewoh.jpg";


    useEffect(() =>{
        const getImage =async () =>{
            if(file){
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file)

                // API Call
               const response = await API.uploadFile(data);
                post.picture = response.data
            }
        }
        getImage();
        post.categories = location.search?.split("=")[1] || 'All';
        post.username = account.username;
    }, [file])

    const handleChange = (e)=>{
        setPost({...post, [e.target.name]: e.target.value})
    }



  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 ">
            <img className="image" src={imageUrl} alt="blog-image" />
          </div>
          <div className=" mt-5 mb-5">
            <div className="col-12 col-md-2 ">
              <FormControl>
                <label htmlFor="fileInput">
                  <IoIosAddCircleOutline
                    style={{ fontSize: "35px", color: "action" }}
                  />
                </label>
                <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files[0])} />
              </FormControl>
            </div>
            <div className="col-12 col-md-8">
              <input className="w-75 border border-0" type="text" placeholder="Tittle" />
            </div>
            <div className="col-12 col-md-2">
              <button className="btn btn-primary w-100" onChange={(e)=> handleChange(e)} name='tittle'>Publish</button>
            </div>
          </div>
          <div className="col-12 col-md-12 ">
            <textarea className="w-100"  onChange={(e)=> handleChange(e)} name="description" rows="4" cols="50" placeholder="Tell your story....."/>   
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
