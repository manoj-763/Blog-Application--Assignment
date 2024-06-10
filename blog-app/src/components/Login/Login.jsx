import { TextField, Button, Typography } from "@mui/material";
import styles from "./Login.module.css";
import { useState, useContext } from "react";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";




const loginIntialValues={
  username:'',
  password:''
}

const signupInitialValues ={
    name:'',
    username:'',
    password:''
}
// eslint-disable-next-line react/prop-types
const Login = ({isUserAuthenticated}) => {

    const [account,setToggleAccount] = useState("login")
    const [signup, setSignup] = useState(signupInitialValues)
    const [error, setError] = useState('')
    const [login, setLogin] = useState(loginIntialValues)

    const {setAccount} = useContext(DataContext)
    const navigate = useNavigate();

    const signUp = () =>{
        account === 'Sign up' ? setToggleAccount("login") : setToggleAccount('Sign up')
    }

    const onInputChange=(e)=>{
        setSignup({...signup, [e.target.name]:e.target.value})
    }

    const signupUser = async () => {
      let response = await API.userSignup(signup);
      if (response.isSuccess) {
          setError('');
          setSignup(signupInitialValues);
          setToggleAccount('login');
      } else {
          setError('Something went wrong! please try again later');
      }
  }

  const onValueChange=(e)=>{
    setLogin({...login, [e.target.name]: e.target.value})
  }

  const loginUser =async ()=>{
    let response =await API.userLogin(login);
    if(response.isSuccess){
      setError('')
      sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`)
      sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`)
      setAccount({username: response.data.username, name: response.data.name})

      isUserAuthenticated(true);
      navigate('/')
    }else{
      setError('Somthing went wrong please try again')
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h1>Blog-<span>App</span></h1>
        {
            account === "login" ?

        <div className={styles.boxElement}>
          <TextField variant="standard" value={login.username} onChange={(e)=> onValueChange(e)} name="username" label="Enter username"/>
          <TextField variant="standard" value={login.password} onChange={(e)=> onValueChange(e)} name="password" label="Enter password"/>
          <Button variant="contained" onClick={()=>loginUser()}>Login</Button>
          <Typography style={{textAlign:'center'}}>OR</Typography>
          <Button onClick={() => signUp()}>CREATE AN ACCOUNT</Button>
        </div>
        :
        <div className={styles.boxElement}>
          <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='name' label="Enter Name"/>
          <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='username' label="Enter Username"/>
          <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='password' label="Enter Password"/>

            {error && <Typography>{error}</Typography>}
          <Button variant="contained" onClick={()=> signupUser()}>Sign up</Button>
          <Typography style={{textAlign:'center'}}>OR</Typography>
          <Button onClick={() => signUp()}>Already have a account</Button>
        </div>
        }
      </div>
    </>
  );
};

export default Login;
