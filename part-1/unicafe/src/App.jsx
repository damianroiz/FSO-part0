import React from "react";
import { useState } from "react";

function Button({ handleClick, text }) {
  return <button onClick={handleClick}>{text}</button>;
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, counter, average, positive }) => {
  if (!counter) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <StatisticsLine text={"Good"} value={good} />
          <StatisticsLine text={"Neutral"} value={neutral} />
          <StatisticsLine text={"Bad"} value={bad} />
          <StatisticsLine text={"Counter"} value={counter} />
          <StatisticsLine text={"Average"} value={`${average}%`} />
          <StatisticsLine text={"Positve"} value={`${positive}%`} />
        </table>
      </div>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [counter, setCounter] = useState(0);

  const goodClick = () => {
    setGood(good + 1);
    setCounter(counter + 1);
  };

  const neutralClick = () => {
    setNeutral(neutral + 1);
    setCounter(counter + 1);
  };

  const badClick = () => {
    setBad(bad + 1);
    setCounter(counter + 1);
  };

  const average = () =>
    Number((((good * 1 + neutral * 0 + bad * -1) / counter) * 100).toFixed(2));
  const positive = () => Number(((good / counter) * 100).toFixed(2));

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={goodClick} text={"good"} />
      <Button handleClick={neutralClick} text={"neutral"} />
      <Button handleClick={badClick} text={"bad"} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        counter={counter}
        average={average()}
        positive={positive()}
      />
    </div>
  );
};

export default App;
