import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { signin } from "../redux/actions/userAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SigninScreen(props) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { loading, error, userInfo } = useSelector((state) => state.userSignin);
  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [userInfo, navigate]);

  const dispatch = useDispatch();

  const handelInput = (e) => {
    e.persist();
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const { email, password } = inputValue;

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(signin(email, password, navigate));
  };
  return (
    <>
      <form className="signin-container" onSubmit={submitHandler}>
        <div className="form signin-subcontainer">
          <div>
            <h1>Sign In</h1>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && (
            <MessageBox variant="danger">Invalid email or password</MessageBox>
          )}
          <div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              required
              onChange={handelInput}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              required
              onChange={handelInput}
            ></input>
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              Sign In
            </button>
          </div>
          <div className="create-account">
            <label />
            <div className="Newusers">
              New customer?{" "}
              <Link to={`/register`} className="Newuser">
                Create your account
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
