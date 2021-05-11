import { useCallback, useState } from "react";
import FrequencyBar from "../audio/FrequencyBar";
import Counter from "../counter/Counter";
import { Box, Button, Container, Typography } from "@material-ui/core";
import ScreenCapture from "../screensharing/ScreenCapture";
import { GoogleChromeIcon } from "../ui/GoogleChromeIcon";

function Debug(): JSX.Element {
  const [audioStarted, setAudioStarted] = useState<boolean>(false);
  const toggleAudioRecording = useCallback(async () => {
    setAudioStarted(!audioStarted);
  }, [audioStarted]);

  const [screenStarted, setScreenStarted] = useState<boolean>(false);
  const toggleScreenCapture = useCallback(async () => {
    setScreenStarted(!screenStarted);
  }, [screenStarted]);

  return (
    <Container>
      <Typography variant="h1">Debug</Typography>
      <Typography paragraph variant="h6">
        Use this page to debug if all functions are supported by your browser.
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box fontSize="h6.fontSize">We recommend using Google Chrome.</Box>
        <Box ml={2}>
          <GoogleChromeIcon />
        </Box>
        <Box />
      </Box>
      <Box component="section" mt={2}>
        <Typography variant="h2">Data store</Typography>
        <Typography variant="body1" paragraph>
          Try to add, remove and edit counters. Reloading the page should{" "}
          <strong>not</strong> reset the counters.
        </Typography>
        <Counter />
      </Box>
      <Box component="section" mt={2}>
        <Typography variant="h2">Audio</Typography>
        <Typography variant="body1" paragraph>
          Start the visualization and observe if it reacts to your voice. Make
          sure to grant the browser access to your microphone.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleAudioRecording}
        >
          {audioStarted
            ? "Stop audio visualization"
            : "Start audio visualization"}
        </Button>
        <Box mt={2}>
          {audioStarted && <FrequencyBar height={200} width={600} />}
        </Box>
      </Box>
      <Box component="section" mt={2}>
        <Typography variant="h2">Screen</Typography>
        <Typography variant="body1" paragraph>
          Start the screen recording and check that it shows the correct image.
          Make sure to grant the browser access to your screen.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleScreenCapture}
        >
          {screenStarted ? "Stop screen recording" : "Start screen recording"}
        </Button>
        <Box mt={2}>
          {screenStarted && <ScreenCapture width={1366} height={768} />}
        </Box>
      </Box>
    </Container>
  );
}

export default Debug;
