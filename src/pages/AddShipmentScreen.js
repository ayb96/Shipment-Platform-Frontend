import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import { useMutation } from "@apollo/client";
import { ADD_SHIPMENT } from "../GraphQL/Mutation";

export default function AddShipentScreen() {
  const [inputValue, setInputValue] = useState({
    address: "",
    waybill: "",
    name: "",
    phone: "",
  });
  const { userInfo } = useSelector((state) => state.userSignin);

  const handelInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const { address, waybill, name, phone } = inputValue;

  const [createShipment, { data, loading, error }] = useMutation(ADD_SHIPMENT);

  const submitHandler = (e) => {
    console.log("create shipment variable", address, waybill, name, phone);
    e.preventDefault();
    createShipment({
      variables: {
        address,
        waybill,
        name,
        phone,
        user_id: userInfo.id,
      },
    });
    if (error) {
      console.log("create shipment error", error);
    }
  };
  return (
    <>
      <div className="add-shipment-container">
        <form
          className="form user-profile"
          style={{ height: "100vh" }}
          onSubmit={submitHandler}
        >
          <div>
            <h1>Add Shipment</h1>
          </div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {!loading && !error && data && (
                <MessageBox variant="success">
                  Shipment Created Successfully
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
                  required
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
                  required
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
                  required
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
                  required
                ></input>
              </div>

              <div>
                <label />
                <button className="primary" type="submit">
                  Add Shipment
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
}
