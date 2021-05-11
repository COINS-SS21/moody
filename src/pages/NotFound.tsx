import { Box, Container, Typography } from "@material-ui/core";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";

export default function NotFound(): JSX.Element {
  return (
    <Container>
      <Box
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Typography variant="h1">
          <NotListedLocationIcon fontSize="inherit" />
          <br />
          Page not found
        </Typography>
      </Box>
    </Container>
  );
}
