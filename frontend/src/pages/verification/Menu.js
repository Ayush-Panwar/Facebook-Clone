import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Download } from "../../svg";

export default function Menu({ user }) {
  const { darkTheme } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(darkTheme);
  if (darkMode) {
    Cookies.set("darkTheme", true);
    dispatch({ type: "DARK" });
  } else {
    Cookies.set("darkTheme", false);
    dispatch({
      type: "LIGHT",
    });
  }
  const logout = () => {
    Cookies.set("user", "");

    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div className="verification_menu">
      <Link to="" className="menu_item hover3">
        <div className="small_circle">
          <Download />
        </div>
        <div className="menu">
          <span>Download your information</span>
        </div>
      </Link>
      <div className="line"></div>
      <div className="verification_dark">
        <input
          type="checkbox"
          id="darkToggle"
          className="toggle"
          onClick={() => setDarkMode((prev) => !prev)}
        />
        <label className="hover3 menu_item flex_space" htmlFor="darkToggle">
          <div className="dark_toggle_left">
            <div className="small_circle">
              <i className="dark_filled_icon"></i>
            </div>
            <span>Dark mode</span>
          </div>
        </label>
      </div>
      <div
        className="menu_item hover3"
        onClick={() => {
          logout();
        }}
      >
        <div className="small_circle">
          <i className="logout_filled_icon"></i>
        </div>
        <div className="menu">
          <span>Log Out</span>
        </div>
      </div>
      <div className="verification_fb_copyright">
        <Link to="/">Privacy </Link>
        <span>. </span>
        <Link to="/">Terms </Link>
        <span>. </span>
        <Link to="/">Advertising </Link>
        <span>. </span>
        <Link to="/">
          Ad Choices <i className="ad_choices_icon"></i>
        </Link>
        <span>. </span>
        <Link to="/">Cookies</Link> <span>. </span>
        <Link to="/">More </Link>
        <span>. </span>
        Meta © 2022
      </div>
    </div>
  );
}
