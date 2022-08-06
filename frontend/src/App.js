import { Routes, Route } from "react-router-dom";
import Reset from "./pages/reset";
import Home from "./pages/home";
import Activate from "./pages/home/activate.js";
import Login from "./pages/login/login";
import Profile from "./pages/profile/index";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import CreatePostPopup from "./components/createPostPopup";
import { useSelector } from "react-redux";
import { useState } from "react";

import Friends from "./pages/friends";
import NotVerifiedRoutes from "./routes/NotVerifiedRoutes";

function App() {
  const [visible, setVisible] = useState(false);

  const { user, darkTheme } = useSelector((state) => ({ ...state }));

  return (
    <div className={`${darkTheme ? "dark" : ""}`}>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route element={<NotVerifiedRoutes />}>
            <Route
              path="/profile"
              element={<Profile setVisible={setVisible} />}
              exact
            />
            <Route
              path="/profile/:username"
              element={<Profile setVisible={setVisible} />}
              exact
            />
            <Route
              path="/friends"
              element={<Friends setVisible={setVisible} />}
              exact
            />
            <Route
              path="/friends/:type"
              element={<Friends setVisible={setVisible} />}
              exact
            />
            <Route path="/" element={<Home setVisible={setVisible} />} exact />
          </Route>
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
