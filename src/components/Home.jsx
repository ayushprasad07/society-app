import React from 'react';
import image from '../image/society.png';
import './Home.css'; // import CSS for icon responsiveness

const Home = () => {
  return (
    <>
      {/* Hero Section */}
        <div
            className="card text-center"
            style={{
            background: 'linear-gradient(to right, white, #e6f6fa 30%, #e6f6fa 70%, white)',
            border: 'none',
            }}
        >
            <div className="row g-0">
            <div className="col-md-4 d-flex align-items-center">
                <img src={image} className="img-fluid rounded-start" alt="CommunityHub" />
            </div>
            <div className="col-md-8 d-flex align-items-center">
                <div className="card-body">
                <h1 className="card-title">Welcome to the CommunityHub</h1>
                <p>
                    Your digital notice board for local announcements, events, and neighborhood connections.
                </p>
                <form className="d-flex" role="search">
                    <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search for your society"
                    aria-label="Search"
                    />
                    <button className="btn btn-outline-primary" type="submit">
                    Search
                    </button>
                </form>
                </div>
            </div>
            </div>
        </div>

      {/* Feature Section */}
        <div className="card text-center border-0 my-4 container">
            <div className="card-body">
            <h1 className="card-title">Why Choose CommunityHub?</h1>
            <p className="card-text text-muted">
                Transform your community communication with our comprehensive digital platform designed
                specifically for residential societies and local neighborhoods.
            </p>

                <div className="row justify-content-center">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 border-0" data-aos="fade-up">
                        <div className="card h-100 border-0 feature-card" style={{ boxShadow: '0px 5px 5px grey' }}>
                            <div className="card-body text-center">
                            <i className="fa-solid fa-business-time icon-responsive mb-3"></i>
                            <h5 className="card-title">Real-Time Updates</h5>
                            <p className="card-text">
                                Get instant notifications about important community matters
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" data-aos="fade-up">
                        <div className="card h-100 border-0 feature-card" style={{ boxShadow: '0px 5px 5px grey' }}>
                            <div className="card-body text-center">
                            <i className="fa-solid fa-message icon-responsive mb-3"></i>
                            <h5 className="card-title">Easy Communication</h5>
                            <p className="card-text">
                                Simple, centralized platform for all community communications
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" data-aos="fade-up">
                        <div className="card h-100 border-0 feature-card" style={{ boxShadow: '0px 5px 5px grey' }}>
                            <div className="card-body text-center">
                            <i className="fa-solid fa-star icon-responsive mb-3"></i>
                            <h5 className="card-title">User-Friendly Design</h5>
                            <p className="card-text">
                                Intuitive interface designed for users of all technical levels
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 " data-aos="fade-up">
                        <div className="card h-100 border-0 feature-card" style={{ boxShadow: '0px 5px 5px grey' }}>
                            <div className="card-body text-center">
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
                <div className="col-12 col-sm-6 col-md-4" data-aos="fade-up">
                <div className="card h-100 border-0 function-card">
                    <div className="card-body">
                        <div className='d-flex justify-content-center align-items-top'>
                            <div className='mx-3'>
                                <i className="fa-solid fa-bullhorn"></i>
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

                <div className="col-12 col-sm-6 col-md-4" data-aos="fade-up">
                <div className="card h-100 function-card">
                    <div className="card-body">
                        <div className='d-flex justify-content-center align-items-top'>
                            <div className='mx-3'>
                                <i className="fa-solid fa-calendar"></i>
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

                <div className="col-12 col-sm-6 col-md-4" data-aos="fade-up">
                <div className="card h-100 function-card">
                    <div className="card-body">
                     <div className='d-flex justify-content-center align-items-top'>
                            <div className='mx-3'>
                                <i className="fa-solid fa-bag-shopping"></i>
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

                <div className="col-12 col-sm-6 col-md-4" data-aos="fade-up">
                <div className="card h-100  function-card">
                    <div className="card-body">
                     <div className='d-flex justify-content-center align-items-top'>
                            <div className='mx-3'>
                                <i className="fa-solid fa-phone"></i>
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

                <div className="col-12 col-sm-6 col-md-4" data-aos="fade-up">
                <div className="card h-100 function-card">
                    <div className="card-body">
                     <div className='d-flex justify-content-center align-items-top'>
                            <div className='mx-3'>
                                <i className="fa-solid fa-shield"></i>
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

                <div className="col-12 col-sm-6 col-md-4" data-aos="fade-up">
                <div className="card h-100  function-card">
                    <div className="card-body">
                     <div className='d-flex justify-content-center align-items-top'>
                            <div className='mx-3'>
                                <i className="fa-solid fa-person"></i>
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
        <div className="card text-center rounded-0" style={{backgroundColor:"black",color:'white'}}>
            <div className="card-body">
                <h5 className="card-title">For any query contect : ayushprasad2110@gmail.com</h5>
                <p className="card-text"><i className="fa-solid fa-copyright mx-2"></i>Team CommunityHub</p>
            </div>
        </div>
    </>
  );
};

export default Home;
