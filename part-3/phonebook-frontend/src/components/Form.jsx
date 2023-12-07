
  
  const FormField = ({ inputName, value, onChange }) => {
    return (
      <div className="field">
        {inputName}: <input value={value} onChange={onChange} />
      </div>
    );
  };
  
  const Form = ({
    doSomething,
    button,
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange
  }) => {
    return (
      <form onSubmit={doSomething}>
        <FormField
          inputName={"Name"}
          value={newName}
          onChange={handleNameChange}
        />
        <FormField
          inputName={"Number"}
          value={newNumber}
          onChange={handleNumberChange}
        />
        <button type="submit">{button}</button>
      </form>
    );
  };

  export default Form

