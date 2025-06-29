import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import noItems from '../image/No-items.png'; 
import { toast } from 'react-toastify';

const SellerPage = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const loggedInUserId = localStorage.getItem('userId');
  const [itemDetails,setItemDetails] = useState({title:"",description:"",price:"",venue:"",phone:""});
  const [file,setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { title, description, price, venue, phone } = itemDetails;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("venue", venue);
    formData.append("phone", phone);
    props.setProgress(10);

    if (file) {
      formData.append("itemImage", file);
    }

    const URL = "http://localhost:4000/api/v1/user/sell-item";
    props.setProgress(40);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      });
      props.setProgress(70);
      const data = await response.json();

      if (response.ok) {
        props.setProgress(100);
        toast.success(data.message)
        setItemDetails({
          title: "",
          description: "",
          price: "",
          venue: "",
          phone: ""
        });
        setFile(null);
        const modalEl = document.getElementById("exampleModal");
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      } else {
        props.setProgress(100);
        toast.error(data.message)
      }
    } catch (error) {
      props.setProgress(100);
      console.error("Network error:", error);
    }
  };

  const handleChange = (e)=>{
    if(e.target.name==='itemImage'){
      setFile(e.target.files[0]);
    }else{
      setItemDetails({...itemDetails,[e.target.name]:e.target.value})
    }
  }

  const handleRelease = async (itemId)=>{
    try {
      props.setProgress(10);
      const URL = `http://localhost:4000/api/v1/user/release/${itemId}`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      });
      props.setProgress(40);
      const data = await response.json();
      props.setProgress(70);
      if (response.ok) {
        toast.success(data.message);
        props.setProgress(100);
        getItems();
      }
    } catch (error) {
      props.setProgress(100);
      console.log(error);
    }
  }

  const handleSold = async (itemId)=>{
    try {
      props.setProgress(10);
      const URL = `http://localhost:4000/api/v1/user/sold/${itemId}`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      });
      props.setProgress(40);
      const data = await response.json();
      props.setProgress(70);
      if (response.ok) {
        toast.success(data.message);
        props.setProgress(100);
        getItems();
      }
    } catch (error) {
      props.setProgress(100);
      console.log(error);
    }
  }

  const getItems = async () => {
    try {
      props.setProgress(10);
      const URL = "http://localhost:4000/api/v1/user/get-sell";
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem('token')
        }
      });
      props.setProgress(40);
      const data = await response.json();
      props.setProgress(70);
      if (response.ok) {
        props.setProgress(100);
        setItems(data.items);
        setLoading(false);
      }
    } catch (error) {
      props.setProgress(100);
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>

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
                <i className="fas fa-shopping-bag me-3"></i>
                Items you have listed for sale
              </h1>
              <p className="hero-subtitle">
                Got something to sell? Share it with your society and find buyers fast!
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
                  const filteredUsers = item.interestedUsers.filter(entry => entry.user._id.toString() !== loggedInUserId?.toString());
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

                          {filteredUsers.length > 0 && (
                            <div className="card border-0 mt-3" style={{ maxHeight: "200px", overflowY: "scroll" }}>
                              <div className="card-header">Interested Users</div>
                              <div className="card-body">
                                {filteredUsers.map((entry) => (
                                  <div className="card mb-2" key={entry._id}>
                                    <div className="card-body">
                                      <h5 className="card-title">{entry.user.name}</h5>
                                      <p className="card-text"> email : {entry.user.email}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {item.interestedUsers.length !==0 && !item.isSold && <div>
                            <button className='btn btn-primary mx-2 my-2' onClick={()=>{handleRelease(item._id)}}>Un-hold</button>
                            <button className='btn btn-outline-primary mx-2 my-2' onClick={()=>{handleSold(item._id)}}>Sold</button>
                          </div>}
                          {item.interestedUsers.length !==0 && item.isSold && <div>
                            <button className='btn btn-outline-primary mx-2 my-2' disabled>Sold</button>
                          </div>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <button 
            type="button" 
            className="fab-button" 
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal"
            title="Create New Notice"
          >
            <i className="fas fa-plus"></i>
          </button>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title" id="exampleModalLabel">
                            <i className="fas fa-plus-circle me-2"></i>
                            Add Item for Sale
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} >
                           <div className="mb-4">
                              <label htmlFor="eventImage" className="form-label">
                                <i className="fas fa-image me-2"></i>
                                Item Image
                              </label>
                              <input 
                                type="file" 
                                className="form-control" 
                                id="itemImage" 
                                name='itemImage'
                                onChange={handleChange}
                                accept="image/*"
                                required
                              />
                              <small className="form-text text-muted">
                                Upload an attractive image to represent your item
                              </small>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="title" className="form-label">
                                    <i className="fas fa-heading me-2"></i>
                                    Item Title
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="title" 
                                    name='title' 
                                    onChange={handleChange}
                                    placeholder="Enter a clear and concise title"
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="content" className="form-label">
                                    <i className="fas fa-align-left me-2"></i>
                                    Item Description
                                </label>
                                <textarea 
                                    className="form-control" 
                                    id="description" 
                                    name='description'
                                    value={itemDetails.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Provide detailed information about the item"
                                    required
                                ></textarea>
                            </div>
                            
                            <div className="mb-4">
                                <label htmlFor="content" className="form-label">
                                    <i class="fa-solid fa-location-dot me-2"></i>
                                    Venue to contect
                                </label>
                                <input 
                                    type='text'
                                    className="form-control" 
                                    id="venue" 
                                    name='venue'
                                    onChange={handleChange}
                                    required
                                ></input>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="content" className="form-label">
                                    <i class="fa-solid fa-tag mx-2"></i>
                                    Price
                                </label>
                                <input 
                                    type='number'
                                    className="form-control" 
                                    id="price" 
                                    name='price'
                                    onChange={handleChange}
                                    required
                                ></input>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="content" className="form-label">
                                    <i class="fa-solid fa-phone me-2"></i>
                                    Phone Number
                                </label>
                                <input 
                                    type='number'
                                    className="form-control" 
                                    id="phone" 
                                    name='phone'
                                    onChange={handleChange}
                                    required
                                ></input>
                            </div>
                            
                            <div className="modal-footer border-0 pt-0">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    <i className="fas fa-times me-2"></i>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <i className="fas fa-paper-plane me-2"></i>
                                    Send item for approval
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default SellerPage;
