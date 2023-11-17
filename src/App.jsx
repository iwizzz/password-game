import Game from "./game";
import End from "./end";
import { useEffect, useState } from "react";

function App() {
  const [isNotEnd, setIsNotEnd] = useState(false);
  const [isRetry, setIsRetry] = useState(true);
  const [startTime, setStartTime] = useState(0);



  useEffect(() => {
    setStartTime(Date.now());

  }, [App])


  return (
    <div className="App">
      <Game setIsNotEnd={setIsNotEnd} isRetry={isRetry}/> 
      <End  overload={{isRetry, setIsRetry}} isNotEnd={{"status": isNotEnd, setIsNotEnd}} time={{startTime, setStartTime}}/>
    </div>
  );
}

export default App;
