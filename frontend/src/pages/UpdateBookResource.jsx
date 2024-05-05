import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateBookResource = () => {
  const [formData, setFormData] = useState({
    resourceName: "",
    noOfResource: "",
    mobile: "",
    email: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [publishError, setPublishError] = useState(null);
  const { resourceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/sportsbooking/getsportsbooking/${resourceId}`
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        setFormData(data);
        setPublishError(null);
      } catch (error) {
        console.error("Error fetching booking data:", error);
        setPublishError("Something went wrong while fetching booking data.");
      }
    };

    fetchBookingData();
  }, [resourceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        date: new Date(formData.date).toISOString(),
      };

      const res = await fetch(
        `http://localhost:3000/api/sportsbooking/updatesportsbooking/${resourceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }

      setPublishError(null);
      navigate(`/book-resource-dash`);
    } catch (error) {
      console.error("Error updating booking:", error);
      setPublishError("The Resource is Not Available At the Specified Time.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div
      className="shadow rounded"
      style={{
        width: "100%",
        paddingTop: "3rem",
        height: "110vh",
        background: `url('https://media.istockphoto.com/id/1192023529/photo/asian-badminton-player-is-hitting-in-court.jpg?s=2048x2048&w=is&k=20&c=gsHnoRE9TJI-PU9AocMJYi7SPyFlGD6sCDrtK4pH8as=') no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="card"
        style={{
          width: "30rem",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "10px",
        }}
      >
        <div className="card-body" style={{ paddingTop: "2rem" }}>
          <h4 className="card-title text-center font-serif text-uppercase">
            Update Booking
          </h4>
          <hr className="my-4 border border-secondary" />

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="resourceName" className="form-label">
                  Resource or Facility Name
                </label>
                <select
                  id="resourceName"
                  className="form-select"
                  name="resourceName"
                  value={formData.resourceName}
                  onChange={handleInputChange}
                >
                  <option value="No">Select</option>
                  <option value="Bats">Bats</option>
                  <option value="Ball">Ball</option>
                  <option value="Rackets">Rackets</option>
                  <option value="Shuttle-Cocks">Shuttle Cocks</option>
                  <option value="volley-Balls">Volley Balls</option>
                  <option value="Kick-Boards">Kick Boards</option>
                </select>
              </div>

              <div className="col-12">
                <label htmlFor="noOfResource" className="form-label">
                  Number of Resources (Only for Resources)
                </label>
                <input
                  type="number"
                  required
                  id="noOfResource"
                  className="form-control"
                  name="noOfResource"
                  value={formData.noOfResource}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-12">
                <label htmlFor="mobile" className="form-label">
                  Mobile
                </label>
                <input
                  type="number"
                  required
                  id="mobile"
                  className="form-control"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  pattern="[0-9]{10}"
                  title="Mobile number must contain exactly 10 digits"
                />
                <div className="text-danger">
                  {formData.mobile &&
                    formData.mobile.length !== 10 &&
                    "Mobile number must contain exactly 10 digits."}
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  required
                  id="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" // Email pattern
                  title="Please enter a valid email address" // Error message if pattern doesn't match
                />
                <div className="text-danger">
                  {formData.email &&
                    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                      formData.email
                    ) &&
                    "Please enter a valid email address."}
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  required
                  id="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]} // Minimum allowed date is today
                />
                <div className="text-danger">
                  {formData.date &&
                    new Date(formData.date) < new Date() &&
                    "Please select a future date."}
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="startTime" className="form-label">
                  Start Time
                </label>
                <input
                  type="time"
                  required
                  id="startTime"
                  className="form-control"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-12">
                <label htmlFor="endTime" className="form-label">
                  End Time
                </label>
                <input
                  type="time"
                  required
                  id="endTime"
                  className="form-control"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-12 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success btn-lg"
                  style={{ minWidth: "350px", marginTop: "2rem" }}
                >
                  Update
                </button>
              </div>

              {publishError && (
                <div className="col-12">
                  <div className="alert alert-danger mt-3" role="alert">
                    {publishError}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBookResource;
