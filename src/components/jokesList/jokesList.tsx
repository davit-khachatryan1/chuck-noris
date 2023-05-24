import { Button } from "antd";
import { JokesListProps } from "./types";

import "./styles.scss";

const JokesList = ({ list, setSelectedList }: JokesListProps): JSX.Element => {
  const clearAll = (): void => {
    setSelectedList([]);
  };
  const removeJoke = (index: number): void => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setSelectedList(updatedList);
  };
  return (
    <div className="jokesListWrapper">
      <div className="buttonWrapper">
        <Button type="text" danger onClick={clearAll}>
          Clear List
        </Button>
      </div>
      <div className="list">
        {list?.map((item: string, index: number) => (
          <div className="itemWrapper">
            <Button
              size="small"
              type="primary"
              shape="circle"
              danger
              onClick={(): void => removeJoke(index)}
            >
              X
            </Button>
            <div className="item">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JokesList;
