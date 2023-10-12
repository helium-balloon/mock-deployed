import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { filepath_to_CSV } from "../mocked";
import { commands_to_outputs } from "../mocked";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: [string, string[][]][];
  setHistory: Dispatch<SetStateAction<[string, string[][]][]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  data: string[][];
  setData: Dispatch<SetStateAction<string[][]>>;
}

// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");

  let [isLoaded, setIsLoaded] = useState<boolean>(false); // use let so that can reassign

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    handleInput(commandString);

    setCommandString("");
  }

  // helper method for handleSubmit
  function handleInput(commandString: string) {
    var output;

    // took out of switch statement bc somtimes was one word and other times first word
    if (commandString === "mode") {
      if (props.mode === "brief") {
        props.setMode("verbose");
        output = [["Mode has been switched to verbose"]];
      } else if (props.mode === "verbose") {
        props.setMode("brief");
        output = [["Mode has been switched to brief"]];
      }
    } else if (
      commandString.substring(0, commandString.indexOf(" ")) === "load_file"
    ) {
      setIsLoaded(true);
      let csvData = filepath_to_CSV.get(
        commandString.substring(commandString.indexOf(" ") + 1)
      );
      if (csvData !== undefined && csvData !== null) {
        props.setData(csvData);
<<<<<<< HEAD
        output = "success: data loaded";
=======
        output = [["success: data loaded"]];
>>>>>>> 0e73f4e87c728d6b855d1856d5e451643dd606a2
      } else {
        output = [["data could not be loaded"]];
      }
    } else if (commandString === "view") {
      if (!isLoaded) {
        // same issue about not being able to set
        output = [["data is not loaded so can not view"]]; // decide how we want errors to display, more specific
      } else {
        output = props.data; // access data in REPLHistory
      }
    } else if (
      commandString.substring(0, commandString.indexOf(" ")) === "search"
    ) {
      if (!isLoaded) {
        output = [["data is not loaded so can not search"]]; // decide how we want errors to display, more specific
      } else {
        output = commands_to_outputs.get(commandString);
      }
    } else {
      output = [["error invalid input"]]; // decide how we want errors to display, more specific
    }
    if (output != undefined) {
      props.setHistory([...props.history, [commandString, output]]);
    }
  }

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
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
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleSubmit(commandString)}>Submit</button>
    </div>
  );
}
