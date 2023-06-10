const Name = ({ name, number }) => {
    return (
      <li>
        {name}
        <span>{` - ${number}`}</span>
      </li>
    );
  };

  export default Name