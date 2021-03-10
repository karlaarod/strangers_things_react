import React from "react";
import { useHistory, Link } from "react-router-dom";

const Profile = ({ userData }) => {
  const history = useHistory();

  if (!userData._id) {
    return (
      <div className="sign-in-message">
        <h1>Need to Log in</h1>
        <Link to="/login">Log in here</Link>
      </div>
    );
  }
  return (
    <>
      <div className="dashboard-messages">
        {userData.username && <h1>Hello, {userData.username}!</h1>}
      </div>
      <aside>
        <button
          onClick={() => {
            history.push("/newPost");
          }}
        >
          Create New Listing
        </button>
        <button
          onClick={() => {
            history.push("/dashboard/messages");
          }}
        >
          Inbox
        </button>
        <button
          onClick={() => {
            history.push("/dashboard/myposts");
          }}
        >
          View my Post
        </button>
      </aside>
    </>
  );
};

export default Profile;
