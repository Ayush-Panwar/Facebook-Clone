import axios from "axios";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "../../helpers/clickOutside";
import { ArrowDown, Logo } from "../../svg";
import Menu from "./Menu";
import "./style.css";
export default function Verification() {
  const { user } = useSelector((state) => ({ ...state }));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const menu = useRef(null);
  useClickOutside(menu, () => {
    setShowUserMenu(false);
  });
  const sendVerificationLink = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="verification">
      <div className="verification_header">
        <div className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </div>
        {user && (
          <div className="right_verification">
            <img src={user.picture} alt="" />

            <span>{user.first_name}</span>
            <div
              className={`circle_icon  ${showUserMenu && "active_header"}`}
              ref={menu}
            >
              <div onClick={() => setShowUserMenu((prev) => !prev)}>
                <div style={{ transform: "translateY(2px)" }}>
                  <ArrowDown />
                </div>
              </div>

              {showUserMenu && <Menu user={user} />}
            </div>
          </div>
        )}
      </div>
      <div className="verification_wrap">
        <div className="verification_middle">
          <div className="verification_middle_header">Verify your account</div>
          <div className="verification_middle_text">
            Your account is not verified , Verify your account before it get
            deleted after a month from creating.
          </div>
          <a
            onClick={() => {
              sendVerificationLink();
            }}
          >
            Click here to resend notification link
          </a>
          {success && <div className="success_text">{success}</div>}
          {error && <div className="error_text">{error}</div>}
        </div>
      </div>
    </div>
  );
}
