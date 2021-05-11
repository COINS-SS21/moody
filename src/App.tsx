import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Debug from "./pages/Debug";
import { Container, Typography } from "@material-ui/core";
import { Home } from "./pages/Home";
import Error from "./error/Error";

export function App(): JSX.Element {
  return (
    <Router>
      <Container>
        <Error />
      </Container>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/debug">
          <Debug />
        </Route>
        <Route>
          <Typography variant="h1">404 not found</Typography>
        </Route>
      </Switch>
    </Router>
  );
}
