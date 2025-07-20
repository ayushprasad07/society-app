import React, { useState } from 'react'
import noImage from '../image/default.jpg'
import logo from '../image/CommunityHub logo.png'
import Footer from './Footer'
import { useNavigate } from 'react-router'
import {jwtDecode} from 'jwt-decode';
import { toast } from "react-toastify";
import { Link } from 'react-router'

const Login = (props) => {
    const [credentials,setCredentials] = useState({email:"",password:"",type:""});
    const [showPassword, setShowPassword] = useState(false);

    const navigator = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(credentials);
        props.setProgress(10);
        const {email,password,type} = credentials;
        try {
            const URL = `http://localhost:4000/api/v1/${type}/login`
            props.setProgress(40);
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
            props.setProgress(70);
            if(response.ok){
                localStorage.setItem('token',json.authToken);
                const decodedToken = jwtDecode(json.authToken);
                console.log("decoded token : ",decodedToken);
                if(type==='admin'){
                    props.setProgress(100);
                    localStorage.setItem('adminId',decodedToken.admins.id);
                    toast.success(json.message);
                    navigator('/admin-page');
                    
                }else{
                    localStorage.setItem('userId',decodedToken.users.id);
                    props.setProgress(100);
                    if(json.message==="Your account is pending approval by admin."){
                        toast.error(json.message);
                    }else{
                        toast.success(json.message);
                        navigator('/user-page');
                    }
                }
            }else{
                toast.error(json.message);
                props.setProgress(100);
            }
        } catch (error) {
            props.setProgress(100);
            console.log("error",error)
        }
    }

    const handleChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

  return (
    <>
        <div className='min-vh-100 d-flex align-items-center justify-content-center py-5' >
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4'>
                        <div className='card border-0 shadow-lg py-5 mt-5' style={{
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div className='card-body p-5'>
                                <div className='text-center mb-4'>
                                    <div className='position-relative d-inline-block'>
                                        <img 
                                            src={logo} 
                                            alt="logo"  
                                            className="img-fluid mb-3" 
                                            style={{ 
                                                width: "120px", 
                                                height: "auto",
                                                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                                            }} 
                                        />
                                    </div>
                                    <h2 className='fw-bold text-dark mb-1'>Welcome Back!</h2>
                                    <p className='text-muted mb-0'>Please sign in to your account</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input 
                                            type="email" 
                                            className="form-control border-0 shadow-sm" 
                                            id="email" 
                                            name='email' 
                                            placeholder="name@example.com" 
                                            aria-describedby="emailHelp" 
                                            onChange={handleChange}
                                            required
                                            style={{
                                                borderRadius: '15px',
                                                background: 'rgba(255, 255, 255, 0.8)',
                                                backdropFilter: 'blur(5px)'
                                            }}
                                        />
                                        <label htmlFor="email" className='text-muted'>
                                            <i className="bi bi-envelope me-2"></i>Email address
                                        </label>
                                    </div>

                                    {/* Password Field */}
                                    <div className="form-floating mb-3 position-relative">
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            className="form-control border-0 shadow-sm" 
                                            id="password" 
                                            placeholder='Enter password'  
                                            autoComplete="current-password" 
                                            name='password' 
                                            onChange={handleChange}
                                            required
                                            style={{
                                                borderRadius: '15px',
                                                background: 'rgba(255, 255, 255, 0.8)',
                                                backdropFilter: 'blur(5px)',
                                                paddingRight: '3rem'
                                            }}
                                        />
                                        <label htmlFor="password" className='text-muted'>
                                            <i className="bi bi-lock me-2"></i>Password
                                        </label>
                                        <button
                                            type="button"
                                            className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 "
                                            onClick={togglePasswordVisibility}
                                            style={{ 
                                                border: 'none',
                                                background: 'none',
                                                zIndex: 10
                                            }}
                                        >
                                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                        </button>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-dark mb-3">
                                            <i className="bi bi-person-badge me-2"></i>Login as
                                        </label>
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <input 
                                                    className="btn-check" 
                                                    type="radio" 
                                                    name="type" 
                                                    id="admin" 
                                                    value="admin" 
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label 
                                                    className="btn btn-outline-primary w-100 py-2 rounded-pill" 
                                                    htmlFor="admin"
                                                    style={{
                                                        border: '2px solid #e0e0e0',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <i className="bi bi-shield-check me-2"></i>Admin
                                                </label>
                                            </div>
                                            <div className="col-6">
                                                <input 
                                                    className="btn-check" 
                                                    type="radio" 
                                                    name="type" 
                                                    id="user" 
                                                    value="user" 
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label 
                                                    className="btn btn-outline-primary w-100 py-2 rounded-pill" 
                                                    htmlFor="user"
                                                    style={{
                                                        border: '2px solid #e0e0e0',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    <i className="bi bi-person me-2"></i>User
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn btn-primary w-100 py-3 rounded-pill fw-semibold shadow-sm"
                                        style={{
                                            background: 'linear-gradient(135deg, #03045e 0%, #0096c7 100%)',
                                            border: 'none',
                                            fontSize: '1.1rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <i className="bi bi-box-arrow-in-right me-2"></i>
                                        Sign In
                                    </button>
                                </form>

                                <div className="text-center mt-4">
                                    <p className="text-muted mb-0">
                                        Don't have an account? 
                                        <Link to="/choice" className="text-decoration-none fw-semibold ms-1" style={{color: '#667eea'}}>
                                            Sign up here
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>

        {/* Custom CSS for enhanced styling */}
        <style>{`
            .btn-check:checked + .btn-outline-primary {
                background: linear-gradient(135deg, #03045e 0%, #0096c7 100%) !important;
                border-color: #667eea !important;
                color: white !important;
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3) !important;
            }
            
            .form-control:focus {
                border-color: #667eea !important;
                box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25) !important;
            }
            
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4) !important;
            }
            
            .card {
                transition: all 0.3s ease;
            }
            
            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
            }
            
            .form-floating > label {
                padding-left: 1rem;
            }
            
            .form-floating > .form-control {
                padding-left: 1rem;
            }
            
            @media (max-width: 576px) {
                .card-body {
                    padding: 2rem !important;
                }
            }
        `}</style>
    </>
  )
}

export default Login