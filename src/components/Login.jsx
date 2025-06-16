import React, { useState } from 'react'
import noImage from '../image/default.jpg'
import logo from '../image/CommunityHub logo.png'
import Footer from './Footer'
import { useNavigate } from 'react-router'
import {jwtDecode} from 'jwt-decode';
import { toast } from "react-toastify";




const Login = () => {
    const [credentials,setCredentials] = useState({email:"",password:"",type:""});

    const navigator = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(credentials);
        const {email,password,type} = credentials;
        try {
            const URL = `http://localhost:4000/api/v1/${type}/login`
            const response = await fetch(URL,{
                method:"POST",
                headers:{
                        "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const json = await response.json();
            if(response.ok){
                localStorage.setItem('token',json.authToken);
                const decodedToken = jwtDecode(json.authToken);
                console.log("decoded token : ",decodedToken);
                if(type==='admin'){
                    localStorage.setItem('adminId',decodedToken.admins.id);
                    toast.success(json.message);
                    navigator('/admin-page');
                    
                }else{
                    localStorage.setItem('userId',decodedToken.users.id);
                    if(json.message==="Your account is pending approval by admin."){
                        toast.error(json.message);
                    }else{
                        toast.success(json.message);
                        navigator('/user-page');
                    }
                }
            }
        } catch (error) {
            console.log("error",error)
        }
    }


    const handleChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <>
        <div className='container d-flex justify-content-center align-items-center vh-100 mb-5'>
            <div className='card p-5' style={{width:"100%", maxWidth:"500px", boxShadow:"0px 0px 60px #7fcaf0"}}>
                <img src={logo} alt="logo"  className="img-fluid d-block mx-auto mb-3" style={{ width: "150px", height: "auto" }} />
                <h1>Welcome back,</h1>
                <hr/>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" placeholder='xyz@gmail.com' id="email" name='email' aria-describedby="emailHelp" onChange={handleChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label d-block">Gender</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="type" id="admin" value="admin" onChange={handleChange} style={{cursor:"pointer"}}/>
                            <label className="form-check-label" htmlFor="male">Admin</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="type" id="user" value="user" onChange={handleChange} style={{cursor:"pointer"}} />
                            <label className="form-check-label" htmlFor="female">User</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Login
