import React, { useEffect, useState } from 'react';
import noNotice from '../image/No notice.png'
import Footer from './Footer';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Notices = (props) => {
    const [notices,setNotices] = useState([]);
    const [noticeInfo,setNoticeInfo] = useState({type:"",title:"",content:""});
    const [loading,setLoading] = useState(true);

    const handleChange = (e)=>{
        setNoticeInfo({...noticeInfo,[e.target.name]:e.target.value});
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            props.setProgress(10);
            const URL = "http://localhost:4000/api/v1/admin/create-notice";
            const {type,title,content} = noticeInfo;
            props.setProgress(40);
            const response = await fetch(URL,{
                method:"POST",
                headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    type,
                    title,
                    content
                })
            })
            props.setProgress(70);
            const data = await response.json();
            if (response.ok) {
                setNotices(prev => [data.notice, ...prev]);
                props.setRecentNotice(data.notice);
                localStorage.setItem("recentNotice", JSON.stringify(data.notice));
                props.setProgress(100);
                setNoticeInfo({type: "", title: "", content: ""}); 
                const modalEl = document.getElementById("exampleModal");
                const modal = bootstrap.Modal.getInstance(modalEl);
                modal.hide();
            }
        } catch (error) {
            props.setProgress(100);
        }
    }

    const getNotices = async()=>{
        try {
            if(localStorage.getItem('adminId')){
                props.setProgress(10);
                const URL = "http://localhost:4000/api/v1/admin/get-notice";
                const response = await fetch(URL,{
                    method:"GET",
                    headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                    },
                })
                props.setProgress(40);
                const data = await response.json();
                props.setProgress(70);
                if(Array.isArray(data.notices)){
                const sortedNotices = data.notices.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setNotices(sortedNotices);
                    props.setProgress(100);
                    setLoading(false);
                }else{
                    setNotices([]);
                    props.setProgress(100);
                }
            }else{
                props.setProgress(10);
                const URL = "http://localhost:4000/api/v1/user/get-notices";
                props.setProgress(40);
                const response = await fetch(URL,{
                    method:"GET",
                    headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                    },
                })
                props.setProgress(70);
                const data = await response.json();
                if(Array.isArray(data.notice)){
                const sortedNotices = data.notice.sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setNotices(sortedNotices);
                    props.setRecentNotice(sortedNotices[0]);
                    localStorage.setItem("recentNotice", JSON.stringify(sortedNotices[0]));
                    props.setProgress(100);
                     setLoading(false)
                }else{
                    setNotices([]);
                    props.setProgress(100);
                }
            }
        } catch (error) {
            props.setProgress(100);
        }
    }

    const getNoticeTypeColor = (type) => {
        switch(type) {
            case 'emergency': return { bg: 'bg-danger', border: 'border-danger', icon: 'fa-exclamation-triangle' };
            case 'maintenance': return { bg: 'bg-warning', border: 'border-warning', icon: 'fa-tools' };
            case 'general': return { bg: 'bg-info', border: 'border-info', icon: 'fa-info-circle' };
            default: return { bg: 'bg-primary', border: 'border-primary', icon: 'fa-bell' };
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    useEffect(()=>{
        getNotices();
    }, [])

  return (
    <>
        <style jsx>{`
            .notices-hero {
                background: linear-gradient(135deg, #03045e 0%, #0096c7 100%);
                color: white;
                padding: 4rem 0;
                margin-bottom: 2rem;
            }
            
            .hero-title {
                font-size: 3.5rem;
                font-weight: 700;
                margin-bottom: 1rem;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            
            .hero-subtitle {
                font-size: 1.3rem;
                opacity: 0.9;
                font-weight: 300;
            }
            
            .notice-card {
                border: none;
                border-radius: 16px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.08);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                overflow: hidden;
                margin-bottom: 1.5rem;
                background: white;
            }
            
            .notice-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            }
            
            .notice-type-badge {
                font-size: 0.75rem;
                font-weight: 600;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 1rem;
            }
            
            .notice-title {
                font-size: 1.4rem;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 0.75rem;
                line-height: 1.4;
            }
            
            .notice-content {
                color: #4a5568;
                line-height: 1.6;
                margin-bottom: 1rem;
            }
            
            .notice-meta {
                font-size: 0.875rem;
                color: #718096;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .loading-container {
                min-height: 70vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .empty-state {
                text-align: center;
                padding: 4rem 2rem;
            }
            
            .empty-state img {
                max-width: 300px;
                opacity: 0.8;
                margin-bottom: 2rem;
            }
            
            .empty-state h3 {
                color: #4a5568;
                font-weight: 600;
                margin-bottom: 1rem;
            }
            
            .empty-state p {
                color: #718096;
                font-size: 1.1rem;
            }
            
            .fab-button {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 65px;
                height: 65px;
                border-radius: 50%;
                background: linear-gradient(135deg, #03045e 0%, #0096c7 100%);
                border: none;
                box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                color: white;
                font-size: 1.5rem;
                transition: all 0.3s ease;
                z-index: 1050;
            }
            
            .fab-button:hover {
                transform: scale(1.1);
                box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
                background: linear-gradient(135deg, #03045e 0%, #0096c7 100%);
            }
            
            .modal-content {
                border: none;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.2);
            }
            
            .modal-header {
                background: linear-gradient(135deg, #03045e 0%, #0096c7 100%);
                color: white;
                border-bottom: none;
                border-radius: 20px 20px 0 0;
                padding: 1.5rem 2rem;
            }
            
            .modal-title {
                font-weight: 600;
                font-size: 1.4rem;
            }
            
            .btn-close {
                filter: invert(1);
            }
            
            .modal-body {
                padding: 2rem;
            }
            @media (max-width: 768px) {
                .hero-title {
                    font-size: 2.5rem;
                }
                
                .notices-hero {
                    padding: 2rem 0;
                }
                
                .fab-button {
                    bottom: 20px;
                    right: 20px;
                    width: 55px;
                    height: 55px;
                }
            }
                @keyframes float {
          0%, 100% { transform: translateY(70px); }
          50% { transform: translateY(-50px); }
        }
        `}</style>
        
        {loading && (
            <div className="loading-container py-mt-5 vh-100">
                <div className="w-full max-w-md mx-auto px-4">
                    <DotLottieReact
                        src="https://lottie.host/941f2d8d-bbd1-48b3-ad98-b7c753ad96ca/7r1WsKpxoB.lottie"
                        loop
                        autoplay
                    />
                </div>
            </div>
        )}

        {!loading && (
            <>
                <div className="notices-hero position-relative overflow-hidden">
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ opacity: 0.1 }}>
                        <div className="position-absolute rounded-circle" style={{
                            width: '300px',
                            height: '300px',
                            background: 'white',
                            top: '-150px',
                            right: '-150px',
                            animation: 'float 6s ease-in-out infinite'
                        }}></div>
                        <div className="position-absolute rounded-circle" style={{
                            width: '200px',
                            height: '200px',
                            background: 'white',
                            bottom: '-100px',
                            left: '-100px',
                            animation: 'float 8s ease-in-out infinite reverse'
                        }}></div>
                    </div>
                    <div className="container text-center py-5 mt-5">
                        <h1 className="hero-title">
                            <i className="fas fa-bell me-3"></i>
                            Notices
                        </h1>
                        <p className="hero-subtitle">
                            Stay updated with the latest announcements and important information
                        </p>
                    </div>
                </div>
                <div className='container pb-5' >
                    {notices.length === 0 ? (
                        <div className="empty-state">
                            <img src={noNotice} alt='No notices available' className='img-fluid'/>
                            <h3>No Notices Yet</h3>
                            <p>There are currently no notices to display. Check back later for updates!</p>
                        </div>
                    ) : (
                        <div className="row py-5 mt-5">
                            {notices.map((notice, index) => {
                                const typeConfig = getNoticeTypeColor(notice.type);
                                return (
                                    <div className="col-12 col-lg-6 col-xl-4" key={notice._id} style={{cursor:"pointer"}}>
                                        <div 
                                            className="notice-card" 
                                            data-aos="fade-up" 
                                            data-aos-delay={index * 100}
                                        >
                                            <div className="card-body p-4">
                                                <div className={`notice-type-badge ${typeConfig.bg} text-white`}>
                                                    <i className={`fas ${typeConfig.icon}`}></i>
                                                    {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                                                </div>
                                                
                                                <h5 className="notice-title">{notice.title}</h5>
                                                <p className="notice-content">{notice.content}</p>
                                                
                                                <div className="notice-meta">
                                                    <i className="fas fa-clock"></i>
                                                    <span>{formatDate(notice.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                {localStorage.getItem("adminId") && (
                    <button 
                        type="button" 
                        className="fab-button" 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal"
                        title="Create New Notice"
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                )}
            </>
        )}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title" id="exampleModalLabel">
                            <i className="fas fa-plus-circle me-2"></i>
                            Create New Notice
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title" className="form-label">
                                    <i className="fas fa-heading me-2"></i>
                                    Notice Title
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="title" 
                                    name='title' 
                                    value={noticeInfo.title}
                                    onChange={handleChange}
                                    placeholder="Enter a clear and concise title"
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="content" className="form-label">
                                    <i className="fas fa-align-left me-2"></i>
                                    Notice Content
                                </label>
                                <textarea 
                                    className="form-control" 
                                    id="content" 
                                    name='content'
                                    value={noticeInfo.content}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Provide detailed information about the notice"
                                    required
                                ></textarea>
                            </div>
                            
                            <div className="mb-4">
                                <label className="form-label d-block">
                                    <i className="fas fa-tags me-2"></i>
                                    Notice Type
                                </label>
                                <div className="row">
                                    <div className="col-md-4 my-2">
                                        <div className="form-check p-3 border rounded-3 h-100">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="type" 
                                                id="maintenance" 
                                                value="maintenance" 
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="form-check-label w-100" htmlFor="maintenance">
                                                <i className="fas fa-tools text-warning me-2"></i>
                                                <strong>Maintenance</strong>
                                                <small className="d-block text-muted">System updates & repairs</small>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-4 my-2">
                                        <div className="form-check p-3 border rounded-3 h-100">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="type" 
                                                id="emergency" 
                                                value="emergency" 
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="form-check-label w-100" htmlFor="emergency">
                                                <i className="fas fa-exclamation-triangle text-danger me-2"></i>
                                                <strong>Emergency</strong>
                                                <small className="d-block text-muted">Urgent & critical alerts</small>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-4 my-2">
                                        <div className="form-check p-3 border rounded-3 h-100">
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="type" 
                                                id="general" 
                                                value="general" 
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className="form-check-label w-100" htmlFor="general">
                                                <i className="fas fa-info-circle text-info me-2"></i>
                                                <strong>General</strong>
                                                <small className="d-block text-muted">Regular announcements</small>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    <i className="fas fa-times me-2"></i>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <i className="fas fa-paper-plane me-2"></i>
                                    Create Notice
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        <Footer/>
    </>
  );
};

export default Notices;