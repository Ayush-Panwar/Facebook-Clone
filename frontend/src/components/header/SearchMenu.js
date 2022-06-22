import { useState, useEffect, useRef } from "react";

import useClickOutside from "../../helpers/clickOutside";
import { Return, Search } from "../../svg";

export default function SearchMenu({ color, setShowSearchMenu }) {
  const [iconVisible, setIconVisible] = useState(false);
  const menu = useRef(null);
  const input = useRef(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    input.current.focus();
  }, []);
  return (
    <div className="header_left search_area scrollbar transition " ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div className="circle hover1">
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Seach Facebook"
            onFocus={() => setIconVisible(false)}
            onBlur={() => setIconVisible(true)}
            ref={input}
          />
        </div>
      </div>

      <div className="search_history_header">
        <span>Recent searches</span>
        <a href="">Edit</a>
      </div>
      <div className="search_results scollbar"></div>
    </div>
  );
}
