import React from "react";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <div>
      <h2>{props.subject.name}</h2>
      <p>Number of exercises: {props.subject.exercises}</p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part subject={props.subject[0]} />
      <Part subject={props.subject[1]} />
      <Part subject={props.subject[2]} />
    </div>
  );
};

const Total = (props) => {
  return (
    <strong>
      Total number of exercises:{" "}
      {props.exercises[0].exercises +
        props.exercises[1].exercises +
        props.exercises[2].exercises}
    </strong>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div className="app">
      <Header course={course.name} />
      <Content subject={course.parts} />
      <Total exercises={course.parts} />
    </div>
  );
};

export default App;
