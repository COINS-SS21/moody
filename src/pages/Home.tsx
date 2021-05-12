import { Box, Container, Typography } from "@material-ui/core";
import CTAButton from "../ui/CTAButton";
import { Link as RouterLink } from "react-router-dom";

export function Home(): JSX.Element {
  return (
    <Container>
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box width={1}>
          <Typography variant="h1">Track the moods</Typography>
        </Box>
        <Box mt={2} width={1}>
          <Typography variant="h4" component="h3">
            A web app that enhances the experience by analyzing moods.
          </Typography>
        </Box>
        <Box mt={2} width={1}>
          <Typography variant="body1">
            Moody captures facial emotions of the participants in a meeting to
            perform real-time emotion detection and give a detailed analysis
            that in turn helps the presenter understand the scope for
            improvements.
          </Typography>
        </Box>
        <Box mt={4} width={1}>
          <CTAButton component={RouterLink} to="/meeting">
            Start
          </CTAButton>
        </Box>
      </Box>
    </Container>
  );
}
