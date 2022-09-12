import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  addToSearchHistory,
  search,
  getSearchHistory,
  removeFromSearch,
} from "../../functions/user";

import useClickOutside from "../../helpers/clickOutside";
import { Return, Search } from "../../svg";

export default function SearchMenu({ color, setShowSearchMenu, token }) {
  const [iconVisible, setIconVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const menu = useRef(null);
  const input = useRef(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });
  useEffect(() => {
    getHistory();
  }, []);
  const getHistory = async () => {
    const res = await getSearchHistory(token);
    setSearchHistory(res);
  };

  useEffect(() => {
    input.current.focus();
  }, []);
  const searchHandler = async () => {
    if (searchTerm === "") {
      setResults("");
    } else {
      const res = await search(searchTerm, token);
      setResults(res);
    }
  };
  const addToSearchHistoryHandler = async (searchUser) => {
    const res = await addToSearchHistory(searchUser, token);
    getHistory();
  };
  const handleRemove = async (searchUser) => {
    removeFromSearch(searchUser, token);
    getHistory();
  };
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
            value={searchTerm}
            onKeyUp={searchHandler}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>

      {results == "" && (
        <div className="search_history_header">
          <span>Recent searches</span>
          <a href="">Edit</a>
        </div>
      )}

      <div className="search_history scrollbar">
        {console.log(searchHistory)}
        {searchHistory &&
          results == "" &&
          searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user) => {
              console.log(user);
              return (
                <div className="search_user_item hover1" key={user.user._id}>
                  <Link
                    className="flex"
                    to={`/profile/${user.user.username}`}
                    onClick={() => addToSearchHistoryHandler(user.user._id)}
                  >
                    <img src={user.user.picture} alt="" />
                    <span>
                      {user.user.first_name} {user.user.last_name}
                    </span>
                  </Link>
                  <i
                    className="exit_icon"
                    onClick={() => handleRemove(user.user._id)}
                  ></i>
                </div>
              );
            })}
      </div>
      <div className="search_results scrollbar">
        {results &&
          results.map((user, i) => (
            <Link
              to={`/profile/${user.username}`}
              className="search_user_item hover1"
              key={i}
              onClick={() => addToSearchHistoryHandler(user._id)}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
