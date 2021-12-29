import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import { signout } from "../redux/actions/userAction";

export const Header = ({ userInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate;

  const signoutHandler = () => {
    dispatch(signout(navigate));
  };

  return (
    <div className="header-all-container">
      <header className="row">
        <div className="brand testIconz">
          <Link to="/home">
            <p>Shipment</p>
          </Link>
        </div>
        <div className="search">
          <input
            type="text"
            className="input-search"
            placeholder="Search for shipments"
          />
          <div className="icon-search testIconz">
            <button className="icon-search">
              <SearchIcon />
            </button>
          </div>
        </div>

        <div className="testIconz">
          <>
            {userInfo && (
              <div className="dropdown">
                <Link to="/home">
                  <p className="name-signout">
                    {userInfo.name} <i className="fa fa-caret-down"></i>
                  </p>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </>
        </div>
      </header>
    </div>
  );
};
