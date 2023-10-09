import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: [string, string][];
  setHistory: Dispatch<SetStateAction<[string, string][]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");

  // Manages the current amount of times the button is clicked
  // const [count, setCount] = useState<number>(0);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  //const [mode, setMode] = useState<string>("brief");

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    handleInput(commandString);

    setCommandString("");
  }

  // helper method for handleSubmit
  function handleInput(commandString: string) {
    var first_word = commandString.substring(0, commandString.indexOf(" "));

    // changing mode first since this impacts what gets added to history below
    // for testing, check to make sure that setMode switches at correct time or if it lags bc using state
    if (commandString == "mode verbose") {
      props.setMode("verbose");
    }
    if (commandString == "mode brief") {
      props.setMode("brief");
    }

    var output = "";

    // RESULTS - which are returned no matter the mode
    switch (first_word) {
      case "mode":
        output = "Mode has been switched";
        break;
      case "load":
        setIsLoaded(true);
        break;
      case "view":
        if (!isLoaded) {
          // same issue about not being able to set
          output = "data is not loaded so can not view"; // decide how we want errors to display, more specific
          break;
        }
        break;
      case "search":
        if (!isLoaded) {
          output = "data is not loaded so can not search"; // decide how we want errors to display, more specific
          break;
        }
        break;
      default:
        output = "error invalid input"; // decide how we want errors to display, more specific
        break;
    }

    props.setHistory([...props.history, [commandString, output]]);
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
