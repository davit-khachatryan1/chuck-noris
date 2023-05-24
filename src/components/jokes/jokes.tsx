import { useEffect, useState } from "react";
import { Button } from "antd";
import JokeAlert from "../jokeAlert/jokeAlert";
import JokesList from "../jokesList/jokesList";
import { Joke } from "./types";

import "./style.scss";

const Jokes = (): JSX.Element => {
  const [jokeData, setJokeData] = useState<Joke | null>(null);
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [showingJokes, setShowingJokes] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let jokeTimer: NodeJS.Timeout | null = null;

    const getRandomJoke = async () => {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const joke: Joke = await response.json();
      setJokeData(joke);
    };

    const startInterval = async (): Promise<void> => {
      await getRandomJoke();
      const id = setInterval(async () => {
        if (!jokeTimer) {
          await getRandomJoke();
          jokeTimer = setTimeout(() => {
            jokeTimer = null;
          }, 100);
        }
      }, 3000);

      setIntervalId(id);
    };

    if (showingJokes && !intervalId) {
      startInterval();
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      if (jokeTimer) {
        clearTimeout(jokeTimer);
      }
    };
  }, [showingJokes, intervalId]);

  const handleShowingJokes = (): void => {
    setShowingJokes(true);
  };

  const handleStopJokes = (): void => {
    setShowingJokes(false);
    setJokeData(null);
  };

  const addToList = (item: string): void => {
    setSelectedList((prevList) => {
      const updatedList = [...prevList.slice(-9), item];
      return updatedList;
    });
  };

  return (
    <div className="content">
      <div className="randomJokeWrapper">
        <div className="buttons">
          <Button onClick={handleShowingJokes}>Show Random Jokes</Button>
          <Button onClick={handleStopJokes}>Stop Showing Jokes</Button>
        </div>
        {showingJokes && jokeData && (
          <JokeAlert joke={jokeData} addToList={addToList} />
        )}
      </div>
      <div className="jokesWrapper">
        <JokesList list={selectedList} setSelectedList={setSelectedList} />
      </div>
    </div>
  );
};

export default Jokes;
