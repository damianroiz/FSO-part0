const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <ul>
        <Part
          part={parts.map((part) => (
            <li key={part.id}>
              {part.name}: {part.exercises}
            </li>
          ))}
        />
      </ul>
    </div>
  );
};

const Total = ({ parts }) => {
  return (
    <strong>
      Total of{" "}
      {parts.reduce((accumulator, obj) => accumulator + obj.exercises, 0)}{" "}
      exercises
    </strong>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
