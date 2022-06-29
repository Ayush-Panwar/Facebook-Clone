import Dots from "../../../svg/dots";
import NewRoom from "../../../svg/newRoom";
import Search from "../../../svg/search";
import Contact from "./Contact";
import "./style.css";
export default function RightHome({ user }) {
  const color = "#65676b";
  return (
    <div className="right_home">
      <div className="heading">Sponsered</div>
      <div className="splitter1"></div>
      <div className="contacts_wrap">
        <div className="contacts_header">
          <div className="contacts_header_left">Contacts</div>
          <div className="contacts_header_right">
            <div className="contact_circle hover1">
              <NewRoom color={color} />
            </div>
            <div className="contact_circle hover1">
              <Search color={color} />
            </div>
            <div className="contact_circle hover1">
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className="constacts_list">
          <Contact user={user} />
        </div>
      </div>
    </div>
  );
}
