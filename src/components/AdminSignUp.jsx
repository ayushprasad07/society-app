import React, { useState } from 'react'
import Footer from './Footer'
import logo from '../image/CommunityHub logo.png'
import noImage from '../image/default.jpg'
import { useNavigate } from 'react-router'
import './AdminSignUp.css'

const AdminSignUp = (props) => {
    const [credentials,setCredentials] = useState({name:"",email:"",password:"",gender:""})
    const [file,setFile] = useState(null);

    const navigator = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(credentials);
        props.setProgress(10);
        const {name,email,password,gender} = credentials;
        const fromData = new FormData();
        fromData.append('name',name);
        fromData.append('email',email);
        fromData.append('password',password);
        fromData.append('gender',gender);
        if(file){
            fromData.append('adminImage',file);
        }
        props.setProgress(40);
        try {
            const URL = 'http://localhost:4000/api/v1/admin/signUp';
            const response = await fetch(URL,{
                method:"POST",
                body:fromData
            })
            const json = await response.json();
            props.setProgress(70);
            if(response.ok){
                localStorage.setItem('token',json.authToken);
                localStorage.setItem('adminId',json.admin._id);
                props.setProgress(100);
                navigator('/admin-page');
            }
        } catch (error) {
            props.setProgress(100);
            console.log("An error occured ",error);
        }
    }

    const onChange=(e)=>{
        if(e.target.name==='adminImage'){
            setFile(e.target.files[0])
        }else{
            setCredentials({...credentials,[e.target.name]:e.target.value});
        }
    }
  return (
    <>
        <div className='container d-flex justify-content-center align-items-center' style={{marginTop:"70px",marginBottom:"50px"}}>
            <div className="card p-4"  style={{
                        width:"100%", maxWidth:"500px",boxShadow:"0px 0px 20px white"
                    }}>
                <img 
                src={logo} 
                alt="TutorConnect Logo"
                className="img-fluid d-block mx-auto mb-3"
                style={{ width: "150px", height: "auto" }} 
                />
                <form onSubmit={handleSubmit}>
                    <h1>
                        Sign up to Continue
                    </h1>
                    <div className='mb-3'>
                        <div className='d-flex flex-column align-items-center'>
                            <div className='col-12 col-md-4 text-center mb-3'>
                                <img src={noImage} alt="Student" className="rounded-circle img-fluid" style={{ maxWidth: '100px', height: '100px', objectFit: 'cover' }} />
                            </div>
                        </div>
                        <label htmlFor="adminImage" className="form-label">Profile</label>
                        <input type="file" className="form-control" id="adminImage" name="adminImage" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label d-block">Gender</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={onChange}/>
                            <label className="form-check-label" htmlFor="male">Male</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" id="female" value="female" onChange={onChange}/>
                            <label className="form-check-label" htmlFor="female">Female</label>
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

export default AdminSignUp
