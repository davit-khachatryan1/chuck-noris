import { useState } from "react";
import { Button } from "antd";
import { JokeProps } from "./types";

import "./style.scss";

const JokeAlert = ({ joke, addToList }: JokeProps): JSX.Element => {
  const [lastJoke, setLastJoke] = useState<string>("");

  const handleClick = (): void => {
    if (joke.value === lastJoke) {
      return;
    }
    addToList(joke.value);
    setLastJoke(joke.value);
  };

  return (
    <div className="jokeAlertWrapper">
      <div> {joke.value}</div>
      <Button
        size="small"
        type="text"
        onClick={handleClick}
        disabled={joke.value === lastJoke}
      >
        Add to List
      </Button>
    </div>
  );
};

export default JokeAlert;
