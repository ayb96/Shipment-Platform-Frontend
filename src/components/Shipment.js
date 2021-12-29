import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { URL } from "../ServerSideConfig/BackendPort";

export const Shipment = ({ userInfo }) => {
  const [hasMore, sethasMore] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const getShipment = async () => {
      const data = await axios.post(`${URL}/graphql`, {
        query: `
          query { 
            user(id:${userInfo.id}){
              name
              shipments(first:8, page: ${page}){
                      paginatorInfo {
                      total
                      currentPage
                      hasMorePages
                      perPage
                    }
                
                    data{
                        id
                        address
                        waybill
                        name
                        phone
                    }
              }
            }
          }
        `,
      });

      setItems(data.data.data.user.shipments.data);

      sethasMore(data.data.data.user.shipments.paginatorInfo.hasMorePages);
    };
    getShipment();
    setPage(page + 1);
  }, [userInfo]);

  //////////////////////////////////////////
  const fetchArticle = async () => {
    const data = await axios.post(`${URL}/graphql`, {
      query: `
          query { 
            user(id:${userInfo.id}){
              name
              shipments(first:8, page: ${page}){
                      paginatorInfo {
                      total
                      currentPage
                      hasMorePages
                      perPage
                    }
                
                    data{
                      id
                      address
                      waybill
                      name
                      phone
                    }
              }
            }
          }
        `,
    });
    sethasMore(data.data.data.user.shipments.paginatorInfo.hasMorePages);
    return data.data.data.user.shipments.data;
  };

  const fetchData = async () => {
    const articlesFormServer = await fetchArticle();

    setPage(page + 1);
    setItems([...items, ...articlesFormServer]);
  };

  /////////////////////////////////////

  return (
    <div className="main_content">
      <>
        <InfiniteScroll
          className="main_content"
          dataLength={items.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<div className="loading-inf">Loading...</div>}
          endMessage={
            <div style={{ position: "absolute", bottom: "15px" }}>
              <b>Yay! You have seen all your shipments</b>
            </div>
          }
        >
          <div style={{ height: "209px" }}></div>
          {items &&
            items.map((data, index) => {
              return (
                <div
                  key={index}
                  className="card"
                  onClick={() => {
                    navigate(`/updateshipment/${data.id}`);
                  }}
                >
                  <div className="card_img">
                    <img
                      src="https://xpsship.com/wp-content/uploads/2018/12/Organize-and-Track-Shipments-with-Easy-Label-Printing.jpg"
                      alt="shipment"
                    />
                  </div>
                  <div className="card_header">
                    <div>
                      <h2>{data.name}</h2>
                      <div>{data.waybill}</div>
                      <div>{data.address}</div>
                    </div>

                    <p style={{ color: "white" }}>{data.phone}</p>
                  </div>
                </div>
              );
            })}
        </InfiniteScroll>
      </>
    </div>
  );
};
