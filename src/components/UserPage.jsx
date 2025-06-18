import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';

const UserPage = () => {
  const [user,setUser] = useState([]);

  const getUser = async()=>{
    try {
      const userId = localStorage.getItem('userId');
      const URL = `http://localhost:4000/api/v1/user/get-user/${userId}`;
      const response = await fetch(URL,{
        method:"GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      const data = await response.json();
      console.log(data.user);
      if(response.ok){
        setUser(data.user);
        
      }
    } catch (error) {
      console.log("error",error);
    }
  }

  useEffect(()=>{
    getUser();
  },[]);

  return (
    <>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="card my-5 p-4 border-0">
          <div className="d-flex flex-wrap align-items-center gap-4">
            <img
              src={user.userImage}
              alt="userImage"
              className="img-fluid rounded-circle"
              style={{ maxHeight: "100px", width: "100px", objectFit: "cover" }}
            />
            <div>
              <h3>Welcome back, {user.name}!</h3>
              <p className="text-muted">Here's what's happening in your community today</p>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className="card border-0" style={{
                      borderRadius: '20px',
                      background: 'white',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      textDecoration: 'none'
                    }}>
          <div className="card-header bg-transparent">
            <h3>Quick Actions</h3>
            <p className='text-muted'>Get things done faster</p>
          </div>
          <div className="card-body">
            <div className="row g-4">
              {[
                { icon: 'fa-solid fa-scroll', title: 'Announcements', color: '#cdb4db',link:'/notices' },
                { icon: 'fa-solid fa-calendar-days', title: 'Events',  color: '#ffc8dd' },
                { icon: 'fa-solid fa-bag-shopping', title: 'Marketplace', color: '#ffafcc' },
                { icon: 'fa-solid fa-phone', title: 'Contact Admin',  color: '#bde0fe' }
              ].map((feature, index) => (
                <div key={index} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
                  <Link 
                    to={feature.link}
                    className="card h-100 border-0 text-start p-4 position-relative overflow-hidden"
                    style={{
                      borderRadius: '20px',
                      transition: 'all 0.3s ease',
                      background: 'white',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      textDecoration: 'none'
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
                    <h6 className="fw-bold mb-3">{feature.title}</h6>
                    <p className='text-end'><i class="fa-solid fa-arrow-right"></i></p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserPage
