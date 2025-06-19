import React, { useEffect, useState } from 'react'
import logo from '../image/CommunityHub logo.png'
import Footer from './Footer'
import noImage from '../image/default.jpg'
import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router';

const UserSignUp = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", gender: "", society: "" });
    const [file, setFile] = useState(null);
    const [societies, setSocieties] = useState(null);
    const [filteredSocieties, setFilteredSocieties] = useState([]);
    const [query, setQuery] = useState("");
    const navigator = useNavigate();

    useEffect(() => {
        const fetchSocieties = async () => {
            try {
                const URL = "http://localhost:4000/api/v1/society/get-societies";
                const response = await fetch(URL, {
                    method: "GET"
                });
                const data = await response.json();
                setSocieties(data.societies);
                setFilteredSocieties(data.societies);
            } catch (error) {
                toast.error("Failed to fetch societies");
            }
        };
        fetchSocieties();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "userImage") {
            setFile(e.target.files[0]);
        } else {
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
        }
    }

    const handleSocietySearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim() === "") {
            setFilteredSocieties([]);
            return;
        }

        const filtered = societies.filter((s) =>
            s.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSocieties(filtered);
    };

    const handleSubmit = async (e) => {
        props.setProgress(10);
        e.preventDefault();
        try {
            const URL = "http://localhost:4000/api/v1/user/signUp";
            const formData = new FormData();
            for (let key in credentials) {
                formData.append(key, credentials[key]);
            }
            if (file) {
                formData.append("userImage", file);
            }
            props.setProgress(40);
            const response = await fetch(URL, {
                method: "POST",
                body: formData
            });
            props.setProgress(70);
            const data = await response.json();
            console.log("Signup response:", data);

            if (response.ok && data.authToken && data.user) {
                toast.success(data.message || "Account created successfully!");
                localStorage.setItem('token', data.authToken);
                localStorage.setItem('userId', data.user._id);
                toast.success(data.message || "Account created successfully!");
                props.setProgress(100);
                navigator("/user-page");
            } else {
                props.setProgress(100);
                toast.error(data.message || "Signup failed");
            }

        } catch (error) {
            console.log("error", error);
            props.setProgress(100);
            toast.error("Something went wrong. Please try again.");
        }
    }

    const handleSocietySelect = (society) => {
        setQuery(society.name);
        setCredentials((prev) => ({ ...prev, society: society._id }));
        setFilteredSocieties([]);
    }

    return (
        <>
            <div className='container d-flex justify-content-center align-items-center' style={{ marginTop: "70px", marginBottom: "50px" }}>
                <div className="card p-4" style={{
                    width: "100%", maxWidth: "500px", boxShadow: "0px 0px 20px white"
                }}>
                    <img
                        src={logo}
                        alt="TutorConnect Logo"
                        className="img-fluid d-block mx-auto mb-3"
                        style={{ width: "150px", height: "auto" }}
                    />
                    <form onSubmit={handleSubmit}>
                        <h1>
                            Sign up to Continue
                        </h1>
                        <div className='mb-3'>
                            <div className='d-flex flex-column align-items-center'>
                                <div className='col-12 col-md-4 text-center mb-3'>
                                    <img src={noImage} alt="Student" className="rounded-circle img-fluid" style={{ maxWidth: '100px', height: '100px', objectFit: 'cover' }} />
                                </div>
                            </div>
                            <label htmlFor="userImage" className="form-label">Profile</label>
                            <input type="file" className="form-control" id="userImage" name="userImage" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" name='name' onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" name='email' onChange={handleChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name='password' onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label d-block">Gender</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="male" value="male" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="female" value="female" onChange={handleChange} />
                                <label className="form-check-label" htmlFor="female">Female</label>
                            </div>
                        </div>
                        <div className='mb-3 position-relative'>
                            <label htmlFor="society" className="form-label">Society</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Search for Society'
                                id="society"
                                name='society'
                                value={query}
                                onChange={handleSocietySearch}
                            />
                            {query && filteredSocieties.length > 0 && (
                                <ul className="list-group position-absolute w-100 z-3" style={{ maxHeight: '150px', overflowY: 'auto', cursor: "pointer" }}>
                                    {filteredSocieties.map((soc) => (
                                        <li key={soc._id} className="list-group-item list-group-item-action" onClick={() => handleSocietySelect(soc)}>
                                            {soc.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserSignUp;
