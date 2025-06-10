import Footer from './Footer';
import './Home.css'; 
import call from '../image/call.png'
import announcement from '../image/Announcement.png'
import event from '../image/Events.png'
import market from '../image/MarketPlace.png'
import building from '../image/Community Building.png'
import secure from '../image/secure.png'

const Home = () => {
  return (
    <>
      {/* Hero Section */}
        <div
            className="card text-center rounded-0 my-5"
            style={{
                background: 'linear-gradient(to right, #03045e, #0096c7)',
                border: 'none',
                position: 'relative',
                overflow: 'hidden',
                color:"white"
            }}
        >
            
            <div className='container'>
                <div className="row g-0 d-flex justify-content-center align-items-center">
                    <div className="col-md-6 d-flex align-items-center text-start">
                        <div className="card-body">
                            <h1 className="card-title fw-bold">Welcome to the</h1>
                            <h1 className="card-title fw-bold" style={{color:"#0077b6"}}>CommunityHub</h1>
                            <p>
                            Your digital notice board for local announcements, events, and neighborhood connections. Stay informed, stay connected, stay engaged with your community.
                            </p>
                            <a href="/admin-sign-up" className="btn btn-primary my-3">Get Started as a Admin</a>
                            <div className='container my-3'>
                                <div className='row'>
                                    <div className='col-md-12 d-flex justify-content-around text-center'>
                                        <div>
                                            <i className="fa-solid fa-circle-check"></i>
                                            <p >500+ communities</p>
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-circle-check"></i>
                                            <p >Verified societies</p>
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-circle-check"></i>
                                            <p>24/7 Support</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div
                    className="card col-md-5 d-flex align-items-center my-5"
                    style={{
                        background: 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '16px',
                        padding: '2rem',
                    }}
                    >
                        <h2 className="mb-4">Quick Access</h2>
                        <div className="row w-100 gx-3 gy-3">
                            <div className="col-6">
                            <button className="btn btn-light bg-white rounded shadow-sm p-3 text-start w-100 h-100 d-flex flex-column justify-content-between" style={{ minHeight: "150px", cursor: "pointer", outline:"none" }}>
                                <i className="fa-solid fa-bullhorn my-2"></i>
                                <p className="mb-2">View Announcement</p>
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                            </div>
                            <div className="col-6">
                            <button className="btn btn-light bg-white rounded shadow-sm p-3 text-start w-100 h-100 d-flex flex-column justify-content-between" style={{ minHeight: "150px", cursor: "pointer", outline:"none" }}>
                                <i className="fa-solid fa-calendar my-2"></i>
                                <p className="mb-2">Browse Events</p>
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                            </div>
                            <div className="col-6">
                            <button className="btn btn-light bg-white rounded shadow-sm p-3 text-start w-100 h-100 d-flex flex-column justify-content-between" style={{ minHeight: "150px", cursor: "pointer", outline:"none" }}>
                                <i className="fa-solid fa-bag-shopping my-2"></i>
                                <p className="mb-2">Market Place</p>
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                            </div>
                            <div className="col-6">
                            <button className="btn btn-light bg-white rounded shadow-sm p-3 text-start w-100 h-100 d-flex flex-column justify-content-between" style={{ minHeight: "150px", cursor: "pointer", outline:"none" }}>
                                <i className="fa-solid fa-phone-volume my-2"></i>
                                <p className="mb-2">Contect Dictionary</p>
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                            </div>
                            <p>Every thing you need in one place</p>
                        </div>
                </div>
                </div>
            </div>
            <svg
                viewBox="0 0 1440 120"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block', width: '100%', height: 'auto' }}
            >
                <path
                fill="white"
                fillOpacity="1"
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                ></path>
            </svg>
        </div>


      {/* Feature Section */}
        <div className="card text-center border-0  container">
            <div className="card-body">
            <h1 className="card-title">Why Choose CommunityHub?</h1>
            <p className="card-text text-muted">
                Transform your community communication with our comprehensive digital platform designed
                specifically for residential societies and local neighborhoods.
            </p>

                <div className="row justify-content-center">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 border-0" data-aos="fade-up">
                        <div className="card h-100 border-0 " style={{ boxShadow: '0px 5px 5px grey',cursor:"pointer" }}>
                            <div className="card-body text-center feature-card">
                            <i className="fa-solid fa-business-time icon-responsive mb-3"></i>
                            <h5 className="card-title">Real-Time Updates</h5>
                            <p className="card-text">
                                Get instant notifications about important community matters
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" data-aos="fade-up">
                        <div className="card h-100 border-0" style={{ boxShadow: '0px 5px 5px grey',cursor:"pointer" }}>
                            <div className="card-body text-center feature-card">
                            <i className="fa-solid fa-message icon-responsive mb-3"></i>
                            <h5 className="card-title">Easy Communication</h5>
                            <p className="card-text">
                                Simple, centralized platform for all community communications
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" data-aos="fade-up">
                        <div className="card h-100 border-0 " style={{ boxShadow: '0px 5px 5px grey',cursor:"pointer" }}>
                            <div className="card-body text-center feature-card">
                            <i className="fa-solid fa-star icon-responsive mb-3"></i>
                            <h5 className="card-title">User-Friendly Design</h5>
                            <p className="card-text">
                                Intuitive interface designed for users of all technical levels
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 " data-aos="fade-up">
                        <div className="card h-100 border-0 " style={{ boxShadow: '0px 5px 5px grey',cursor:"pointer" }}>
                            <div className="card-body text-center feature-card">
                            <i className="fa-regular fa-circle-check icon-responsive mb-3"></i>
                            <h5 className="card-title">Reliable & Maintained</h5>
                            <p className="card-text">
                                Consistently updated and maintained for optimal performance
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="card conatiner p-3 border-0">
            <div className="row g-3">
                <div className="col-12 col-sm-6" data-aos="fade-up">
                <div className="card h-100 border-0 function-card">
                    <div className="card-body">
                        <div className='d-flex justify-content-center align-items-top'>
                            <div className='mx-3'>
                                <img className='img-fluid' src={announcement} alt='Community Announcements'/>
                            </div>
                            <div>
                                <h2 className="card-title">Community Announcements</h2>
                                <p className="card-text">
                                    Stay informed with real-time announcements from your community management, including emergency alerts, maintenance updates, and general notices.
                                </p>
                            </div>
                        </div>
                        <div className='my-3'>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Emergency notifications</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Maintenance schedules</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Community updates</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Pinned important messages</p>
                        </div>
                    </div>
                </div>
                </div>

                <div className="col-12 col-sm-6 " data-aos="fade-up">
                <div className="card h-100 function-card">
                    <div className="card-body">
                        <div className='d-flex justify-content-center align-items-top'>
                            <div className='mx-3'>
                                 <img className='img-fluid' src={event} alt='Community Announcements'/>
                            </div>
                            <div>
                                <h2 className="card-title">Local Events & Activities</h2>
                                <p className="card-text">
                                    Discover and participate in community events, from social gatherings to educational workshops and seasonal celebrations.
                                </p>
                            </div>
                        </div>
                        <div className='my-3'>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Event calendar</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> RSVP functionality</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Event reminders</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Community activities</p>
                        </div>
                    </div>
                </div>
                </div>

                <div className="col-12 col-sm-6 " data-aos="fade-up">
                <div className="card h-100 function-card">
                    <div className="card-body">
                     <div className='d-flex justify-content-center align-items-top'>
                            <div className='mx-3'>
                                 <img className='img-fluid' src={market} alt='Community Announcements'/>
                            </div>
                            <div>
                                <h2 className="card-title">Neighborhood Marketplace</h2>
                                <p className="card-text">
                                    Buy, sell, rent, or give away items within your community. Connect with neighbors for local transactions and reduce waste.
                                </p>
                            </div>
                        </div>
                        <div className='my-3'>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Buy & sell locallyr</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Rental listings</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Free item exchange</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Neighbor-to-neighbor deals</p>
                        </div>
                    </div>
                </div>
                </div>

                <div className="col-12 col-sm-6 " data-aos="fade-up">
                <div className="card h-100  function-card">
                    <div className="card-body">
                     <div className='d-flex justify-content-center align-items-top'>
                            <div className='mx-3'>
                                 <img className='img-fluid' src={call} alt='Community Announcements'/>
                            </div>
                            <div>
                                <h2 className="card-title">Essential Contacts</h2>
                                <p className="card-text">
                                    Quick access to important community contacts including emergency services, maintenance, administration, and local services.
                                </p>
                            </div>
                        </div>
                        <div className='my-3'>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Emergency contacts</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Maintenance requests</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Administrative support</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> 24/7 availability info</p>
                        </div>
                    </div>
                </div>
                </div>

                <div className="col-12 col-sm-6" data-aos="fade-up">
                <div className="card h-100 function-card">
                    <div className="card-body">
                     <div className='d-flex justify-content-center align-items-top'>
                            <div className='mx-3'>
                                 <img className='img-fluid' src={secure} alt='Community Announcements'/>
                            </div>
                            <div>
                                <h2 className="card-title">Secure & Private</h2>
                                <p className="card-text">
                                    Your community data is protected with role-based access control, ensuring only authorized members can post and manage content.
                                </p>
                            </div>
                        </div>
                        <div className='my-3'>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Role-based permissions</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Secure authentication</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Privacy protection</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Admin moderation</p>
                        </div>
                    </div>
                </div>
                </div>

                <div className="col-12 col-sm-6" data-aos="fade-up">
                <div className="card h-100  function-card">
                    <div className="card-body">
                     <div className='d-flex justify-content-center align-items-top'>
                            <div className='mx-3'>
                                 <img className='img-fluid' src={building} alt='Community Announcements'/>
                            </div>
                            <div>
                                <h2 className="card-title">Community Building</h2>
                                <p className="card-text">
                                    Foster stronger neighborhood connections through shared information, local commerce, and community engagement.
                                </p>
                            </div>
                        </div>
                        <div className='my-3'>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Neighbor connections</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Local networking</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Community spirit</p>
                            <p><i className="fa-solid fa-circle-check mx-2" style={{color:"green"}}></i> Shared resources</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div className="card text-center container my-4 border-0" style={{background: 'linear-gradient(to right, white, #e6f6fa 30%, #e6f6fa 70%, white)',}}>
            <div className="card-body">
                <h2 className="card-title">Trusted by Communities</h2>
                <p className="card-text">Join thousands of residents who rely on CommunityBoard</p>
                <div className='row my-2'>
                    <div className='col-md-3'>
                        <div>
                            <h1 style={{color:"#0077b6"}}>200+</h1>
                            <p>Communities</p>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div>
                            <h1 style={{color:"#0077b6"}}>10K+</h1>
                            <p>Monthly Anoumcements</p>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div>
                            <h1 style={{color:"#0077b6"}}>250k+</h1>
                            <p>Communities Events</p>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <div>
                            <h1 style={{color:"#0077b6"}}>99%</h1>
                            <p>Uptime Reliability</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="card text-center border-0 rounded-0" style={{background: "linear-gradient(to right, #03045e, #0096c7)", color: "white"}}>
            <div className="card-body my-3">
                <h2 className="card-title">Ready to Transform Your Community?</h2>
                <h5 className="card-text">Join thousands of communities already using CommunityBoard to stay</h5>
                <h5 className="card-text"> connected, informed, and engaged.</h5>
                <a href="/" className="btn btn-primary my-3">Get Started as a Admin</a>
                <div className='row justify-content-center my-2'>
                    <div className='col-md-3'>
                        <p><i className="fa-solid fa-check"></i> Easy setup</p>
                        <p>Get your community board running in minutes</p>
                    </div>
                    <div className='col-md-3'>
                        <p><i className="fa-solid fa-check"></i> No Technical Skills Required</p>
                        <p>User-friendly interface for everyone</p>
                    </div>
                    <div className='col-md-3'>
                        <p><i className="fa-solid fa-check"></i> 24/7 Support</p>
                        <p>We're here to help whenever you need us</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  );
};

export default Home;
