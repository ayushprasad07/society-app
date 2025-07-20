import { useEffect, useState } from "react";
import noSociety from "../image/No-society.png";
import Footer from "./Footer";
import './AdminPage.css';
import { Link } from "react-router";
import adminEvents from '../image/upcoming-events.png'
import adminNotice from '../image/admin-notice.png'
import adminRequest from '../image/admin-request.png'
import adminResident from '../image/Admin-resident.png'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AdminPage = () => {
  const [society, setSociety] = useState(null);
  const [residents, setResidents] = useState(0);
  const [pendinRequest, setPendingRequest] = useState(0);
  const [events, setEvents] = useState(0);
  const [notices, setNotices] = useState(0);
  const [societyInfo, setSocietyInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const API = "https://society-app-1.onrender.com";

  const createSociety = async (e) => {
    e.preventDefault();
    try {
      const { name, address, city, state, pincode } = societyInfo;
      const URL = `${API}/api/v1/admin/create-society`;
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ name, address, city, state, pincode })
      });
      const data = await response.json();
      if (response.ok) {
        setSociety(data.society);
        setSocietyInfo({ name: "", address: "", city: "", state: "", pincode: "" });
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();
      } else {
        alert(data.message || "Failed to create society.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSocietyInfo({ ...societyInfo, [e.target.name]: e.target.value });
  };

  const getAdmin = async () => {
    try {
      const adminId = localStorage.getItem("adminId");
      const URL = `${API}/api/v1/admin/get-admin/${adminId}`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.admin && data.admin.society) {
        setSociety(data.admin.society);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getResidents = async () => {
    try {
      const URL = `${API}/api/v1/admin/viewAllRequests`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.user && Array.isArray(data.user)) {
        setResidents(data.user.length);
      } else {
        setResidents(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPendingRequest = async () => {
    try {
      const URL = `${API}/api/v1/admin/pending-request`;
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.pendingRequests && Array.isArray(data.pendingRequests)) {
        setPendingRequest(data.pendingRequests.length);
      } else {
        setPendingRequest(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getEvents = async () => {
    try {
      const URL = `${API}/api/v1/admin/get-events`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (Array.isArray(data.event)) {
        setEvents(data.event.length);
      } else {
        setEvents(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNotices = async () => {
    try {
      const URL = `${API}/api/v1/admin/get-notice`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (Array.isArray(data.notices)) {
        setNotices(data.notices.length);
      } else {
        setNotices(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getItems = async () => {
    try {
      const URL = `${API}/api/v1/admin/get-items`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (Array.isArray(data.items)) {
        setItems(data.items.length);
      } else {
        setItems(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  useEffect(() => {
    if (society) {
      getResidents();
      getPendingRequest();
      getEvents();
      getNotices();
      getItems();
    }
  }, [society]);

  const StatCard = ({ title, count, icon, link, color, bgColor }) => (
    <div className="col-12 col-md-6 col-lg-6 mb-4">
      <Link
        to={link}
        className="text-decoration-none"
        style={{ cursor: "pointer" }}
      >
        <div 
          className={`stat-card ${bgColor} rounded-4 shadow-sm h-100 position-relative overflow-hidden`}
          style={{
            minHeight: "160px",
            transition: "all 0.3s ease",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
          }}
        >
          {/* Background Pattern */}
          <div 
            className="position-absolute top-0 end-0 opacity-25"
            style={{
              width: "100px",
              height: "100px",
              background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
              transform: "translate(20px, -20px)"
            }}
          />
          
          <div className="p-4 d-flex flex-column h-100">
            <div className="d-flex align-items-center mb-3">
              <div 
                className="icon-wrapper me-3 d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: `${color}20`,
                  border: `2px solid ${color}30`
                }}
              >
                <img 
                  src={icon} 
                  alt={title}
                  style={{ 
                    width: "24px", 
                    height: "24px",
                    filter: `hue-rotate(${color === '#3b82f6' ? '0deg' : color === '#10b981' ? '140deg' : color === '#f59e0b' ? '40deg' : '280deg'})`
                  }} 
                />
              </div>
              <div className="flex-grow-1">
                <p className="text-muted mb-1 small fw-medium">{title}</p>
                <h2 className="mb-0 fw-bold" style={{ color: color, fontSize: "2rem" }}>
                  {count}
                </h2>
              </div>
            </div>
            
            <div className="mt-auto d-flex justify-content-between align-items-center">
              <div className="progress-bar-container flex-grow-1 me-3">
                <div 
                  className="progress-bar rounded-pill"
                  style={{
                    height: "4px",
                    backgroundColor: `${color}20`,
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <div 
                    className="progress-fill rounded-pill"
                    style={{
                      height: "100%",
                      backgroundColor: color,
                      width: `${Math.min(count * 10, 100)}%`,
                      transition: "width 1s ease-in-out"
                    }}
                  />
                </div>
              </div>
              <div 
                className="arrow-icon d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: `${color}15`,
                  transition: "all 0.3s ease"
                }}
              >
                <i 
                  className="fas fa-arrow-right"
                  style={{ 
                    color: color,
                    fontSize: "14px",
                    transition: "transform 0.3s ease"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <>
      {loading && (
        <div className="loading-container py-5 mt-5 vh-100">
          <div className="text-center">
            <DotLottieReact
              src="https://lottie.host/941f2d8d-bbd1-48b3-ad98-b7c753ad96ca/7r1WsKpxoB.lottie"
              loop
              autoplay
              style={{ width: "300px", height: "300px" }}
            />
            <h3 className="mt-3 text-muted">Loading your dashboard...</h3>
          </div>
        </div>
      )}

      {!loading && (
        <>
          {!society && (
            <div className="no-society-container d-flex justify-content-center align-items-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-md-8 col-lg-6">
                    <div className="create-society-card text-center p-5 rounded-4 shadow-lg">
                      <div className="mb-4">
                        <div 
                          className="d-inline-block p-4 mb-3"
                          style={{ backgroundColor: "#667eea20" }}
                        >
                          <img 
                            className="img-fluid" 
                            src={noSociety} 
                            alt="No society" 
                            style={{ maxWidth: "120px", height: "auto" }}
                          />
                        </div>
                      </div>
                      <h1 className="display-6 fw-bold mb-3" style={{ color: "#667eea" }}>
                        No Society Created Yet
                      </h1>
                      <p className="lead text-muted mb-4" style={{ fontSize: "1.1rem" }}>
                        Get started by creating your first society and unlock the full potential of our management system.
                      </p>
                      <button 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal" 
                        className="btn btn-primary btn-lg px-5 py-3"
                        style={{ fontSize: "1.1rem", fontWeight: "600" }}
                      >
                        <i className="fas fa-plus me-2"></i>
                        Create Society
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {society && (
            <div className="container-fluid px-4 py-5 mt-5" style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
              <div className="row justify-content-center">
                <div className="col-12 col-xl-10">
                  <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
                    <div className="dashboard-header">
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
                      <div className="row align-items-center p-3">
                        <div className="col-12 col-md-8">
                          <h1 className="mb-2">
                            Welcome Back, Admin! 
                          </h1>
                          <h3 className="society-name mb-0">
                            Managing <strong>{society.name}</strong>
                          </h3>
                        </div>
                        <div className="col-12 col-md-4 text-md-end mt-3 mt-md-0 my-3">
                          <div className="d-flex flex-column">
                            <small className="opacity-75">Today's Date</small>
                            <strong>{new Date().toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body p-5">
                      <div className="row g-4">
                        <StatCard
                          title="Total Residents"
                          count={residents}
                          icon={adminResident}
                          link="/residents"
                          color="#3b82f6"
                          bgColor="bg-white"
                        />
                        <StatCard
                          title="Pending Requests"
                          count={pendinRequest}
                          icon={adminRequest}
                          link="/requests"
                          color="#ef4444"
                          bgColor="bg-white"
                        />
                        <StatCard
                          title="Upcoming Events"
                          count={events}
                          icon={adminEvents}
                          link="/events"
                          color="#10b981"
                          bgColor="bg-white"
                        />
                        <StatCard
                          title="Recent Notices"
                          count={notices}
                          icon={adminNotice}
                          link="/notices"
                          color="#f59e0b"
                          bgColor="bg-white"
                        />
                        <StatCard
                          title="Manage Market Place"
                          count={items}
                          icon={adminNotice}
                          link="/admin-markte-place"
                          color="#0096c7"
                          bgColor="bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Enhanced Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4 fw-bold" id="exampleModalLabel">
                <i className="fas fa-building me-2"></i>
                Create New Society
              </h1>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body p-4">
              <form>
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="name" className="form-label fw-semibold">
                      <i className="fas fa-building me-2 text-primary"></i>
                      Society Name
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      name="name" 
                      onChange={handleChange}
                      placeholder="Enter society name"
                      value={societyInfo.name}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="address" className="form-label fw-semibold">
                      <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                      Address
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="address" 
                      name="address" 
                      onChange={handleChange}
                      placeholder="Enter full address"
                      value={societyInfo.address}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label fw-semibold">
                      <i className="fas fa-city me-2 text-primary"></i>
                      City
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="city" 
                      name="city" 
                      onChange={handleChange}
                      placeholder="Enter city"
                      value={societyInfo.city}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="state" className="form-label fw-semibold">
                      <i className="fas fa-map me-2 text-primary"></i>
                      State
                    </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="state" 
                      name="state" 
                      onChange={handleChange}
                      placeholder="Enter state"
                      value={societyInfo.state}
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="pincode" className="form-label fw-semibold">
                      <i className="fas fa-mail-bulk me-2 text-primary"></i>
                      Pincode
                    </label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="pincode" 
                      name="pincode" 
                      onChange={handleChange}
                      placeholder="Enter pincode"
                      value={societyInfo.pincode}
                    />
                  </div>
                </div>

                <div className="modal-footer border-0 pt-4">
                  <button type="button" className="btn btn-secondary px-4 py-2" data-bs-dismiss="modal">
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary px-4 py-2" onClick={createSociety}>
                    Create Society
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminPage;