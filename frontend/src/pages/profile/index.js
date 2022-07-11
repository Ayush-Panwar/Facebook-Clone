import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));
  var userName = username === undefined ? user.username : username;
  return <div>profile</div>;
}
