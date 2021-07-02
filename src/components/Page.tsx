import { Box, Container, IconButton, Link, Tooltip } from "@material-ui/core";
import Error from "../error/Error";
import { Auth } from "aws-amplify";
import { BugReport, GitHub, Home, PowerSettingsNew } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

type PageProps = {
  children: React.ReactNode;
};

export default function Page({ children }: PageProps): JSX.Element {
  return (
    <Box>
      <Container>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Box>
            <Tooltip title="Home">
              <IconButton component={RouterLink} to="/meetings">
                <Home color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Debugging">
              <IconButton component={RouterLink} to="/debug">
                <BugReport color="secondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton
                onClick={async () => {
                  await Auth.signOut();
                }}
              >
                <PowerSettingsNew color="error" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Source code on GitHub">
              <IconButton
                component={Link}
                href="https://github.com/COINS-SS21/moody"
                target="_blank"
              >
                <GitHub color="secondary" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Error />
      </Container>
      {children}
    </Box>
  );
}
