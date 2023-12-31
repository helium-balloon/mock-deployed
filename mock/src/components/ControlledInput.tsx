import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

// This interface defines the props for ControlledInput and allow them to be set.
interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * Input boxes (which the user interacts with when typing commands) contain state. We
 * want to make sure React is managing that state, so we have a special component
 * that wraps the input box.
 */
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}
