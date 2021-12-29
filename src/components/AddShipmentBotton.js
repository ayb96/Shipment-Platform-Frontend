import React from "react";
import { useNavigate } from "react-router";
export default function AddShipmentBotton() {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="create-shipment-container"
        onClick={() => {
          navigate(`/addshipment`);
        }}
      >
        <div className="create-shipment-button">Add Shipment</div>
      </div>
      <div style={{ height: "40px" }}></div>
    </>
  );
}
