const SearchBar = ({ value, onChange }) => {
  return (
    <form>
      <span>Enter Country</span>
      <label htmlFor="country-search"></label>
      <input
        type="search"
        id="country-search"
        onChange={onChange}
        placeholder="Enter country"
        value={value}
      />
    </form>
  );
};

export default SearchBar;
