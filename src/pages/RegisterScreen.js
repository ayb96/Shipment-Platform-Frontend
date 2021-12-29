import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { register } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
export default function SignupScreen(props) {
  const navigate = useNavigate();
  const { loading, error } = useSelector(
    (state) => state.userRegister
  );
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password } = inputValue;
  const {userInfo } = useSelector((state) => state.userSignin);
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValue.password !== inputValue.confirmPassword) {
      alert("Password and comfirm password are not match");
    } else {
      dispatch(register(name, email, password, navigate));
      
    }
  };

  return (
    <>
      <form className="register-container" onSubmit={submitHandler}>
        <div className="form registration-subcontainer">
          <div>
            <h1>Register</h1>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox>{error}</MessageBox>}
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Enter name"
              required
              onChange={handelInput}
            ></input>
          </div>
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
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password"
              required
              onChange={handelInput}
            ></input>
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              Register
            </button>
          </div>
          <div className="create-account">
            <label />
            <div className="Newusers">
              Already have an acount?{" "}
              <Link to={`/`} className="Newuser">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
