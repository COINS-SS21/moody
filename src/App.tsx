import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Debug from "./pages/Debug";
import { Welcome } from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import Meeting from "./pages/meeting/Meeting";
import { useAppSelector } from "./reduxHooks";
import "./App.css";
import Meetings from "./pages/meetings/Meetings";
import Login from "./pages/Login";
import { useEffect } from "react";
import { syncUserWithRedux } from "./auth/utils";
import Feedback from "./pages/feedback/Feedback";
import Page from "./components/Page";
import VoiceEmotionDebugging from "./pages/VoiceEmotionDebugging";

function PrivateApp(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/meetings" />
        <Redirect exact from="/login" to="/meetings" />
        <Route exact path="/meetings">
          <Meetings />
        </Route>
        <Route exact path="/meetings/:id">
          <Meeting />
        </Route>
        <Route exact path="/voice-emotion-debugging">
          <VoiceEmotionDebugging />
        </Route>
        <Route exact path="/debug">
          <Debug />
        </Route>
        <Route exact path="/feedback/:publicMeetingId">
          <Page>
            <Feedback />
          </Page>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

function PublicApp(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/feedback/:publicMeetingId">
          <Feedback />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default function App(): JSX.Element | null {
  const signedIn: boolean = useAppSelector(
    (state) => state.auth.signedIn && !!state.auth.user
  );
  const loading: boolean = useAppSelector((state) => state.auth.loading);

  useEffect(() => {
    syncUserWithRedux();
  }, []);

  return !loading ? signedIn ? <PrivateApp /> : <PublicApp /> : null;
}
