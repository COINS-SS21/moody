import { useCallback, useState } from "react";
import FrequencyBar from "./audio/FrequencyBar";
import Counter from "./counter/Counter";
import Error from "./Error";

function App(): JSX.Element {
  const [started, setStarted] = useState<boolean>(false);

  const toggleRecording = useCallback(async () => {
    setStarted(!started);
  }, [started]);

  return (
    <>
      <Error />
      <h1>Moody</h1>
      <div>
        <h2>Persistent Multi-Counter with IndexedDB</h2>
        <Counter />
      </div>
      <div>
        <h2>Audio Frequency Bar Visualization</h2>
        <button onClick={toggleRecording}>
          {started ? "Stop audio visualization" : "Start audio visualization"}
        </button>
      </div>
      {started && <FrequencyBar />}
    </>
  );
}

export default App;
