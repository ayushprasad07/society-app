import  { useEffect, useState } from 'react'
import { Link } from 'react-router';
import Footer from './Footer';
import societyEvent from '../image/society-event.jpg'
import noItem from '../image/no-items.png';
import noEvent from '../image/No-events.png';
import noNotice from '../image/No notice.png'

const UserPage = (props) => {
  const [user, setUser] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  const getUser = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const URL = `${API}/api/v1/user/get-user/${userId}`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);


  return (
    <>
      <div className="position-relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #03045e 0%, #0096c7 100%)',
        paddingTop: '120px',
        paddingBottom: '80px'
      }}>
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

        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-4 flex-wrap">
                <div className="position-relative">
                  <img
                    src={user.userImage}
                    alt="userImage"
                    className="img-fluid rounded-circle border border-4 border-white shadow-lg"
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-3 border-white"
                    style={{ width: '25px', height: '25px' }}></div>
                </div>
                <div className="text-white">
                  <h1 className="display-5 fw-bold mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                    Welcome back, {user.name}!
                  </h1>
                  <p className="lead mb-0" style={{ opacity: 0.9 }}>
                    Here's what's happening in your community today
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-end">
              <div className="text-white">
                <div className="d-inline-block p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <i className="fa-solid fa-calendar-days fs-4 mb-2 d-block"></i>
                  <small className="d-block">{new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-40px' }}>
        <div className="card border-0 shadow-lg" style={{
          borderRadius: '25px',
          background: 'white',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="card-header bg-transparent border-0 p-4">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="mb-1 fw-bold">Quick Actions</h3>
                <p className="text-muted mb-0">Get things done faster with one click</p>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted">
                <i className="fa-solid fa-bolt fs-5"></i>
                <span className="small">Fast Access</span>
              </div>
            </div>
          </div>
          <div className="card-body p-4">
            <div className="row g-4">
              {[
                {
                  icon: 'fa-solid fa-scroll',
                  title: 'Announcements',
                  subtitle: 'Latest updates',
                  color: '#8B5CF6',
                  gradient: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                  link: '/notices'
                },
                {
                  icon: 'fa-solid fa-calendar-days',
                  title: 'Events',
                  subtitle: 'Upcoming activities',
                  color: '#EC4899',
                  gradient: 'linear-gradient(135deg, #EC4899, #F472B6)',
                  link: '/events'
                },
                {
                  icon: 'fa-solid fa-bag-shopping',
                  title: 'Marketplace',
                  subtitle: 'Buy & sell items',
                  color: '#06B6D4',
                  gradient: 'linear-gradient(135deg, #06B6D4, #67E8F9)',
                  link: '/market-place'
                },
                {
                  icon: 'fa-solid fa-headset',
                  title: 'Support',
                  subtitle: 'Get help anytime',
                  color: '#10B981',
                  gradient: 'linear-gradient(135deg, #10B981, #34D399)',
                  link: '#'
                }
              ].map((feature, index) => (
                <div key={index} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
                  <Link
                    to={feature.link}
                    className="card h-100 border-0 text-decoration-none position-relative overflow-hidden"
                    style={{
                      borderRadius: '20px',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: 'white',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      transform: 'translateY(0)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                    }}
                  >
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                      background: `${feature.gradient}`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      borderRadius: '20px'
                    }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.05'}
                      onMouseLeave={(e) => e.target.style.opacity = '0'}></div>

                    <div className="card-body p-4 text-center position-relative">
                      <div
                        className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 position-relative"
                        style={{
                          width: '80px',
                          height: '80px',
                          background: feature.gradient,
                          boxShadow: `0 8px 25px ${feature.color}40`
                        }}
                      >
                        <i className={feature.icon} style={{ fontSize: '28px', color: 'white' }}></i>
                      </div>
                      <h6 className="fw-bold mb-2">{feature.title}</h6>
                      <p className="text-muted small mb-3">{feature.subtitle}</p>
                      <div className="d-flex align-items-center justify-content-center text-muted">
                        <span className="small me-2">Access</span>
                        <i className="fa-solid fa-arrow-right"></i>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className="card border-0 shadow-lg my-5" style={{
          borderRadius: '25px',
          background: 'white',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="card-header bg-transparent border-0 p-4">
            <h3>Recent Activity</h3>
          </div>
          <div className="card-body p-4">
            <div className='row'>
              <div className='col-12 col-md-4'>
                <div className="card border-0 my-3" style={{
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  textDecoration: 'none',
                  cursor: "pointer"
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}>
                  <div className="card-header d-flex align-items-center gap-3 bg-transparent">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                      color: 'white'
                    }}>
                      <i className="fa-solid fa-bell fs-6"></i>
                    </div>
                    <h6 className="mb-0 fw-bold">Latest Notice</h6>
                  </div>
                  <div className="card-body">
                    {props.recentNotice ? (
                      <>
                        <h5 className="card-title">{props.recentNotice?.title || "No recent notices"}</h5>
                        <p className="card-text">{props.recentNotice?.content || "Nothing to show right now."}</p>
                      </>
                    ):(
                      <div>
                        <img src={noNotice} alt="no items" className='img-fluid' />
                      </div>
                    )}
                  </div>
                  <div className="card-footer text-center border-0 bg-transparent">
                    <Link to="/notices" style={{ textDecoration: "none" }}>View All Notices <i className="fa-solid fa-angle-down"></i></Link>
                  </div>
                </div>
              </div>
              <div className='col-12 col-md-4'>
                <div className="card border-0 my-3" style={{
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  textDecoration: 'none',
                  cursor: "pointer"
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}>
                  <div className="card-header d-flex align-items-center gap-3 bg-transparent">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                      color: 'white'
                    }}>
                      <i className="fa-solid fa-calendar-days"></i>
                    </div>
                    <h6 className="mb-0 fw-bold">Latest Event</h6>
                  </div>
                  <div className="card-body">
                    {props.recentEvent ? (
                      <>
                        <img
                        src={props.recentEvent.eventImage.length === 0 ? societyEvent : props.recentEvent.eventImage}
                        className="card-img-top img-fluid"
                        alt="Event"
                        style={{ objectFit: "cover", height: "200px" }}
                        />
                        <h5 className="card-title my-2">{props.recentEvent.title || "No recent event"}</h5>
                        <p className="card-text">{props.recentEvent.content || "Nothing to show right now"}</p>
                      </>
                    ):(
                      <div>
                        <img src={noEvent} alt="no items" className='img-fluid' />
                      </div>
                    )}
                  </div>
                  <div className="card-footer text-center border-0 bg-transparent">
                    <Link to="/events" style={{ textDecoration: "none" }}>View All Events <i className="fa-solid fa-angle-down"></i></Link>
                  </div>
                </div>
              </div>
              <div className='col-12 col-md-4'>
                <div className="card border-0 my-3" style={{
                  borderRadius: '20px',
                  transition: 'all 0.3s ease',
                  background: 'white',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  textDecoration: 'none',
                  cursor: "pointer"
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}>
                  <div className="card-header d-flex align-items-center gap-3 bg-transparent">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
                      color: 'white'
                    }}>
                      <i className="fa-solid fa-bag-shopping"></i>
                    </div>
                    <h6 className="mb-0 fw-bold">Market Place</h6>
                  </div>
                  <div className="card-body p-4 d-flex flex-column">
                    {!props.recentItem ? (
                      <div>
                        <img src={noItem} alt="no items" className='img-fluid' />
                      </div>
                    ):(
                      <>
                        <div className="text-center mb-3">
                          <img
                            className="img-fluid rounded"
                            src={props.recentItem.itemImage}
                            alt="Item"
                            style={{ maxHeight: "200px", objectFit: "cover" }}
                          />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h5 className="card-title mb-0">{props.recentItem.title}</h5>
                          <h5 className="card-title  mb-0">{props.recentItem.price} ₹</h5>
                        </div>
                        <p className="card-text text-muted mt-2">{props.recentItem.description}</p>
                      </>
                    )}
                  </div>
                  <div className="card-footer text-center border-0 bg-transparent">
                    <Link to="/market-place" style={{ textDecoration: "none" }}>View All Items <i className="fa-solid fa-angle-down"></i></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(70px); }
          50% { transform: translateY(-50px); }
        }
        
        .btn-outline-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .card:hover .position-absolute {
          opacity: 0.05 !important;
        }
      `}</style>

      <Footer />
    </>
  )
}

export default UserPage