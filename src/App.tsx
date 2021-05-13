import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Debug from "./pages/Debug";
import { Container } from "@material-ui/core";
import { Home } from "./pages/Home";
import Error from "./error/Error";
import NotFound from "./pages/NotFound";
import Meeting from "./pages/Meeting";
import { AmplifyAuthenticator, AmplifySignUp } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { useEffect } from "react";
import { signIn } from "./auth/authSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import "./App.css";
import Meetings from "./pages/Meetings";

function PrivateApp(): JSX.Element {
  return (
    <Router>
      <Container>
        <Error />
      </Container>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/meetings">
          <Meetings />
        </Route>
        <Route exact path="/meeting">
          <Meeting />
        </Route>
        <Route exact path="/debug">
          <Debug />
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
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            label: "Name *",
            placeholder: "Enter your name",
            inputProps: {
              type: "text",
            },
            type: "name",
            required: true,
          },
          { type: "email" },
          { type: "password" },
        ]}
      />
    </AmplifyAuthenticator>
  );
}

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const signedIn: boolean = useAppSelector(
    (state) => state.auth.signedIn && !!state.auth.user
  );

  useEffect(() => {
    onAuthUIStateChange((nextAuthState: AuthState, authData: any) => {
      if (nextAuthState === AuthState.SignedIn) {
        dispatch(
          signIn({
            name: authData?.attributes.name,
            email: authData?.attributes.email,
          })
        );
      }
    });
  }, [dispatch]);

  return signedIn ? <PrivateApp /> : <PublicApp />;
}
