import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import noEvent from '../image/No-events.png'
import societyEvent from '../image/society-event.jpg'
import './Event.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Events = (props) => {
  const [events,setEvents] = useState([]);
  const [eventInfo,setEventInfo] = useState({title:"",content:"",venue:"",eventDate:"",organizedBy:""});
  const [file,setFile] = useState(null);
  const [loading,setLoading] = useState(true);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { title, content, venue, eventDate, organizedBy } = eventInfo;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("venue", venue);
    formData.append("eventDate", eventDate);
    formData.append("organizedBy", organizedBy);

    if (file) {
      formData.append("eventImage", file);
    }

    const URL = "http://localhost:4000/api/v1/admin/create-event";

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setEvents((prevEvents) => [...prevEvents, data.event]); 
        props.setRecentEvent(data.event);
        localStorage.setItem('recentEvent',JSON.stringify(data.event));
        setEventInfo({
          title: "",
          content: "",
          venue: "",
          eventDate: "",
          organizedBy: ""
        });
        setFile(null);
        const modalEl = document.getElementById("exampleModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };


  const handleChange = (e)=>{
    if(e.target.name==='eventImage'){
      setFile(e.target.files[0]);
    }else{
      setEventInfo({...eventInfo,[e.target.name]:e.target.value});
    }
  }

  const getEvents = async()=>{
    try {
      if(localStorage.getItem('adminId')){
            const URL = "http://localhost:4000/api/v1/admin/get-events";
            const response = await fetch(URL,{
                method:"GET",
                headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
                },
            })
            const data = await response.json();
            if(Array.isArray(data.event)){
               const sortedEvents = data.event.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                props.setRecentEvent(sortedEvents[0]);
                localStorage.setItem('recentEvent',JSON.stringify(sortedEvents[0]));
                setLoading(false);
                setEvents(sortedEvents);
            }else{
                setEvents([]);
            }
      }else{
            const URL = "http://localhost:4000/api/v1/user/get-events";
            const response = await fetch(URL,{
                method:"GET",
                headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
                },
            })
            const data = await response.json();
            if(Array.isArray(data.event)){
               const sortedEvents = data.event.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setLoading(false);
                setEvents(sortedEvents);
                props.setRecentEvent(sortedEvents[0]);
                localStorage.setItem('recentEvent',JSON.stringify(sortedEvents[0]));
            }else{
                setEvents([]);
            }
      }
        } catch (error) {
        }
  }

  useEffect(()=>{
    getEvents();
  },[])

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
        {!loading && <main className="container py-5 mt-5" style={{ minHeight: "100vh" }}>
            
            <div>
                <h1>Events</h1>
                <hr/>
                {events.length===0 && 
                                    <div>
                                        <img src={noEvent} alt='no notice' className='img-fluid'/>
                                    </div>
                                }
              <div className='row '>
                {events.map((event)=>{
                    return (
                        <div key={event._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 my-3">
                          <div className="card h-100 border-bottom border-4 border-primary border-0 event-card" data-aos="fade-up" data-aos-delay={ 100} key={event._id} style={{
                            background: 'white',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            textDecoration: 'none',
                            cursor:"pointer"
                          }}>
                            <img 
                              src={event?.eventImage || societyEvent} 
                              className="card-img-top img-fluid" 
                              alt="Event" 
                              style={{ objectFit: "cover", height: "200px" }} 
                            />
                            <div className="card-body d-flex flex-column">
                              <h5 className="card-title"><strong>{event.title}</strong></h5>
                              <p className="card-text flex-grow-1">{event.content}</p>
                              <p className="card-text">
                                <small className="text-muted">
                                  Event Date: {new Date(event.eventDate).toLocaleString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                })}
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                    )
                })}
              </div>
            </div>
        </main>}
        <div>
            <div
                className="position-fixed bottom-0 end-0 p-3"
                style={{
                zIndex: 1100,
                width: '100%',
                maxWidth: '250px',
                }}
            >
                {localStorage.getItem('adminId') &&
                  <div
                  className="mb-2 bg-transparent  show border-0 text-center"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  data-bs-autohide="false"
                  >
                    <div className="toast-body border-0">
                        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"  className="btn btn-primary rounded-circle "><i className="fa-solid fa-plus"></i></button>
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
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Create Event</h1>
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
                        <label htmlFor="eventImage" className="col-form-label">Image :</label>
                        <input type="file" className="form-control" id="eventImage" name='eventImage' onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="eventDate" className="col-form-label">Event Date and Time :</label>
                        <input type="datetime-local" className="form-control" id="eventDate" name='eventDate' onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="venue" className="col-form-label">Venue :</label>
                        <input type="text" className="form-control" id="venue" name='venue' onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="organizedBy" className="col-form-label">Organized By :</label>
                        <input type="text" className="form-control" id="organizedBy" name='organizedBy' onChange={handleChange}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary">Create Event</button>
                    </div>
                    </form>
                </div>
                </div>
            </div> 
        </div>
        <Footer/>
    </>
  )
}

export default Events
