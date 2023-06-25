const Name = ({ name, number, deleteName }) => {
  return (
    <li>
      {name}
      <span>{` - ${number}`}</span>
      <button onClick={deleteName}>delete</button>
    </li>
  );
};

export default Name;
