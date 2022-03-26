import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Profile from "./pages/Profile";
import Search from "./pages/search";
import Dashboard from "./pages/dashboard";
import Messenger from "./pages/Messenger";
import BookAppointments from "./pages/Book Appointments/book-appointments";
import PastAppointments from "./pages/past-appointments";
import UpcomingAppointments from "./pages/upcoming-appointments";
import AccountGeneralSettings from "./pages/account-general-settings";
import CommunityGarage from "./pages/community-garage";
import Admin from "./pages/Admin/Admin";
import VideoCall from "./pages/video-call.js";
import NotFound from "./components/404/NotFound";
import PendingApplication from "./components/PendingApplication/PendingApplication";
import PrivateRoute from "./components/Routing/PrivateRoute";
import { setAuthToken } from "./utils/setAuthToken";
import NoteState from "./context/notes/NoteState";
import ScrollToTop from "./components/ScrollTop/ScrollToTop";
import UploadVideoPage from "./pages/UploadVideoPage";
import DetailVideoPage from "./pages/DetailVideoPage";
import DoctorAppointments from "./pages/doctorAppointments/DoctorAppointments";

import RatingAndReview from "./components/ratingAndReviewModal/RatingAndReview";

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <NoteState>
        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/search" component={Search} />
            <PrivateRoute path="/profile/:doctorId" component={Profile} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/dashboard" exact component={Dashboard} />
            <PrivateRoute
              path="/book-appointments/:doctorId"
              component={BookAppointments}
            />
            <PrivateRoute
              path="/past-appointments"
              component={PastAppointments}
            />
            <PrivateRoute
              path="/upcoming-appointments"
              component={UpcomingAppointments}
            />
            <PrivateRoute
              path="/community-garage"
              component={CommunityGarage}
            />
            <Route path="/doctor/appointment" component={DoctorAppointments} />
            <Route path="/video/upload" component={UploadVideoPage} />
            <Route path="/video/:videoId" component={DetailVideoPage} />
            <PrivateRoute path="/messenger" component={Messenger} />
            <PrivateRoute path="/admin" component={Admin} />
            <PrivateRoute
              path="/pending-application"
              component={PendingApplication}
            />
            <PrivateRoute
              path="/account-general-settings"
              component={AccountGeneralSettings}
            />
            <PrivateRoute
              path="/video-call/rating-and-review/:appointmentId"
              component={RatingAndReview}
            />
            <PrivateRoute
              path="/video-call/:appointmentId"
              component={VideoCall}
            />

            <Route component={NotFound} />
          </Switch>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
