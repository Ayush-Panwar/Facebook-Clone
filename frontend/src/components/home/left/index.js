import LeftLink from "./LeftLink";
import "./style.css";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import ArrowDown1 from "../../../svg/arrowDow1";
import { useState } from "react";
import Shortcut from "./Shortcut";
import { useMediaQuery } from "react-responsive";

export default function LeftHome({ user }) {
  const [visible, setVisible] = useState(false);

  const view1 = useMediaQuery({
    query: "(max-height:760px)",
  });
  const fb_copyright = useMediaQuery({
    query: "(max-width:1056px)",
  });
  return (
    <div className="left_home scrollbar">
      <Link to="/profile" className="left_link hover2">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
      {!visible && (
        <div className="left_link hover2" onClick={() => setVisible(true)}>
          <div className="small_circle">
            <ArrowDown1 />
          </div>
          <span>See more</span>
        </div>
      )}
      {visible && (
        <div className="more_left">
          {left.slice(8, left.length).map((link, i) => (
            <LeftLink
              key={i}
              img={link.img}
              text={link.text}
              notification={link.notification}
            />
          ))}
          <div className="left_link hover2 " onClick={() => setVisible(false)}>
            <div className="small_circle rotate360">
              <ArrowDown1 />
            </div>
            <span>Show less</span>
          </div>
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="heading">Your Shortcuts</div>
        <div className="edit_shortcut">Edit</div>
      </div>
      <div className="shortcut_list ">
        <Shortcut link="" img="../../images/8ballpool.png" name="8 Ball Pool" />
        <Shortcut
          link=""
          img="../../images/angryBirds.png"
          name="Angry Birds"
        />
      </div>
      <div
        className={`fb_copyright ${
          (visible || view1) && "relative_fb_copyright"
        }`}
      >
        <Link to="/"> Privacy </Link>
        <span>.</span>
        <Link to="/"> Terms </Link>
        <span>.</span>
        <Link to="/"> Advertising </Link>
        <span>. </span>
        <Link to="/">
          Ad Choices <i className="ad_choices_icon"></i>
        </Link>
        <span> . </span>

        <Link to="/"> Cookies </Link>
        <span>.</span>
        <Link to="/"> More </Link>
        <span>.</span>
        {fb_copyright && <br />}

        <Link to="/"> Meta © 2022</Link>
        <span>.</span>
      </div>
    </div>
  );
}
