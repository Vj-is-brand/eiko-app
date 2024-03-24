import React, { Fragment, useEffect } from "react";
import './Profile.css';
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/user/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Fragment>
      <div title={`${user.name}'s Profile`} />
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          <img src="/images/profile.png" alt={user.name} />
          <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{String(user.createdAt).substr(0, 10)}</p>
          </div>

          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
