import React, {useState, useEffect } from 'react'
import Footer from './Footer';
import { toast } from 'react-toastify';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const MarketPlace = () => {
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(true);
  

  const handleCartClick = async(itemId)=>{
    try {
      const userId = localStorage.getItem('userId');
      const URL = `http://localhost:4000/api/v1/user/add-to-cart/${userId}/${itemId}`;
      const response = await fetch(URL,{
        method:"GET",
        headers:{
          "auth-token":localStorage.getItem('token'),
        }
      })
      const data = await response.json();
      if(response.ok){
        toast.success(data.message)
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getItems = async()=>{
    try {
      const URL = "http://localhost:4000/api/v1/user/get-items";
      const response = await fetch(URL,{
        method:"GET",
        headers:{
          "auth-token":localStorage.getItem('token')
        }
      })
      const data = await response.json();
      console.log(data);
      if(response.ok){
        setItems(data.marketPlace);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getItems();
  },[]);

  useEffect(()=>{
    console.log(items)
  },[items]);

  return (
    <>
      {loading && (
        <div className="w-full max-w-md mx-auto px-4 py-5 mt-5 vh-100">
            <DotLottieReact
            src="https://lottie.host/941f2d8d-bbd1-48b3-ad98-b7c753ad96ca/7r1WsKpxoB.lottie"
            loop
            autoplay
            />
        </div>
        )}
        {!loading && 
        <div className='container py-5 mt-5' style={{ minHeight: "100vh" }}>
          <div className='card p-3 border-0' style={{
                      borderRadius: '20px',
                      background: 'white',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      textDecoration: 'none'
                    }}>
            <h2>Items at your market place</h2>
            <hr></hr>
            <div className='row'>
              {items.map((item)=>(
                <div className='col-12 col-md-3'>
                  <div className="card" key={item._id} >
                    <img src={item.itemImage} className="card-img-top" alt="item image"/>
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text text-muted">{item.description}</p>
                      <p className="card-text">Price : {item.price} Rs</p>
                      <button className='btn btn-primary my-2'>Interested</button>
                      <button className='btn btn-outline-primary my-2 mx-2' onClick={()=>{handleCartClick(item._id)}}>Add to Cart</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        }
        <Footer/>
    </>
   
  )
}

export default MarketPlace
