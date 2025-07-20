import  { useEffect, useState } from 'react'
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

  const API = "https://society-app-1.onrender.com";

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

    const URL = `${API}/api/v1/admin/create-event`;

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
        setEvents((prevEvents) => [data.event, ...prevEvents]); 
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
            props.setProgress(10);
            const URL = `${API}/api/v1/admin/get-events`;
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
            if(Array.isArray(data.event)){
               const sortedEvents = data.event.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                props.setRecentEvent(sortedEvents[0]);
                localStorage.setItem('recentEvent',JSON.stringify(sortedEvents[0]));
                setLoading(false);
                setEvents(sortedEvents);
                props.setProgress(100);
            }else{
                setEvents([]);
                setLoading(false);
                props.setProgress(100);
            }
      }else{
            props.setProgress(10);
            const URL = `${API}/api/v1/user/get-events`;
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
            if(Array.isArray(data.event)){
               const sortedEvents = data.event.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                props.setProgress(100);
                setLoading(false);
                setEvents(sortedEvents);
                props.setRecentEvent(sortedEvents[0]);
                localStorage.setItem('recentEvent',JSON.stringify(sortedEvents[0]));
            }else{
                setEvents([]);
                props.setProgress(100);
                setLoading(false);
            }
      }
        } catch (error) {
            setLoading(false);
            props.setProgress(100);
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

  const isUpcoming = (dateString) => {
    return new Date(dateString) > new Date();
  }

  useEffect(()=>{
    getEvents();
  },[])

  return (
    <>
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
          <div className="events-hero position-relative overflow-hidden">
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
                <i className="fas fa-calendar-alt me-3"></i>
                Events
              </h1>
              <p className="hero-subtitle">
                Discover upcoming events and stay connected with our community
              </p>
            </div>
          </div>

          <div className="container pb-5">
            {events.length === 0 ? (
              <div className="empty-state text-center">
                <img src={noEvent} alt='No notices available' className='img-fluid' style={{ maxHeight: "300px", objectFit: "cover" }}/>
              </div>
            ) : (
              <div className="row py-5 mt-5">
                {events.map((event, index) => {
                  const upcoming = isUpcoming(event.eventDate);
                  return (
                    <div key={event._id} className="col-12 col-md-6 col-lg-4 mb-4">
                      <div 
                        className="event-card position-relative" 
                        data-aos="fade-up" 
                        data-aos-delay={index * 100}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="position-relative">
                          <img 
                            src={event?.eventImage || societyEvent} 
                            className="event-image" 
                            alt="Event" 
                          />
                          <div className={`event-status-badge ${upcoming ? 'upcoming-badge' : 'past-badge'}`}>
                            {upcoming ? 'Upcoming' : 'Past'}
                          </div>
                        </div>
                        
                        <div className="card-body p-4">
                          <h5 className="event-title">{event.title}</h5>
                          <p className="event-content">{event.content}</p>
                          
                          <div className="event-meta d-flex align-items-center mb-2">
                            <i className="fas fa-calendar"></i>
                            <span>{formatDate(event.eventDate)}</span>
                          </div>
                          
                          <div className="event-meta d-flex align-items-center mb-2">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{event.venue}</span>
                          </div>
                          
                          <div className="event-meta d-flex align-items-center">
                            <i className="fas fa-users"></i>
                            <span>{event.organizedBy}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {localStorage.getItem('adminId') && (
            <button 
              type="button" 
              className="fab-button" 
              data-bs-toggle="modal" 
              data-bs-target="#exampleModal"
              title="Create New Event"
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
                Create New Event
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    <i className="fas fa-heading me-2"></i>
                    Event Title
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="title" 
                    name='title' 
                    value={eventInfo.title}
                    onChange={handleChange}
                    placeholder="Enter an engaging event title"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="content" className="form-label">
                    <i className="fas fa-align-left me-2"></i>
                    Event Description
                  </label>
                  <textarea 
                    className="form-control" 
                    id="content" 
                    name='content'
                    value={eventInfo.content}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe what this event is all about"
                    required
                  ></textarea>
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label htmlFor="eventDate" className="form-label">
                      <i className="fas fa-calendar me-2"></i>
                      Event Date & Time
                    </label>
                    <input 
                      type="datetime-local" 
                      className="form-control" 
                      id="eventDate" 
                      name='eventDate'
                      value={eventInfo.eventDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6 mb-4">
                    <label htmlFor="venue" className="form-label">
                      <i className="fas fa-map-marker-alt me-2"></i>
                      Venue
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="venue" 
                      name='venue'
                      value={eventInfo.venue}
                      onChange={handleChange}
                      placeholder="Event location"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="organizedBy" className="form-label">
                    <i className="fas fa-users me-2"></i>
                    Organized By
                  </label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="organizedBy" 
                    name='organizedBy'
                    value={eventInfo.organizedBy}
                    onChange={handleChange}
                    placeholder="Organization or person organizing this event"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="eventImage" className="form-label">
                    <i className="fas fa-image me-2"></i>
                    Event Image
                  </label>
                  <input 
                    type="file" 
                    className="form-control" 
                    id="eventImage" 
                    name='eventImage'
                    onChange={handleChange}
                    accept="image/*"
                  />
                  <small className="form-text text-muted">
                    Upload an attractive image to represent your event
                  </small>
                </div>
                
                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-paper-plane me-2"></i>
                    Create Event
                  </button>
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