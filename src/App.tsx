import { useCallback, useState } from "react";
import FrequencyBar from "./audio/FrequencyBar";
import Counter from "./counter/Counter";
import Error from "./error/Error";
import { Button, Container, Typography } from "@material-ui/core";

function App(): JSX.Element {
  const [started, setStarted] = useState<boolean>(false);

  const toggleRecording = useCallback(async () => {
    setStarted(!started);
  }, [started]);

  return (
    <Container>
      <Error />
      <Typography variant="h1">Moody</Typography>
      <div>
        <Typography variant="h2">
          Persistent Multi-Counter with IndexedDB
        </Typography>
        <Counter />
      </div>
      <div>
        <Typography variant="h2">Audio Frequency Bar Visualization</Typography>
        <Button variant="contained" color="primary" onClick={toggleRecording}>
          {started ? "Stop audio visualization" : "Start audio visualization"}
        </Button>
      </div>
      {started && <FrequencyBar height={200} width={600} />}
    </Container>
  );
}

export default App;
