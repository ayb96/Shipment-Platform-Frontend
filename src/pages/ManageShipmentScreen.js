import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useMutation } from "@apollo/client";

import { UPDATE_SHIPMENT, DELETE_SHIPMENT } from "../GraphQL/Mutation";
import { GetShipmentsById } from "../redux/actions/shipmentAction";
import { useParams } from "react-router";

export default function ManageShipmentScreen() {
  const [toggle, setToggle] = useState(true);
  const [variable, setVariable] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(GetShipmentsById(id));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(GetShipmentsById(id));
    setVariable(false);
  }, [variable, id, dispatch]);

  const { shipment } = useSelector((state) => state.shipmentDetail);
  const { userInfo } = useSelector((state) => state.userSignin);

  const [inputValue, setInputValue] = useState({
    address: "",
    waybill: "",
    name: "",
    phone: "",
  });
  useEffect(() => {
    setToggle(false);
  }, [shipment]);

  const handelInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const { address, waybill, name, phone } = inputValue;

  ////////////////////////////////

  const [updateShipment, { data, loading, error }] =
    useMutation(UPDATE_SHIPMENT);
  // eslint-disable-next-line no-unused-vars
  const [deleteShipment, { dataa }] = useMutation(DELETE_SHIPMENT);
  const deleteHandler = (e) => {
    e.preventDefault();
    deleteShipment({
      variables: {
        id: id,
      },
    });
   
    alert("deleted successfully")
    navigate(`/addshipment`);
    
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateShipment({
      variables: {
        id: id,
        address: address || shipment.data.data.shipment.address,
        waybill: waybill || shipment.data.data.shipment.waybill,
        name: name || shipment.data.data.shipment.name,
        phone: phone || shipment.data.data.shipment.phone,
        user_id: userInfo.id,
      },
    });
    setVariable(true);

    if (error) {
      console.log("create shipment error", error);
    }
  };

  //////////////////////////////////

  return (
    <>
      {toggle ? (
        <LoadingBox></LoadingBox>
      ) : (
        <div className="manage-shipment-container">
          <form className="form user-profile" style={{ height: "100vh" }}>
            <div>
              <h1>Manage Shipment</h1>
            </div>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                {!loading && !error && data && (
                  <MessageBox variant="success">
                    Shipment Updated Successfully
                  </MessageBox>
                )}
                <div>
                  <label htmlFor="address">address</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Enter address"
                    onChange={handelInput}
                    defaultValue={
                      shipment &&
                      shipment.data &&
                      shipment.data.data.shipment.address
                    }
                  ></input>
                </div>
                <div>
                  <label htmlFor="waybill">waybill</label>
                  <input
                    id="waybill"
                    name="waybill"
                    type="text"
                    placeholder="Enter waybill"
                    onChange={handelInput}
                    defaultValue={
                      shipment &&
                      shipment.data &&
                      shipment.data.data.shipment.waybill
                    }
                  ></input>
                </div>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    onChange={handelInput}
                    defaultValue={
                      shipment &&
                      shipment.data &&
                      shipment.data.data.shipment.name
                    }
                  ></input>
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Enter phone"
                    onChange={handelInput}
                    defaultValue={
                      shipment &&
                      shipment.data &&
                      shipment.data.data.shipment.phone
                    }
                  ></input>
                </div>
                <br></br>
                <div>
                  <button className="primary" onClick={submitHandler}>
                    Update Shipment
                  </button>
                  <div style={{ height: "20px" }}></div>
                  <button className="primary" onClick={deleteHandler}>
                    Delete Shipment
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
}
