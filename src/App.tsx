import { useCallback, useState } from "react";
import FrequencyBar from "./audio/FrequencyBar";

function App(): JSX.Element {
  const [started, setStarted] = useState<boolean>(false);

  const toggleRecording = useCallback(async () => {
    setStarted(!started);
  }, [started]);

  return (
    <>
      <h1>Moody</h1>
      <div>
        <button onClick={toggleRecording}>
          {started ? "Stop audio visualization" : "Start audio visualization"}
        </button>
      </div>
      {started && <FrequencyBar />}
    </>
  );
}

export default App;
