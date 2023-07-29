const Name = ({ id, name, number, handleDelete }) => {
  return (
    <li>
      {name}
      <span>{` - ${number}`}</span>
      <button onClick={() => handleDelete(id)}>delete</button>
    </li>
  );
};

export default Name;
