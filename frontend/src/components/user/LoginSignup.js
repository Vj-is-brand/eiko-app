import React, { useRef, useState, useEffect } from "react";
import { FaLockOpen, FaMailBulk } from "react-icons/fa";
import { AiOutlineUser, AiFillMail, AiOutlineLock } from "react-icons/ai";
import "./LoginSignup.css";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError, register } from "../../actions/UserAction";
import { useAlert } from "react-alert";
// import Loader from "../layout/Loader/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormData } from "formdata-node";

const LoginSignup = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [repassword, setRepassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

  const { name, email, password, repassword } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("repassword", repassword);
    // myForm.set("avatar", avatar);
    console.log(myForm);

    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    const { name, value } = e.target;
    // console.log("Name:", name);
    // console.log("Value:", value);
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    console.log("User State:", user);
  };

  // const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);

  const switchTab = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {/* {loading ? (
        <Loader />) : ( */}
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p
                onClick={(e) => {
                  switchTab(e, "login");
                }}
              >
                Login
              </p>
              <p
                onClick={(e) => {
                  switchTab(e, "register");
                }}
              >
                Register
              </p>
            </div>
            <button ref={switcherTab} />
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <FaMailBulk />
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <FaLockOpen />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forget Password?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <AiOutlineUser />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <AiFillMail />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <AiOutlineLock />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>

            <div className="signUpPassword">
              <AiOutlineLock />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                name="repassword"
                value={repassword}
                onChange={registerDataChange}
              />
            </div>

            {/* <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div> */}
            <input type="submit" value="register" className="signUpBtn" />
          </form>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default LoginSignup;
