import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import societyEvent from '../image/society-event.jpg'

const Events = () => {
  const [events,setEvents] = useState([]);

  const getEvents = async()=>{
    try {
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
                setEvents(sortedEvents);
            }else{
                console.log("data.notices is not an array");
                setEvents([]);
            }
        } catch (error) {
            console.log("error",error);
        }
  }

  useEffect(()=>{
    getEvents();
  },[])

  return (
    <>
        <main className="container py-5 mt-5" style={{ minHeight: "100vh" }}>
            
            <div>
                
                <h1>Events</h1>
                <hr/>
              <div className='row'>
                {events.map((event)=>{
                    return (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                          <div className="card h-100 border-bottom border-4 border-primary border-0" key={event._id} style={{boxShadow:"0px 5px 10px grey",cursor:"pointer"}}>
                            <img 
                              src={event.eventImage || societyEvent} 
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
        </main>
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
                    <button type="button"  className="btn btn-primary rounded-circle "><i className="fa-solid fa-plus"></i></button>
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
        {/* <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button>

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
            </div> */}
        {/* </div> */}
        <Footer/>
    </>
  )
}

export default Events
