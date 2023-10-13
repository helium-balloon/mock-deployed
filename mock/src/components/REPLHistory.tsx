import "../styles/main.css";

/**
 * This interface defines the props for REPLHistory. Since REPLHistory should not be
 * changing the value of the history, mode, or data, we made the deliberate choice
 * for the props to not include setters (defensive programming).
 */
interface REPLHistoryProps {
  history: [string, string[][]][]; // tuple with command and output
  mode: string;
  data: string[][]; // allows conversion to html table
}

/**
 * This function handles the display of the output by creating an HTML table. The
 * table makes a new row for every array in the 2D array. If the output is just
 * an error message or statement, only one cell is created. We felt this allow
 * us to have a consistent output format, rather than having to change the format
 * depending on the command, which would require more shared states.
 *
 * @param output - 2D array for output stored in history
 * @returns HTML table containing the output
 */
function handleDisplay(output: string[][]) {
  return (
    <table aria-label="table">
      <tbody>{output.map((rowContent, rowID) => createRow(rowContent))}</tbody>
    </table>
  );
}

/**
 * This function is a helper method for handleDisplay, and thus allowed us to
 * separate the creation of every row from the content of the row. Each cell is
 * a string within the array representing the row.
 *
 * @param rowContent - array representing a row
 * @returns HTML table row
 */
function createRow(rowContent: string[]) {
  return (
    <tr>
      {rowContent.map((val, rowID) => (
        <td key={rowID}>{val}</td>
      ))}
    </tr>
  );
}

/**
 * This function uses the tuple stored in history of the command and output
 * to display the appropriate information with HTML. If the mode is verbose,
 * then the labels "Command" and "Output" are included along with the command
 * from the user and output. On the other hand, for brief mode only the output
 * is included without a label.
 *
 * @param props - states that REPLHistory uses
 * @returns display for the history, including the command and output
 */
export function REPLHistory(props: REPLHistoryProps) {
  return (
<<<<<<< HEAD
    <div className="repl-history" aria-label="output">
      {/* To go through all the pushed commands use the .map() function! */}
=======
    <div className="repl-history">
      {/* To go through all the pushed commands, we use the .map() function */}
>>>>>>> e092d55fea145814d21f12ff1f395ea6cfb6f6f1
      {props.history.map((command, index) => {
        {
          /* Checks the mode so can change format of history */
        }
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
