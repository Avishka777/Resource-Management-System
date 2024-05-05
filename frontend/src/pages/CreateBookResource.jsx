import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BookResource() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:3000/api/sportsbooking/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setPublishError(data.message);
        return;
      }

      setPublishError(null);
      navigate(`/book-resource-dash`);
    } catch (error) {
      setPublishError("Something Went Wrong");
    }
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
            Resource And Facility Booking
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
                  onChange={(e) =>
                    setFormData({ ...formData, resourceName: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, noOfResource: e.target.value })
                  }
                />
              </div>

              <div className="col-12">
                <label htmlFor="mobile" className="form-label">
                  Mobile
                </label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                  id="mobile"
                  className="form-control"
                  value={formData.mobile || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                />
                <div className="text-danger">
                  {formData.mobile &&
                    formData.mobile.length !== 10 &&
                    "Mobile number should be exactly 10 digits."}
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
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <div className="text-danger">
                  {formData.email &&
                    !/\S+@\S+\.\S+/.test(formData.email) &&
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
                  min={new Date().toISOString().split("T")[0]} 
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                />
              </div>

              <div className="col-12 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success btn-lg"
                  style={{ minWidth: "350px", marginTop: "2rem" }}
                >
                  Submit
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
}
