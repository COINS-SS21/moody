import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Debug from "./pages/Debug";
import { Container } from "@material-ui/core";
import { Home } from "./pages/Home";
import Error from "./error/Error";
import NotFound from "./pages/NotFound";

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
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
