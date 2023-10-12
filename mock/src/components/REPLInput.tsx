import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { filepath_to_CSV } from "../mocked";
import { search_to_output } from "../mocked";

interface REPLInputProps {
  history: [string, string[][]][];
  setHistory: Dispatch<SetStateAction<[string, string[][]][]>>;

  mode: string;
  setMode: Dispatch<SetStateAction<string>>;

  data: string[][];
  setData: Dispatch<SetStateAction<string[][]>>;
}

export function REPLInput(props: REPLInputProps) {
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");

  let [isLoaded, setIsLoaded] = useState<boolean>(false); // use let so that can reassign

  // This function is triggered when the button is clicked.
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

    setCommandString("");
  }

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

  function load(commandString: string) {
    setIsLoaded(true);
    let csvData = filepath_to_CSV.get(
      commandString.substring(commandString.indexOf(" ") + 1)
    );
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

  function view(commandString: string) {
    if (!isLoaded) {
      props.setHistory([
        ...props.history,
        [commandString, [["ERROR: no data loaded so cannot view"]]],
      ]);
    } else {
      props.setHistory([...props.history, [commandString, props.data]]);
    }
  }

  function search(commandString: string) {
    if (!isLoaded) {
      props.setHistory([
        ...props.history,
        [commandString, [["ERROR: no data loaded so cannot search"]]],
      ]);
    } // data is loaded so can search
    else {
      var output = search_to_output.get(
        commandString.substring(commandString.indexOf(" ") + 1)
      );
      if (output != null) {
        props.setHistory([...props.history, [commandString, output]]);
      } else {
        props.setHistory([...props.history, [commandString, [[]]]]);
      }
    }
  }

  return (
    <div className="repl-input">
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>Submit</button>
    </div>
  );
}
