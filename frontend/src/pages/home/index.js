import { useSelector } from "react-redux";
import "./style.css";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import CreatePost from "../../components/createPost";
import Post from "../../components/post";
import { useEffect, useReducer, useRef, useState } from "react";
import { HashLoader } from "react-spinners";
import { postsReducer } from "../../functions/reducers";
import axios from "axios";

export default function Home({ setVisible, setallPosts }) {
  const { user } = useSelector((state) => ({ ...state }));
  const middle = useRef(null);
  const [height, setHeight] = useState();

  const [{ loading, error, posts }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    error: "",
  });
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading, height]);
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    try {
      dispatch({ type: "POSTS_REQUEST" });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPost`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({ type: "POSTS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "POSTS_ERROR", payload: error.response.data.message });
    }
  };
  return (
    <div
      className="home"
      style={{ height: `${posts.length ? `${height + 90}px` : "100vh"}` }}
    >
      <Header page="home" getAllPosts={getAllPosts} />
      <LeftHome user={user} />

      <div className="home_middle" ref={middle}>
        <Stories />

        <CreatePost user={user} setVisible={setVisible} />
        {loading ? (
          <div className="skeleton_loader">
            <HashLoader color="#1876f2" />
          </div>
        ) : (
          <div className="posts">
            {posts.map((post) => (
              <Post key={post._id} post={post} user={user} />
            ))}
          </div>
        )}
      </div>
      <RightHome user={user} />
    </div>
  );
}
