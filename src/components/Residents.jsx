import  { useEffect, useRef, useState } from 'react';
import noImage from '../image/default.jpg';
import Footer from './Footer';

const Residents = (props) => {
  const [residentsData, setResidentsData] = useState([]);
  const [selectedResident, setSelectedResident] = useState(null);

  const API = "https://society-app-1.onrender.com";

  const getResidents = async () => {
    try {
      props.setProgress(10);
      const URL = `${API}/api/v1/admin/viewAllRequests`;
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      props.setProgress(40);
      const data = await response.json();
      props.setProgress(70);
      if (Array.isArray(data.user)) {
        const sortedUsers = data.user.sort((a, b) =>
          (a.name || "").localeCompare(b.name || "", undefined, { sensitivity: 'base' })
        );
        setResidentsData(sortedUsers);
        props.setProgress(100);
      } else {
        console.warn("data.user is not an array");
        setResidentsData([]);
        props.setProgress(100);
      }
    } catch (error) {
      console.log("error", error);
      props.setProgress(100);
    }
  };

  const handleRemove = async () => {
    if (!selectedResident) return;
    try {
      const URL = `${API}/api/v1/admin/reject-request/${selectedResident._id}`;
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const data = await response.json();
      if (response.ok) {
        setResidentsData(prev => prev.filter(user => user._id !== selectedResident._id));
        setSelectedResident(null);
        // Close the modal programmatically
        document.getElementById('closeModalBtn').click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResidents();
  }, []);

  return (
    <>
      <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='card container p-5'>
          <h2 className="mb-4">Residents</h2>
          <hr />
          <div className="table-responsive my-5">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>S.no</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {residentsData.length > 0 ? (
                  residentsData.map((resident, index) => (
                    <tr key={resident._id || index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img
                          className="img-fluid rounded-circle"
                          src={resident.userImage || noImage}
                          alt="image"
                          style={{ width: "40px", height: "40px", objectFit: "cover" }}
                        />
                      </td>
                      <td>{resident.name || '-'}</td>
                      <td>{resident.email || '-'}</td>
                      <td>{resident.isValid ? <p className='text-success'>Active</p> : '-'}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#confirmModal"
                          onClick={() => setSelectedResident(resident)}
                        >
                          Remove <i className="fa-solid fa-user-minus mx-2"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No residents found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="modal fade" id="confirmModal" tabIndex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmModalLabel">Confirm Removal</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeModalBtn"></button>
            </div>
            <div className="modal-body">
              {selectedResident && (
                <>
                  <div className='d-flex align-items-center mb-3'>
                    <img
                      src={selectedResident.userImage || noImage}
                      alt="resident"
                      className="rounded-circle me-3"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                    <h5 className="mb-0">{selectedResident.name}</h5>
                  </div>
                  <p>Email: {selectedResident.email}</p>
                  <p>Are you sure you want to remove this resident?</p>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleRemove}>Remove</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Residents;
