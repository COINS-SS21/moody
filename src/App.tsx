import { useCallback, useState } from "react";
import FrequencyBar from "./audio/FrequencyBar";
import Counter from "./counter/Counter";
import Error from "./error/Error";
import { Box, Button, Container, Typography } from "@material-ui/core";
import ScreenCapture from "./screensharing/ScreenCapture";

function App(): JSX.Element {
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
      <Error />
      <Typography variant="h1">Moody</Typography>
      <Box component="section" mt={2}>
        <Typography variant="h2">
          Persistent Multi-Counter with IndexedDB
        </Typography>
        <Counter />
      </Box>
      <Box component="section" mt={2}>
        <Typography variant="h2">Audio Frequency Bar Visualization</Typography>
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
        <Typography variant="h2">Screen Capturing</Typography>
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

export default App;
