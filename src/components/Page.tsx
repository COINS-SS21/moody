import { Box, Container, IconButton, Tooltip } from "@material-ui/core";
import Error from "../error/Error";
import { Auth } from "aws-amplify";
import { BugReport, Home, PowerSettingsNew } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import { Link as RouterLink } from "react-router-dom";

type PageProps = {
  children: React.ReactNode;
};

export default function Page({ children }: PageProps): JSX.Element {
  return (
    <Box>
      <Container>
        <Box mt={2} color={red[500]} textAlign="right">
          <Tooltip title="Home">
            <IconButton color="primary" component={RouterLink} to="/meetings">
              <Home />
            </IconButton>
          </Tooltip>
          <Tooltip title="Debugging">
            <IconButton color="secondary" component={RouterLink} to="/debug">
              <BugReport />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton
              color="inherit"
              onClick={async () => {
                await Auth.signOut();
              }}
            >
              <PowerSettingsNew />
            </IconButton>
          </Tooltip>
        </Box>
        <Error />
      </Container>
      {children}
    </Box>
  );
}
