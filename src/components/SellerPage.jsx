import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React, { useEffect, useState } from 'react'
import Footer from './Footer';

const SellerPage = () => {
    const [items,setItems] = useState([]);
    const [loading,setLoading] = useState(true);

    const getItems = async()=>{
        try {
        const URL = "http://localhost:4000/api/v1/user/get-sell";
        const response = await fetch(URL,{
            method:"GET",
            headers:{
            "auth-token":localStorage.getItem('token')
            }
        })
        const data = await response.json();
        console.log(data);
        if(response.ok){
            setItems(data.items);
            setLoading(false)
        }
        } catch (error) {
        console.log(error);
        }
    }

  useEffect(()=>{
    getItems();
  },[]);

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
            <h2>Items You have listed for selling</h2>
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
                      <button className='btn btn-primary my-2'>Un-hold</button>
                      <button className='btn btn-outline-primary my-2 mx-2'>Sold</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        }
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
                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary rounded-circle "><i className="fa-solid fa-plus"></i></button>
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

        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                ...
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
        <Footer/>
    </>
    
  )
}

export default SellerPage
