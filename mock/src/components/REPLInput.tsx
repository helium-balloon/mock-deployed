import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { filepath_to_CSV } from "../mocked";
import { search_to_output } from "../mocked";

/**
 * This interface defines the props for REPLInput. REPLInput changes the state of the
 * history, mode, and data based on the user input
 */
interface REPLInputProps {
  history: [string, string[][]][];
  setHistory: Dispatch<SetStateAction<[string, string[][]][]>>;

  mode: string;
  setMode: Dispatch<SetStateAction<string>>;

  data: string[][];
  setData: Dispatch<SetStateAction<string[][]>>;
}

/**
 * This function handles what happens when an individual presses the submit button.
 * It processes the input command through a series of functions depending on the
 * command type (view, load_file, search, mode).
 *
 * @param props - states that REPLInput uses
 * @returns HTML instructing user to enter command and submit button
 */
export function REPLInput(props: REPLInputProps) {
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // use let so that can reassign value of filepath
  let [loadedFilepath, setLoadedFilepath] = useState<string>("");

  /**
   * This function is trigged when the submit button is clicked and calls helper
   * functions based on the command type. We used if statements instead of a
   * switch statement because to extract the first word we get what is before the
   * space, but in some instances (like mode and view) there is no space so it is
   * the whole command.
   *
   * @param commandString - command entered by user as a string
   */
  function handleSubmit(commandString: string) {
    if (commandString === "mode") {
      mode(commandString);
    } else if (
      commandString.substring(0, commandString.indexOf(" ")) === "load_file"
    ) {
      load(commandString);
    } else if (commandString === "view") {
      view(commandString);
    } else if (
      commandString.substring(0, commandString.indexOf(" ")) === "search"
    ) {
      search(commandString);
    } else {
      props.setHistory([
        ...props.history,
        [commandString, [["ERROR: invalid input in command box"]]],
      ]);
    }

    // after setting history, set command string back to empty
    setCommandString("");
  }

  /**
   * This function sets the mode to the opposite of what the mode
   * currently is.
   *
   * @param commandString - command entered by user as a string
   */
  function mode(commandString: string) {
    if (props.mode === "brief") {
      props.setMode("verbose");
      props.setHistory([
        ...props.history,
        [commandString, [["Mode has been switched to verbose"]]],
      ]);
    } else if (props.mode === "verbose") {
      props.setMode("brief");
      props.setHistory([
        ...props.history,
        [commandString, [["Mode has been switched to brief"]]],
      ]);
    }
  }

  /**
   * This functions loads the csv by extracting the filepath from the
   * command string and then retriving the csv data.
   *
   * @param commandString - command entered by user as a string
   */
  function load(commandString: string) {
    var filepath = commandString.substring(commandString.indexOf(" ") + 1);
    var csvData = filepath_to_CSV.get(filepath);

    // set filepath so know if data has been loaded based on if empty
    setLoadedFilepath(filepath);

    // checks if csv data exists before adding to history
    if (csvData !== undefined && csvData !== null) {
      props.setData(csvData);
      props.setHistory([...props.history, [commandString, [["Data loaded"]]]]);
    } else {
      props.setHistory([
        ...props.history,
        [commandString, [["ERROR: data could not be loaded"]]],
      ]);
    }
  }

  /**
   * This function first checks if data has been loaded. If data is loaded, then
   * it passes the loaded data to the history so the user can view it.
   *
   * @param commandString - command entered by user as a string
   */
  function view(commandString: string) {
    if (loadedFilepath === "") {
      props.setHistory([
        ...props.history,
        [commandString, [["ERROR: no data loaded so cannot view"]]],
      ]);
    } else {
      props.setHistory([...props.history, [commandString, props.data]]);
    }
  }

  /**
   * This function first checks if data has been loaded. If data is loaded, then
   * it searches based on the entered indentifier (if applicable) and target.
   *
   * @param commandString - command entered by user as a string
   */
  function search(commandString: string) {
    if (loadedFilepath === "") {
      props.setHistory([
        ...props.history,
        [commandString, [["ERROR: no data loaded so cannot search"]]],
      ]);
    } else {
      var output = search_to_output.get(
        loadedFilepath +
          " " +
          commandString.substring(commandString.indexOf(" ") + 1)
      );
      // checks if search returns anything, will be null if not in mocked data
      if (output != null) {
        props.setHistory([...props.history, [commandString, output]]);
      } else {
        // error will get deleted in REPL - for now want to understand if interaction valid
        props.setHistory([
          ...props.history,
          [commandString, [["ERROR: Search not included in mocked data"]]],
        ]);
      }
    }
  }

  return (
    <div className="repl-input">
      <fieldset>
        {/* Sets up interaction with user asking for command */}
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* Clicking button triggers processing of command */}
      <button onClick={() => handleSubmit(commandString)}>Submit</button>
    </div>
  );
}
