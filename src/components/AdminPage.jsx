import React, { useEffect, useState } from "react";
import noSociety from "../image/No-society.png";
import { jwtDecode } from "jwt-decode";
import Footer from "./Footer";
import './AdminPage.css';

const AdminPage = () => {
  const [society, setSociety] = useState(null);

  const getAdmin = async () => {
    try {
      const adminId = localStorage.getItem("adminId");
      const URL = `http://localhost:4000/api/v1/admin/get-admin/${adminId}`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.admin && data.admin.society) {
        console.log("Your Society", data.admin.society);
        setSociety(data.admin.society);
      }
      console.log(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <>
      {!society && (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="card text-center border-0">
            <div className="card-body">
              <h1 className="card-title mb-3">No Society Created Yet</h1>
              <img className="img-fluid" src={noSociety} alt="No society" />
              <p className="card-text text-muted my-3">
                Get started by creating a new society.
              </p>
              <a href="#" className="btn btn-primary">
                Create Society
              </a>
            </div>
          </div>
        </div>
      )}
      {society && (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="card border-0">
            <div className="card-body">
              <h1>Welcome Admin,</h1>
              <p className="text-muted">
                Here is the information about your Society,{" "}
                <strong>{society.name}</strong>
              </p>
              <div className="row w-100 gx-3 gy-3 my-5">
                <div className="col-6">
                  <a
                    href="#"
                    className="btn btn-light bg-white rounded shadow-sm p-3 text-start w-100 h-100 d-flex flex-column justify-content-between border-0"
                    style={{ minHeight: "150px", cursor: "pointer", outline: "none" }}
                  >
                    <p className="mb-2">Total Residents</p>
                    <h1>400</h1>
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
                <div className="col-6">
                  <a
                    href="#"
                    className="btn btn-light bg-white rounded shadow-sm p-3 text-start w-100 h-100 d-flex flex-column justify-content-between border-0"
                    style={{ minHeight: "150px", cursor: "pointer", outline: "none" }}
                  >
                    <p className="mb-2">Pending Request</p>
                    <h1>200</h1>
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
                <div className="col-6">
                  <a
                    href="#"
                    className="btn btn-light bg-white rounded shadow-sm p-3 text-start w-100 h-100 d-flex flex-column justify-content-between border-0"
                    style={{ minHeight: "150px", cursor: "pointer", outline: "none" }}
                  >
                    <p className="mb-2">Upcoming Events</p>
                    <h1>500</h1>
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
                <div className="col-6">
                  <a
                    href="#"
                    className="btn btn-light bg-white rounded shadow-sm p-3 text-start w-100 h-100 d-flex flex-column justify-content-between border-0"
                    style={{ minHeight: "150px", cursor: "pointer", outline: "none" }}
                  >
                    <p className="mb-2">Recent Notices</p>
                    <h1>500</h1>
                    <i className="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AdminPage;
