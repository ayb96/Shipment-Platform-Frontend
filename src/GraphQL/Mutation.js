import { gql } from "@apollo/client";


export const ADD_SHIPMENT = gql`
  mutation createShipment(
    $address: String!
    $waybill: String!
    $name: String!
    $phone: String!
    $user_id: Int!
  ) {
    createShipment(
      address: $address
      waybill: $waybill
      name: $name
      phone: $phone
      user_id: $user_id
    ) {
      shipment {
        name
      }
    }
  }
`;
export const UPDATE_SHIPMENT = gql`
  mutation updateShipment(
    $id: ID!
    $address: String
    $waybill: String
    $name: String
    $phone: String
  ) {
    updateShipment(
      id: $id
      address: $address
      waybill: $waybill
      name: $name
      phone: $phone
    ) {
      id
      name
    }
  }
`;
export const DELETE_SHIPMENT = gql`
  mutation deleteShipment($id: ID!) {
    deleteShipment(id: $id) {
      id
      name
    }
  }
`;
