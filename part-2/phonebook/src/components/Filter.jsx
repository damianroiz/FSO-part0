const Filter = ({ title, handleSearch, newSearch }) => {
    return (
      <div>
        <h2>{title}</h2>
        <label htmlFor="contact-search"></label>
        <input
          type="search"
          id="contact-search"
          onChange={handleSearch}
          placeholder="search by name"
          value={newSearch}
        />
      </div>
    );
  };
  
  export default Filter