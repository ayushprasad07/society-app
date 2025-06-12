import React, { useEffect, useState } from 'react';
import noSociety from '../image/No-society.png';
import Footer from './Footer';

const Notices = () => {
    const [notices,setNotices] = useState([]);
    const [noticeInfo,setNoticeInfo] = useState({type:"",title:"",content:""});

    const handleChange = (e)=>{
        setNoticeInfo({...noticeInfo,[e.target.name]:e.target.value});
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(noticeInfo);
        try {
            const URL = "http://localhost:4000/api/v1/admin/create-notice";
            const {type,title,content} = noticeInfo;
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
            const data = await response.json();
            if (response.ok) {
                // Option 1: Add the new notice to state immediately
                setNotices(prev => [data.notice, ...prev]);  // assuming `data.notice` is the new notice
                setNoticeInfo({type: "", title: "", content: ""}); // reset form
                console.log("Notice created successfully:", data);
                // Optionally, close the modal
                const modalEl = document.getElementById("exampleModal");
                const modal = bootstrap.Modal.getInstance(modalEl);
                modal.hide();
            }
        } catch (error) {
            console.log("error : ",error);
        }
    }

    const getNotices = async()=>{
        try {
            const URL = "http://localhost:4000/api/v1/admin/get-notice";
            const response = await fetch(URL,{
                method:"GET",
                headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
                },
            })
            const data = await response.json();
            if(Array.isArray(data.notices)){
               const sortedNotices = data.notices.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setNotices(sortedNotices);
            }else{
                console.log("data.notices is not an array");
                setNotices([]);
            }
        } catch (error) {
            console.log("error",error);
        }
    }

    useEffect(()=>{
        getNotices();
    }, [])

  return (
    <>
        <div className='container d-flex justify-content-center align-items-center vh-100' style={{marginTop:"150px",marginBottom:"100px"}}>
            
            <div className='card container  p-3'>
                
                <h1>Notices</h1>
                <hr/>
                {notices.map((notice)=>{
                    return (
                        <div className="card border-start border-4 border-primary my-3 border-0" key={notice._id} style={{boxShadow:"0px 5px 10px grey",cursor:"pointer"}}>
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
        <div>
            <div
                className="position-fixed bottom-0 end-0 p-3"
                style={{
                zIndex: 1100,
                width: '100%',
                maxWidth: '250px',
                }}
            >
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
