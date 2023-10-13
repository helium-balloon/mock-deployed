import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/* 
  This is the top level component for the REPL. We can pass "props" as function arguments. 
  This handles the state of the history, mode, and data since both the REPLHistory and
  REPLInput components need access to it.
*/
export default function REPL() {
  // Shared state that holds all the commands submitted.
  const [history, setHistory] = useState<[string, string[][]][]>([]);
  const [mode, setMode] = useState("brief"); // if want to add extra modes, string rather than boolean
  const [data, setData] = useState<string[][]>([]);

  return (
    <div className="repl">
      {/* Creation of REPLHistory and REPLInput components */}
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
