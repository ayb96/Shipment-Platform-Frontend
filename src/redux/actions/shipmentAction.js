import axios from "axios";
import { URL } from "../../ServerSideConfig/BackendPort";
import {
  SHIPMENT_DETAILS_FAIL,
  SHIPMENT_DETAILS_REQUEST,
  SHIPMENT_DETAILS_SUCCESS,
} from "../contants/shipment-constant";

export const GetShipmentsById = (ShipmentId) => async (dispatch, getState) => {
  dispatch({ type: SHIPMENT_DETAILS_REQUEST });

  console.log("ShipmentId", ShipmentId);
  try {
    const data = await axios.post(`${URL}/graphql`, {
      query: `
      query {
        shipment(id:${ShipmentId}){
          
          address
          waybill
          name
          phone
         
      }
      }
    `,
    });

    localStorage.setItem(
      "shipmentDetail",
      JSON.stringify(data.data.data.shipment)
    );
    dispatch({ type: SHIPMENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SHIPMENT_DETAILS_FAIL, payload: message });
  }
};
