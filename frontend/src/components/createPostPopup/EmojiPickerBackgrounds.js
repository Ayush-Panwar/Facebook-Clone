import Picker from "emoji-picker-react";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";

export default function EmojiPickerBackgrounds({
  text,
  setText,
  user,
  type2,
  background,
  setBackground,
}) {
  const [picker, setPicker] = useState(false);
  const [showBgs, setShowBgs] = useState(false);

  const [cursorPosition, setCursorPosition] = useState();

  const textRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  const postBackgrounds = [
    "https://res.cloudinary.com/facebook-clone-web/image/upload/v1660133883/postBackgrounds/1_pg8sge.jpg",
    "https://res.cloudinary.com/facebook-clone-web/image/upload/v1660133883/postBackgrounds/2_yzpwtc.jpg",
    "https://res.cloudinary.com/facebook-clone-web/image/upload/v1660133882/postBackgrounds/3_pf5rsh.jpg",
    "https://res.cloudinary.com/facebook-clone-web/image/upload/v1660133883/postBackgrounds/4_q4tfiz.jpg",
    "https://res.cloudinary.com/facebook-clone-web/image/upload/v1660133883/postBackgrounds/5_imcqza.jpg",
    "https://res.cloudinary.com/facebook-clone-web/image/upload/v1660133883/postBackgrounds/6_e0v2xj.jpg",
    "https://res.cloudinary.com/facebook-clone-web/image/upload/v1660133883/postBackgrounds/7_cikapv.jpg",
    "https://res.cloudinary.com/facebook-clone-web/image/upload/v1660133883/postBackgrounds/8_j9q3d4.jpg",
    "https://res.cloudinary.com/facebook-clone-web/image/upload/v1660133883/postBackgrounds/9_ogecxo.jpg",
    "https://res.cloudinary.com/facebook-clone-web/image/upload/v1660133883/postBackgrounds/10_cl3qtg.jpg",
  ];
  const backgroundHandler = (i) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add("bgHandler");
  };

  const removeBackground = () => {
    bgRef.current.style.backgroundImage = "";
    setBackground("");
    bgRef.current.classList.remove("bgHandler");
  };
  const sm = useMediaQuery({ query: "(max-width:550px)" });
  return (
    <div className={type2 && "images_input"}>
      <div className={!type2 ? "flex_center" : ""} ref={bgRef}>
        <textarea
          ref={textRef}
          maxLength="250"
          value={text}
          placeholder={`What's on your mind, ${user?.first_name} ?`}
          className={`post_input ${type2 ? "input2" : ""} ${
            sm && !background && "l0"
          }`}
          onChange={(e) => setText(e.target.value)}
          style={{
            paddingTop: `${
              background
                ? Math.abs(textRef.current?.value.length * 0.1 - 32)
                : "0"
            }%`,
          }}
        ></textarea>
      </div>
      <div className={!type2 ? "post_emojis_wrap" : ""}>
        {picker && (
          <div
            className={`comment_emojis_picker ${
              type2 ? "movepicker2" : "rlmove"
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && (
          <img
            src="../../../icons/colorful.png"
            alt=""
            onClick={() => setShowBgs((prev) => !prev)}
          />
        )}
        {!type2 && showBgs && (
          <div className="post_backgrounds">
            <div className="no_bg" onClick={() => removeBackground()}></div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg}
                key={i}
                alt=""
                onClick={() => {
                  backgroundHandler(i);
                }}
              />
            ))}
          </div>
        )}

        <i
          className={`emoji_icon_large ${type2 && "moveleft"}`}
          onClick={() => {
            setPicker((perv) => !perv);
          }}
        ></i>
      </div>
    </div>
  );
}
