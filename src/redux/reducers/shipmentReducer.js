import {
  SHIPMENT_DETAILS_FAIL,
  SHIPMENT_DETAILS_REQUEST,
  SHIPMENT_DETAILS_SUCCESS,
} from "../contants/shipment-constant";

export const shipmentDetailReducer = (
  state = { shipment: {}, loading: false, error: false },
  { type, payload }
) => {
  switch (type) {
    case SHIPMENT_DETAILS_FAIL:
      return {
        error: payload,
      };
    case SHIPMENT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case SHIPMENT_DETAILS_SUCCESS:
      return {
        shipment: payload,
        success: true,
      };
    default:
      return state;
  }
};
