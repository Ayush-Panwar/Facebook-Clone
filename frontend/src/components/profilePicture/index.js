import { useRef, useState } from "react";
import "./style.css";
import UpdateProfilePicture from "./UpdateProfilePicture";
import useClickOutside from "../../helpers/clickOutside";
import { useSelector } from "react-redux";
export default function ProfilePicture({ setShow, pRef, photos }) {
  const popup = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  useClickOutside(popup, () => setShow(false));
  const refInput = useRef(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const handleImage = (e) => {
    let file = e.target.files[0];
    setSelectedFile(e.target.value);

    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif" &&
      file.type !== "image/jpg"
    ) {
      setError(
        `${file.name} format is unsupported ! only Jpeg , Png , Webp , Gif, Jpg are allowed .`
      );

      return;
    } else if (file.size > 1024 * 1025 * 5) {
      setError(`${file.name} size is too Large , max 5mb allowed .`);

      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };
  return (
    <div className="blur">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif,image/jpg"
        value={selectedFile}
      />

      <div className="postBox pictureBox" ref={popup}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setShow(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => {
                refInput.current.click();
              }}
            >
              <i className="plus_icon"></i>
              Upload photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>
        {error && (
          <div className="postError comment_error">
            <div className="postError_error">{error}</div>
            <button className="blue_btn" onClick={() => setError("")}>
              Try again
            </button>
          </div>
        )}
        <div className="old_pictures_wrap scrollbar">
          <h4>Your Profile Pictures</h4>
          <div className="old_pictures">
            {photos
              .filter(
                (img) => img.folder === `${user.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
          <h4>other Pictures</h4>
          <div className="old_pictures">
            {photos
              .filter(
                (img) => img.folder !== `${user.username}/profile_pictures`
              )
              .map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
          </div>
        </div>
        {image && (
          <UpdateProfilePicture
            setImage={setImage}
            image={image}
            setError={setError}
            setSelectedFile={setSelectedFile}
            setShow={setShow}
            pRef={pRef}
          />
        )}
      </div>
    </div>
  );
}
