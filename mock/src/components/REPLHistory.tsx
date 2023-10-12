import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: [string, string[][]][]; // tuple with command and output
  mode: string;
  data: string[][];
}

function handleDisplay(output: string[][]) {
  return (
    <table>
      <tbody>{output.map((rowContent, rowID) => createRow(rowContent))}</tbody>
    </table>
  );
}

function createRow(rowContent: string[]) {
  return (
    <tr>
      {rowContent.map((val, rowID) => (
        <td key={rowID}>{val}</td>
      ))}
    </tr>
  );
}

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {props.history.map((command, index) => {
        if (props.mode == "verbose") {
          return (
            <p>
              Command: {command[0]} <br></br> Output:{" "}
              {handleDisplay(command[1])}
            </p>
          );
        }
        if (props.mode == "brief") {
          return <p>{handleDisplay(command[1])}</p>;
        }
      })}
    </div>
  );
}
