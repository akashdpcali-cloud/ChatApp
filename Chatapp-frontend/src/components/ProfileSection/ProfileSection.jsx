import { useState } from "react";
import { Camera, Pencil } from "lucide-react";
import { logoutUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";

import "./ProfileSection.css";

function ProfileSection() {

  const navigate = useNavigate();

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const user = useAuthStore(
    (state) => state.user
  );

  const handleLogout = async () => {

    try {

      const data = await logoutUser();


      if (data.success) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

      }


    } catch (error) {

      console.log(
        error.response?.data?.message ||
        "Logout failed"
      );

    }

  };

  const [blockedUsers] = useState([
    {
      id: 1,
      username: "Cielo D P",
      profilePicture: "/chatapp-default-avatar.jpeg"
    },
    {
      id: 2,
      username: "John Doe",
      profilePicture: "/chatapp-default-avatar.jpeg"
    },
    {
      id: 3,
      username: "Alice",
      profilePicture: "/chatapp-default-avatar.jpeg"
    }
  ]);

  return (
    <>

      <div className="profile-section">

        <div className="profile-left-section">

          <div className="profile-picture-section">

            <div className="picture-div">

              {user?.profilePicture && (
            <img
              src={`http://localhost:5000${user.profilePicture}`}
              alt="profile"
              className="profile-picture"
            />
          )}



              <Camera className="camera-icon" />

            </div>

            <div className="username-div">

              <div className="username-display">
                {user?.fullName}
              </div>

              <Pencil className="pencile-icon" />

            </div>

            <div className="email-display">
              {user?.email}
            </div>

          </div>

          <div className="change-div">

            <div className="changes-title">
              Account
            </div>

            <div className="change-password-div">
              Change Password
            </div>

            <div
              className="logout-div"
              onClick={() => setShowLogoutPopup(true)}
            >
              Logout
            </div>

            <div
              className="delete-account-div"
              onClick={() => setShowDeletePopup(true)}
            >
              Delete Account
            </div>

          </div>

        </div>

        <div className="profile-right-section">

          <div className="blocked-list-box">

            <div className="blocked-list-title">
              Blocked Users
            </div>

            <div className="all-blocked-users">

              {blockedUsers.map((user) => (

                <div
                  className="blocked-user-details"
                  key={user.id}
                >

                  <img
                    src="/chatapp-default-group.jpeg"
                    alt=""
                    className="blocked-profile-picture"
                  />

                  <div className="blocked-username-display">
                    {user.username}
                  </div>

                  <button className="unblock-button">
                    Unblock
                  </button>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>


      {showLogoutPopup && (

        <div className="popup-overlay">

          <div className="logout-popup">

            <div className="logout-popup-message">
              Are you sure you want to logout?
            </div>

            <div className="logout-options-div">

              <button
                className="logout-cancel-button"
                onClick={() => setShowLogoutPopup(false)}
              >
                Cancel
              </button>

              <button
                className="logout-conferm-button"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      )}


      {showDeletePopup && (

        <div className="popup-overlay">

          <div className="delete-account-popup">

            <div className="delete-account-popup-message">
              Are you sure you want to delete this account?
            </div>

            <div className="logout-options-div">

              <button
                className="delete-account-cancel-button"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>

              <button
                className="delete-account-conferm-button"
              >
                Delete Account
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );

}

export default ProfileSection;