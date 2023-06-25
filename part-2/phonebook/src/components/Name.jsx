const Name = ({ name, number, deletePerson }) => {
  return (
    <li>
      {name}
      <span>{` - ${number}`}</span>
      <button onClick={deletePerson}>delete</button>
    </li>
  );
};

export default Name;
