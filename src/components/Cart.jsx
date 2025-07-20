import  { useEffect, useState } from 'react'
import Footer from './Footer';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import noItems from '../image/no-items.png'
import { toast } from 'react-toastify';


const Cart = () => {
    const [items,setItems] = useState([]);
    const [loading,setLoading] = useState(true);

    const API = "https://society-app-1.onrender.com";

    const handleBuy = async(itemId)=>{
    try {
      const userId = localStorage.getItem('userId');
      const URL = `${API}/api/v1/user/buy/${userId}/${itemId}`;
      const response = await fetch(URL,{
        method:"GET",
        headers:{
          "auth-token":localStorage.getItem('token'),
        }
      })
      const data = await response.json();
      if(response.ok){
        toast.success(data.message);
        getItems();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

    const getItems = async () => {
        try {
        const URL = `${API}/api/v1/user/cart`;
        const response = await fetch(URL, {
            method: "GET",
            headers: {
            "auth-token": localStorage.getItem("token"),
            },
        });

        const data = await response.json();
        if (response.ok && Array.isArray(data.items)) {
            const sortedItems = data.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setItems(sortedItems);
        }
        } catch (error) {
        console.log("Error fetching items:", error);
        }finally{
        setLoading(false);
        }
    };

    useEffect(()=>{
        getItems();
    },[]);
    
  return (
    <>
      <style jsx="true">{`
        @keyframes float {
          0%, 100% { transform: translateY(70px); }
          50% { transform: translateY(-50px); }
        }
        .item-hero {
          background: linear-gradient(135deg, #03045e 0%, #0096c7 100%);
          color: white;
          padding: 4rem 0;
          margin-bottom: 2rem;
        }
        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .hero-subtitle {
          font-size: 1.3rem;
          opacity: 0.9;
          font-weight: 300;
        }
        .loading-container {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      {loading ? (
        <div className="loading-container py-mt-5 vh-100">
          <div className="w-full max-w-md mx-auto px-4">
            <DotLottieReact
              src="https://lottie.host/941f2d8d-bbd1-48b3-ad98-b7c753ad96ca/7r1WsKpxoB.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      ) : (
        <>
          <div className="item-hero position-relative overflow-hidden">
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
                <i className="fa-solid fa-cart-shopping mx-2"></i>
                Cart
              </h1>
              <p className="hero-subtitle">
                Your cart is where great finds live before they’re yours — review, checkout, or keep browsing to discover more gems from your society!
              </p>
            </div>
          </div>

          <div className='container'>
            {items.length === 0 ? (
              <div className="empty-state text-center py-5 mt-5">
                <img src={noItems} alt='No items available' className='img-fluid' style={{ maxHeight: "300px", objectFit: "cover" }} />
              </div>
            ) : (
              <div className="row py-5 mt-5">
                {items.map((item) => {
                  return (
                    <div className="col-12 col-lg-6 col-xl-4 mb-4" key={item._id} style={{ cursor: "pointer" }}>
                      <div
                        className="item-card h-100"
                        data-aos="fade-up"
                        data-aos-delay={1000}
                        style={{
                          borderRadius: '20px',
                          background: 'white',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <div className="card-body p-4 d-flex flex-column">
                          <div className="text-center mb-3">
                            <img
                              className="img-fluid rounded"
                              src={item.itemImage}
                              alt="Item"
                              style={{ maxHeight: "200px", objectFit: "cover" }}
                            />
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5 className="card-title mb-0">{item.title}</h5>
                            <h5 className="card-title mb-0">{item.price} ₹</h5>
                          </div>
                          <p className="card-text text-muted mt-2">{item.description}</p>
                          <div className='mt-auto'>
                            <button className='btn btn-primary mx-2 my-2' onClick={()=>{handleBuy(item._id)}}>Interested</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
      <Footer />
    </>
  )
}

export default Cart
