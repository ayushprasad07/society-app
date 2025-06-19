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
                // Option 1: Add the new notice to state immediately
                setNotices(prev => [data.notice, ...prev]);
                props.setRecentNotice(data.notice);
                localStorage.setItem("recentNotice", JSON.stringify(data.notice));
                props.setProgress(100);
                setNoticeInfo({type: "", title: "", content: ""}); // reset form
                // Optionally, close the modal
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

    useEffect(()=>{
        getNotices();
    }, [])

  return (
    <>
        
        {loading && (
        <div className="w-full max-w-md mx-auto px-4 py-5 mt-5 vh-100">
            <DotLottieReact
            src="https://lottie.host/941f2d8d-bbd1-48b3-ad98-b7c753ad96ca/7r1WsKpxoB.lottie"
            loop
            autoplay
            />
        </div>
        )}

        {!loading && 
        <div className='container py-5 mt-5' style={{ minHeight: "100vh" }}>
            
            <div className="card border-0 p-4 event-card" style={{
                      borderRadius: '20px',
                      background: 'white',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      textDecoration: 'none'
                    }}>
                
                <h1>Notices</h1>
                <hr/>
                {notices.length===0 && 
                    <div>
                        <img src={noNotice} alt='no notice' className='img-fluid'/>
                    </div>
                }
                {notices.map((notice)=>{
                    return (
                        <div className="card border-start border-4 border-primary my-3 border-0 event-card" data-aos="fade-up" data-aos-delay={ 100}  key={notice._id} style={{boxShadow:"0px 5px 10px grey",cursor:"pointer"}}>
                            <div className="card-header">
                            {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{notice.title}</h5>
                                <p className="card-text">{notice.content}</p>
                            </div>
                        </div>
                    )
                    
                })}
            </div>
        </div>
        }
        <div>
            <div
                className="position-fixed bottom-0 end-0 p-3"
                style={{
                zIndex: 1100,
                width: '100%',
                maxWidth: '250px',
                }}
            >
                {localStorage.getItem("adminId") &&
                    <div
                    className="mb-2 bg-transparent  show border-0 text-center"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    data-bs-autohide="false"
                    >
                        <div className="toast-body border-0">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary rounded-circle "><i className="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                }
                <div
                className="toast show shadow bg-white my-2"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                data-bs-autohide="false"
                >
                <div className="toast-body">
                    Made with ❤️ by Ayush
                </div>
                </div>
            </div>
        </div>
        <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Create notice</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="col-form-label">Title :</label>
                        <input type="text" className="form-control" id="title" name='title' onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="col-form-label">Content :</label>
                        <textarea className="form-control" id="content" name='content' onChange={handleChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label d-block">Type : </label>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" id="maintenance" value="maintenance" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="maintenance">Maintenance</label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" id="emergency" value="emergency" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="emergency">Emergency</label>
                        </div>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="type" id="general" value="general" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="general">General</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Create Notice</button>
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
