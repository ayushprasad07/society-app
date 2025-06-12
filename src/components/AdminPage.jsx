import React, { useEffect, useState } from "react";
import noSociety from "../image/No-society.png";
import { jwtDecode } from "jwt-decode";
import Footer from "./Footer";
import './AdminPage.css';
import { Link } from "react-router";
import adminEvents from '../image/upcoming-events.png'
import adminNotice from '../image/admin-notice.png'
import adminRequest from '../image/admin-request.png'
import adminResident from '../image/admin-resident.png'

const AdminPage = () => {
  const [society, setSociety] = useState(null);
  const [residents,setResidents] = useState(0);
  const [pendinRequest,setPendingRequest] = useState(0);
  const [events,setEvents] = useState(0);
  const [notices,setNotices] = useState(0);

  const getAdmin = async () => {
    try {
      const adminId = localStorage.getItem("adminId");
      const URL = `http://localhost:4000/api/v1/admin/get-admin/${adminId}`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.admin && data.admin.society) {
        console.log("Your Society", data.admin.society);
        setSociety(data.admin.society);
      }
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getResidents = async()=>{
    try {
      const URL = "http://localhost:4000/api/v1/admin/viewAllRequests";
      const response = await fetch(URL,{
        method:"GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      const data = await response.json();
      console.log("Residents : ", data);
      if(Array.isArray(data.user)){
        setResidents(data.user.length);
      }else{
        console.warn("data.user is not an array ");
        setResidents(0);
      }
    } catch (error) {
      console.log("error",error);
    }
  }

  const getPendingRequest = async()=>{
    try {
      const URL = "http://localhost:4000/api/v1/admin/pending-request";
      const response = await fetch(URL,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      const data = await response.json();
      console.log("Pending Requests : ", data);
      if(Array.isArray(data.pendingRequests)){
        setPendingRequest(data.pendingRequests.length);
      }else{
        console.warn("data.user is not an array ");
        setPendingRequest(0);
      }
    } catch (error) {
      console.log("error",error);
    }
  }

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
        setEvents(data.event.length);
      }else{
        console.log("data.event is not an array");
        setEvents(0);
      }
    } catch (error) {
      console.log("error",error);
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
        setNotices(data.notices.length);
      }else{
        console.log("data.event is not an array");
        setNotices(0);
      }
    } catch (error) {
      console.log("error",error);
    }
  }

  useEffect(() => {
    getAdmin();
    getResidents();
    getPendingRequest();
    getEvents();
    getNotices();
  }, []);

  return (
    <>
      {!society && (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="card text-center border-0">
            <div className="card-body">
              <h1 className="card-title mb-3">No Society Created Yet</h1>
              <img className="img-fluid" src={noSociety} alt="No society" />
              <p className="card-text text-muted my-3">
                Get started by creating a new society.
              </p>
              <a href="#" className="btn btn-primary">
                Create Society
              </a>
            </div>
          </div>
        </div>
      )}
      {society && (
        <div className="d-flex justify-content-center align-items-center vh-100 my-5">
          <div className="card border-0">
            <div className="card-body">
              <h1>Welcome Admin,</h1>
              <p className="text-muted">
                Here are the information about your Society,{" "}
                <strong>{society.name}</strong>
              </p>
              <div className="row w-100 gx-3 gy-3 my-5">
                <div className="col-12 col-md-6 col-sd-12">
                  <Link
                    to="/residents"
                    className="btn btn-light bg-white rounded shadow-sm p-3 text-start w-100 h-100 d-flex flex-column justify-content-between border-0"
                    style={{ minHeight: "150px", cursor: "pointer", outline: "none" }}
                  >
                    <div className="d-flex">
                      <div>
                        <img src={adminResident} className="img-fluid mx-2" alt="events" style={{ maxWidth: "40px", height: "auto" }} />
                      </div>
                      <div>
                        <p className="mb-2">Total Residents</p>
                        <h1>{residents}</h1>
                        
                      </div>
                    </div>
                    <div className="text-end">
                      <i className="fa-solid fa-arrow-right fs-5"></i>
                    </div>
                  </Link>
                </div>
                <div className="col-12 col-md-6 col-sd-12">
                  <Link
                    to="/requests"
                    className="btn btn-light bg-white rounded shadow-sm p-3 text-start w-100 h-100 d-flex flex-column justify-content-between border-0"
                    style={{ minHeight: "150px", cursor: "pointer", outline: "none" }}
                  >
                    <div className="d-flex">
                      <div>
                        <img src={adminRequest} className="img-fluid mx-2" alt="events" style={{ maxWidth: "40px", height: "auto" }} />
                      </div>
                      <div>
                        <p className="mb-2">Pending Request</p>
                        <h1>{pendinRequest}</h1>
                        
                      </div>
                    </div>
                    <div className="text-end">
                      <i className="fa-solid fa-arrow-right fs-5"></i>
                    </div>
                  </Link>
                </div>
                <div className="col-12 col-md-6 col-sd-12">
                  <Link
                    to="/events"
                    className="btn btn-light bg-white rounded shadow-sm p-3 text-start w-100 h-100 d-flex flex-column justify-content-between border-0"
                    style={{ minHeight: "150px", cursor: "pointer", outline: "none" }}
                  >
                    <div className="d-flex">
                      <div>
                        <img src={adminEvents} className="img-fluid mx-2" alt="events" style={{ maxWidth: "40px", height: "auto" }} />
                      </div>
                      <div>
                        <p className="mb-2">Upcoming Events</p>
                        <h1>{events}</h1>
                        
                      </div>
                    </div>
                    <div className="text-end">
                      <i className="fa-solid fa-arrow-right fs-5"></i>
                    </div>
                  </Link>
                </div>
                <div className="col-12 col-md-6 col-sd-12">
                  <Link
                    to="/notices"
                    className="btn btn-light bg-white rounded shadow-sm p-3 text-start w-100 h-100 d-flex flex-column justify-content-between border-0"
                    style={{ minHeight: "150px", cursor: "pointer", outline: "none" }}
                  >
                    <div className="d-flex">
                      <div>
                        <img src={adminNotice} className="img-fluid mx-2" alt="events" style={{ maxWidth: "40px", height: "auto" }} />
                      </div>
                      <div>
                        <p className="mb-2">Recent Notices</p>
                        <h1>{notices}</h1>
                        
                      </div>
                    </div>
                    <div className="text-end">
                      <i className="fa-solid fa-arrow-right fs-5"></i>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AdminPage;
