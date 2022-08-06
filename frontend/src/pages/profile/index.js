import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducers";
import Header from "../../components/header";
import "./style.css";
import Cover from "./Cover";
import ProfielPictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PplYouMayKnow from "./PplYouMayKnow";
import CreatePost from "../../components/createPost";
import GridPosts from "./GridPosts";
import Post from "../../components/post";
import Photos from "./Photos";
import Friends from "./Friends";
import Intro from "../../components/intro";
import { useMediaQuery } from "react-responsive";
import EditDetails from "../../components/intro/EditDetails";
import { useStateIfMounted } from "use-state-if-mounted";
import CreatePostPopup from "../../components/createPostPopup";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { HashLoader } from "react-spinners";

export default function Profile({ getAllPosts }) {
  const [visible, setVisible] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [photos, setPhotos] = useState({});
  var userName = username === undefined ? user.username : username;

  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  const [details, setDetails] = useStateIfMounted();
  const [visibleEditDetails, setVisibleEditDetails] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    getProfile(controller);
    return () => {
      controller.abort();
    };
  }, [userName]);
  useEffect(() => {
    setOthername(profile?.details?.otherName);
    setCover(profile?.cover);
  }, [profile]);

  var visitor = userName === user.username ? false : true;
  // var visitor = false;
  const [othername, setOthername] = useStateIfMounted();
  const path = `${userName}/*`;
  const maxImages = 30;
  const sort = "desc";
  const initial = {
    bio: details?.bio ? details.bio : "",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    highSchool: details?.highSchool ? details.highSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    hometown: details?.hometown ? details.hometown : "",
    relationship: details?.relationship ? details.relationship : "",
    instagram: details?.instagram ? details.instagram : "",
  };
  const [infos, setInfos] = useStateIfMounted(initial);
  const [showBio, setShowBio] = useState(false);

  const [max, setMax] = useStateIfMounted(
    infos?.bio ? 100 - infos?.bio.length : 100
  );
  useEffect(() => {
    setMax(infos?.bio ? 100 - infos?.bio.length : 100);
  }, [infos]);
  const updateDetails = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
        {
          infos,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setShowBio(false);
      setDetails(data);
      setOthername(data.otherName);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(100 - e.target.value.length);
  };

  const getProfile = async (controller) => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          signal: controller.signal,
        }
      );
      if (data.ok === false) {
        navigate("/profile");
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, maxImages },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  const profileTop = useRef(null);
  const leftSide = useRef(null);
  const [height, setHeight] = useStateIfMounted();
  const [leftHeight, setLeftHeight] = useStateIfMounted();
  const [scrollHeight, setScrollHeight] = useStateIfMounted();
  const [cover, setCover] = useState();
  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300);
    setLeftHeight(leftSide.current.clientHeight);
    window.addEventListener("scroll", getScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", getScroll, { passive: true });
    };
  }, [loading, scrollHeight]);
  const check = useMediaQuery({
    query: "(min-width:901px)",
  });
  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };

  return (
    <div className="profile">
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={profile?.posts}
          dispatch={dispatch}
          profile
        />
      )}
      <Header page="profile" getAllPosts={getAllPosts} />
      <div className="profile_top" ref={profileTop}>
        <div className="profile_container">
          {loading ? (
            <>
              <div className="profile_cover">
                <Skeleton height="347px" style={{ borderRadius: "8px" }} />
              </div>
              <div
                className="profile_img_wrap "
                style={{ transform: "translateY(-8px)", marginBottom: "-3rem" }}
              >
                <div className="profile_w_left">
                  <Skeleton
                    circle
                    height="180px"
                    width="180px"
                    style={{ transform: "translateY(-3.6rem)" }}
                  />
                  <div className="profile_w_col">
                    <div className="profile_name">
                      <Skeleton height="35px" width="200px" />
                      <Skeleton
                        height="30px"
                        width="100px"
                        style={{ transform: "translateY(px)" }}
                      />
                    </div>
                    <div className="profile_friend_count">
                      <Skeleton
                        height="20px"
                        width="90px"
                        style={{ marginTop: "5px" }}
                      />
                    </div>
                    <div className="profile_friend_imgs">
                      {Array.from(new Array(6), (val, i) => i + 1).map(
                        (id, i) => (
                          <Skeleton
                            circle
                            height="32px"
                            width="32px"
                            key={i}
                            style={{ transform: `translateX(${-i * 7}px)` }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className={`friendship ${!visitor && "fix"}`}>
                  <Skeleton height="36px" width={120} />
                  <div className="flex">
                    <Skeleton height="36px" width={120} />
                    {visitor && <Skeleton height="36px" width={120} />}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Cover
                cover={cover}
                visitor={visitor}
                photos={photos.resources}
                setCover={setCover}
              />
              <ProfielPictureInfos
                profile={profile}
                visitor={visitor}
                photos={photos.resources}
                othername={othername}
              />
            </>
          )}
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PplYouMayKnow />
            <div
              className={`profile_grid ${
                check && scrollHeight >= height && leftHeight > 1000
                  ? "scrollFixed showLess"
                  : check &&
                    scrollHeight >= height &&
                    leftHeight < 1000 &&
                    "scrollFixed showMore"
              }`}
            >
              <div className="profile_left" ref={leftSide}>
                {loading ? (
                  <>
                    <div className="profile_card">
                      <div className="profile_card_header">Intro</div>
                      <div className="skeleton_loader">
                        <HashLoader color="#1876f2" />
                      </div>
                    </div>
                    <div className="profile_card">
                      <div className="profile_card_header">
                        Photos
                        <div className="profile_header_link">
                          See all photos
                        </div>
                      </div>
                      <div className="skeleton_loader">
                        <HashLoader color="#1876f2" />
                      </div>
                    </div>
                    <div className="profile_card">
                      <div className="profile_card_header">
                        Friends
                        <div className="profile_header_link">
                          See all friends
                        </div>
                      </div>
                      <div className="skeleton_loader">
                        <HashLoader color="#1876f2" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Intro
                      detailss={profile.details}
                      visitor={visitor}
                      setOthername={setOthername}
                      setVisibleEditDetails={setVisibleEditDetails}
                      details={details}
                      setDetails={setDetails}
                      visible={visibleEditDetails}
                      infos={infos}
                      setInfos={setInfos}
                      updateDetails={updateDetails}
                      handleChange={handleChange}
                      showBio={showBio}
                      setShowBio={setShowBio}
                      max={max}
                      setMax={setMax}
                    />
                    <Photos
                      username={userName}
                      token={user.token}
                      photos={photos}
                    />
                    <Friends friends={profile.friends} />
                  </>
                )}
                <div className="relative_fb_copyright">
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertising </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>{" "}
                  </Link>
                  <span>. </span>
                  <Link to="/"></Link>Cookies <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span> <br />
                  Meta © 2022
                </div>
              </div>
              <div className="profile_right">
                {!visitor && (
                  <CreatePost user={user} profile setVisible={setVisible} />
                )}
                {visibleEditDetails && !visitor && (
                  <EditDetails
                    details={details}
                    handleChange={handleChange}
                    updateDetails={updateDetails}
                    infos={infos}
                    setVisibleEditDetails={setVisibleEditDetails}
                  />
                )}
                <GridPosts />
                {loading ? (
                  <div className="skeleton_loader">
                    <HashLoader color="#1876f2" />
                  </div>
                ) : (
                  <div className="posts">
                    {profile.posts && profile.posts.length ? (
                      profile.posts.map((post) => (
                        <Post post={post} user={user} key={post._id} profile />
                      ))
                    ) : (
                      <div className="no_posts">No posts available</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
