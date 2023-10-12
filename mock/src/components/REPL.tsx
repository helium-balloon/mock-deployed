import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/* 
  Top level component for the REPL. Can pass "props" as function arguments. To handle state 
  at a higher level, move up the hooks and pass the state/setter as a prop.
*/

export default function REPL() {
  // Shared state that holds all the commands submitted.
  const [history, setHistory] = useState<[string, string[][]][]>([]);
  const [mode, setMode] = useState("brief"); // if want to add extra modes string rather than boolean
  const [data, setData] = useState<string[][]>([]);

  return (
    <div className="repl">
      <REPLHistory history={history} mode={mode} data={data} />
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        mode={mode}
        setMode={setMode}
        data={data}
        setData={setData}
      />
    </div>
  );
}
