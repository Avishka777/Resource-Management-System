import React, { useEffect, useState } from "react";
import { Modal, Table, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./PdfDoucument";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DashSportsbooking() {
  const [userSportsbookings, setUserSportsbookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [sportsbookingIdToDelete, setSportsbookingIdToDelete] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSportsbookings = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/sportsbooking/getsportsbookings"
        );
        const data = await res.json();
        if (res.ok) {
          setUserSportsbookings(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSportsbookings();
  }, []);

  const handleDeleteSportsbooking = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `http://localhost:3000/api/sportsbooking/deletesportsbooking/${sportsbookingIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserSportsbookings((prev) =>
          prev.filter(
            (sportsbooking) => sportsbooking._id !== sportsbookingIdToDelete
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const prepareCSVData = (data) => {
    return data.map((sportsbooking) => ({
      ResourceName: sportsbooking.resourceName,
      Mobile: sportsbooking.mobile,
      Email: sportsbooking.email,
      BookedDates: sportsbooking.date, 
      StartTime: sportsbooking.startTime, 
      EndTime: sportsbooking.endTime, 
    }));
  };

  const generateCSVReport = () => {
    if (!userSportsbookings || userSportsbookings.length === 0) {
      return null;
    }

    const csvData = prepareCSVData(userSportsbookings);
    const csvReportOptions = {
      filename: "Recourse-Booking-Report.csv",
      headers: Object.keys(csvData[0]),
    };
    return (
      <CSVLink data={csvData} {...csvReportOptions}>
        <Button style={{ background:'green' , border:'green'}}>Generate CSV Report</Button>
      </CSVLink>
    );
  };

  const generatePDFReport = () => {
    if (!userSportsbookings || userSportsbookings.length === 0) {
      return null;
    }

    return (
      <PDFDownloadLink
        document={<PdfDocument data={userSportsbookings} />}
        fileName="Resource-Booking.pdf"
      >
        {({ loading }) => (
          <Button style={{ marginLeft: "1rem",background:'green', border:'green' }}>
            {loading ? "Loading..." : "Generate PDF Report"}
          </Button>
        )}
      </PDFDownloadLink>
    );
  };

  // Filter userSportsbookings based on searchQuery
  const filteredSportsbookings = userSportsbookings.filter(
    (booking) =>
      booking.resourceName &&
      booking.resourceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full p-5">
      <div className="mb-3">
        <FormControl
          type="text"
          placeholder="Search by Resource Name"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Resource Name</th>
            <th>No of Resource</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Booked Dates</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredSportsbookings.map((sportsbooking) => (
            <tr key={sportsbooking._id}>
              <td>{sportsbooking.resourceName}</td>
              <td>{sportsbooking.noOfResource}</td>
              <td>{sportsbooking.mobile}</td>
              <td>{sportsbooking.email}</td>
              <td>{new Date(sportsbooking.date).toLocaleDateString()}</td>
              <td>{sportsbooking.startTime}</td>
              <td>{sportsbooking.endTime}</td>

              <td>
                <Button variant="primary">
                  <Link
                    to={`/update-sportsbooking/${sportsbooking._id}`}
                    style={{ color: "white", textDecoration: "none" }} 
                  >
                    Update
                  </Link>
                </Button>
              </td>

              <td>
                <Button
                  variant="danger"
                  onClick={() => {
                    setShowModal(true);
                    setSportsbookingIdToDelete(sportsbooking._id);
                  }}
                >
                  Delete
                </Button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </Table>

      {generateCSVReport()}
      {generatePDFReport()}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "12rem" }}>
            Delete Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg text-gray-500">
              Are you sure you want to delete this Booking?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                variant="danger"
                onClick={handleDeleteSportsbooking}
                style={{ marginRight: "1rem" }}
              >
                Yes, I'm sure
              </Button>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
