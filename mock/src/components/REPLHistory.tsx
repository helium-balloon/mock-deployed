import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: [string, string][]; // tuple with command and output
  mode: string;
  data: string[][];
}

function handleDisplay(command: [string, string]) {}

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.history.map((command, index) => {
        if (props.mode == "verbose") {
          return (
            <p>
              Command: {command[0]} <br></br> Output: {command[1]}
            </p>
          );
        }
        if (props.mode == "brief") {
          return <p>{command[1]}</p>;
        }
      })}
    </div>
  );
}
