import React from "react";
import { useSelector } from "react-redux";
import AddShipmentBotton from "../components/AddShipmentBotton";
import { Shipment } from "../components/Shipment";

export default function HomeScreen() {
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <div>
      
      <AddShipmentBotton />
      <Shipment userInfo={userInfo}/>
      
    </div>
  );
}
