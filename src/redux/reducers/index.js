import { combineReducers } from "redux";
import { shipmentDetailReducer } from "./shipmentReducer";
import { userRegisterReducer, userSinginReducer } from "./userReducer";

const reducers = combineReducers({
  userSignin: userSinginReducer,
  userRegister: userRegisterReducer,
  shipmentDetail: shipmentDetailReducer,
});

export default reducers;
