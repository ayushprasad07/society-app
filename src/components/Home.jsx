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
      {/* Hero Section - Enhanced with modern glassmorphism */}
      <div
        className="position-relative overflow-hidden my-4"
        style={{
          background: 'linear-gradient(to right, #03045e, #0096c7)',
          minHeight: '100vh',
        }}
      >
        {/* Animated background elements */}
        <div className="position-absolute w-100 h-100">
          <div 
            className="position-absolute rounded-circle opacity-25"
            style={{
              width: '300px',
              height: '300px',
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
              top: '10%',
              right: '10%',
              animation: 'float 10s ease-in-out infinite',
            }}
          ></div>
          <div 
            className="position-absolute rounded-circle opacity-20"
            style={{
              width: '200px',
              height: '200px',
              background: 'linear-gradient(45deg, #feca57, #ff9ff3)',
              bottom: '20%',
              left: '5%',
              animation: 'float 8s ease-in-out infinite reverse',
            }}
          ></div>
        </div>

        <div className='container position-relative' style={{ zIndex: 2 }}>
          <div className="row g-0 d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-lg-6 d-flex align-items-center text-start">
              <div className="py-5">
                <div className="mb-4" style={{ animation: 'slideInLeft 1s ease-out' }}>
                  <h1 className="display-4 fw-bold text-white mb-2">
                    Welcome to the
                  </h1>
                  <h1 className="display-3 fw-bold mb-4" style={{
                    color: "#0077b6"
                  }}>
                    CommunityHub
                  </h1>
                  <p className="lead text-white-50 mb-4">
                    Your digital notice board for local announcements, events, and neighborhood connections. 
                    Stay informed, stay connected, stay engaged with your community.
                  </p>
                </div>
                
                <div className="mb-4" style={{ animation: 'slideInLeft 1s ease-out 0.3s both' }}>
                  <a 
                    href="/admin-sign-up" 
                    className="btn btn-lg px-5 py-3 me-3 mb-3 position-relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
                      border: 'none',
                      borderRadius: '50px',
                      color: 'white',
                      fontWeight: '600',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                    }}
                  >
                    Get Started as Admin
                  </a>
                </div>

                <div className='row g-0' style={{ animation: 'slideInLeft 1s ease-out 0.6s both' }}>
                  <div className='col-12'>
                    <div className='d-flex flex-wrap justify-content-start text-center gap-4'>
                      {[
                        { icon: 'fa-solid fa-circle-check', text: '500+ communities' },
                        { icon: 'fa-solid fa-shield-halved', text: 'Verified societies' },
                        { icon: 'fa-solid fa-headset', text: '24/7 Support' }
                      ].map((item, index) => (
                        <div key={index} className="d-flex align-items-center text-white-50">
                          <i className={`${item.icon} me-2`} style={{ color: '#4ecdc4' }}></i>
                          <span className="small">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 offset-lg-1" style={{ animation: 'slideInRight 1s ease-out 0.4s both' }}>
              <div
                className="card border-0 p-4 my-5"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '24px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              >
                <h3 className="text-white mb-4 text-center">Quick Access</h3>
                <div className="row g-3">
                  {[
                    { icon: 'fa-solid fa-bullhorn', text: 'View Announcements', color: '#ff6b6b' },
                    { icon: 'fa-solid fa-calendar', text: 'Browse Events', color: '#4ecdc4' },
                    { icon: 'fa-solid fa-bag-shopping', text: 'Market Place', color: '#feca57' },
                    { icon: 'fa-solid fa-phone-volume', text: 'Contact Directory', color: '#ff9ff3' }
                  ].map((item, index) => (
                    <div key={index} className="col-6">
                      <button 
                        className="btn w-100 h-100 border-0 p-3 text-start position-relative overflow-hidden"
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '16px',
                          minHeight: '120px',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-5px)';
                          e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                        }}
                      >
                        <div className="d-flex flex-column justify-content-between h-100">
                          <i className={item.icon} style={{ fontSize: '24px', color: item.color }}></i>
                          <p className="mb-0 mt-2 fw-semibold" style={{ fontSize: '14px' }}>{item.text}</p>
                          <i className="fa-solid fa-arrow-right align-self-end" style={{ color: item.color }}></i>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-center text-white-50 mt-3 mb-0 small">Everything you need in one place</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced wave SVG */}
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          className="position-absolute bottom-0 w-100"
          style={{ zIndex: 1 }}
        >
          <path
            fill="white"
            fillOpacity="1"
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
          />
        </svg>
      </div>

      {/* Enhanced Feature Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Why Choose CommunityHub?</h2>
            <p className="lead text-muted">
              Transform your community communication with our comprehensive digital platform designed
              specifically for residential societies and local neighborhoods.
            </p>
          </div>

          <div className="row g-4">
            {[
              { icon: 'fa-solid fa-business-time', title: 'Real-Time Updates', desc: 'Get instant notifications about important community matters', color: '#667eea' },
              { icon: 'fa-solid fa-message', title: 'Easy Communication', desc: 'Simple, centralized platform for all community communications', color: '#764ba2' },
              { icon: 'fa-solid fa-star', title: 'User-Friendly Design', desc: 'Intuitive interface designed for users of all technical levels', color: '#f093fb' },
              { icon: 'fa-regular fa-circle-check', title: 'Reliable & Maintained', desc: 'Consistently updated and maintained for optimal performance', color: '#f5576c' }
            ].map((feature, index) => (
              <div key={index} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
                <div 
                  className="card h-100 border-0 text-center p-4 position-relative overflow-hidden"
                  style={{
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    background: 'white',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}
                >
                  <div 
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '80px',
                      height: '80px',
                      background: `linear-gradient(45deg, ${feature.color}, ${feature.color}90)`,
                    }}
                  >
                    <i className={feature.icon} style={{ fontSize: '32px', color: 'white' }}></i>
                  </div>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Functions Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            {[
              {
                img: announcement,
                title: 'Community Announcements',
                desc: 'Stay informed with real-time announcements from your community management, including emergency alerts, maintenance updates, and general notices.',
                features: ['Emergency notifications', 'Maintenance schedules', 'Community updates', 'Pinned important messages'],
                gradient: 'linear-gradient(45deg, #667eea, #764ba2)'
              },
              {
                img: event,
                title: 'Local Events & Activities',
                desc: 'Discover and participate in community events, from social gatherings to educational workshops and seasonal celebrations.',
                features: ['Event calendar', 'RSVP functionality', 'Event reminders', 'Community activities'],
                gradient: 'linear-gradient(45deg, #f093fb, #f5576c)'
              },
              {
                img: market,
                title: 'Neighborhood Marketplace',
                desc: 'Buy, sell, rent, or give away items within your community. Connect with neighbors for local transactions and reduce waste.',
                features: ['Buy & sell locally', 'Rental listings', 'Free item exchange', 'Neighbor-to-neighbor deals'],
                gradient: 'linear-gradient(45deg, #4facfe, #00f2fe)'
              },
              {
                img: call,
                title: 'Essential Contacts',
                desc: 'Quick access to important community contacts including emergency services, maintenance, administration, and local services.',
                features: ['Emergency contacts', 'Maintenance requests', 'Administrative support', '24/7 availability info'],
                gradient: 'linear-gradient(45deg, #43e97b, #38f9d7)'
              },
              {
                img: secure,
                title: 'Secure & Private',
                desc: 'Your community data is protected with role-based access control, ensuring only authorized members can post and manage content.',
                features: ['Role-based permissions', 'Secure authentication', 'Privacy protection', 'Admin moderation'],
                gradient: 'linear-gradient(45deg, #fa709a, #fee140)'
              },
              {
                img: building,
                title: 'Community Building',
                desc: 'Foster stronger neighborhood connections through shared information, local commerce, and community engagement.',
                features: ['Neighbor connections', 'Local networking', 'Community spirit', 'Shared resources'],
                gradient: 'linear-gradient(45deg, #a8edea, #fed6e3)'
              }
            ].map((item, index) => (
              <div key={index} className="col-lg-6" data-aos="fade-up" data-aos-delay={index * 100}>
                <div 
                  className="card h-100 border-0 overflow-hidden position-relative"
                  style={{
                    borderRadius: '24px',
                    background: 'white',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                  }}
                >
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start mb-4">
                      <div 
                        className="rounded-3 p-3 me-4 flex-shrink-0"
                        style={{
                          background: item.gradient,
                          width: '80px',
                          height: '80px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img src={item.img} alt={item.title} className="img-fluid" style={{ maxWidth: '40px' }} />
                      </div>
                      <div>
                        <h4 className="fw-bold mb-3">{item.title}</h4>
                        <p className="text-muted mb-0">{item.desc}</p>
                      </div>
                    </div>
                    <div className="row g-2">
                      {item.features.map((feature, fIndex) => (
                        <div key={fIndex} className="col-6">
                          <div className="d-flex align-items-center">
                            <i className="fa-solid fa-circle-check me-2" style={{ color: '#4ecdc4', fontSize: '12px' }}></i>
                            <span className="small text-muted">{feature}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section 
        className="py-5 position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(to right, #e6f6fa 30%, #e6f6fa 70%, white)',
        }}
      >
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3" style={{color:"#0077b6"}}>Trusted by Communities</h2>
            <p className="lead text-muted">Join thousands of residents who rely on CommunityHub</p>
          </div>
          <div className="row g-4 text-center">
            {[
              { number: '500+', label: 'Communities' },
              { number: '15K+', label: 'Monthly Announcements' },
              { number: '300K+', label: 'Community Events' },
              { number: '99.9%', label: 'Uptime Reliability' }
            ].map((stat, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div 
                  className="card border-0 p-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '20px',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <h1 className="display-4 fw-bold mb-2" style={{color:"#0077b6"}}>{stat.number}</h1>
                  <p className="text-muted mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section 
        className="py-5 text-center text-white position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(to right, #03045e, #0096c7)',
        }}
      >
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="display-5 fw-bold mb-3">Ready to Transform Your Community?</h2>
              <p className="lead mb-4">
                Join thousands of communities already using CommunityHub to stay connected, informed, and engaged.
              </p>
              <a 
                href="/" 
                className="btn btn-lg px-5 py-3 mb-5"
                style={{
                  background: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  color: '#03045e',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
                }}
              >
                Get Started as Admin
              </a>
              
              <div className="row g-4 mt-4">
                {[
                  { icon: 'fa-solid fa-check', title: 'Easy Setup', desc: 'Get your community board running in minutes' },
                  { icon: 'fa-solid fa-check', title: 'No Technical Skills Required', desc: 'User-friendly interface for everyone' },
                  { icon: 'fa-solid fa-check', title: '24/7 Support', desc: 'We\'re here to help whenever you need us' }
                ].map((item, index) => (
                  <div key={index} className="col-md-4">
                    <div className="text-center">
                      <i className={item.icon} style={{ fontSize: '24px', color: '#ffd700' }}></i>
                      <h6 className="fw-bold mt-3 mb-2">{item.title}</h6>
                      <p className="text-white-50 small mb-0">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Toast Notification */}
      <div
        className="position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 1100, maxWidth: '280px' }}
      >
        <div
          className="toast show shadow-lg border-0"
          style={{
            background: 'linear-gradient(45deg, #03045e, #0096c7)',
            borderRadius: '16px',
            animation: 'slideInRight 0.5s ease-out',
          }}
        >
          <div className="toast-body text-white text-center py-3">
            <i className="fa-solid fa-heart me-2" style={{ color: '#ff6b6b' }}></i>
            Made with love by Ayush
          </div>
        </div>
      </div>

      <Footer />

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes slideInLeft {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .btn:hover {
          transform: translateY(-2px);
        }
        
        .card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </>
  );
};

export default Home;