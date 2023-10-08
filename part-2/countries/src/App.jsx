import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CountriesToShow from "./components/CountriesToShow";

// get all countries from API
//filter values according while typing
// if there are more than 10 countries, propmt user to make query more selective
// if less than 10 countries match the seach, display mathching countries
// if only one country matches the search: display country name, capital, area, languaages and flag
// if only one language, subtitle === 'language' : 'languages'

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
        // console.log(`the set country is ${setCountries}`);
      })
      .catch((error) => {
        console.log("Error fetching country data:", error);
      });
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  let filterCountries = countries.filter((country) =>
    country.name.common.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <div>
      <SearchBar onChange={handleChange} value={search} />
      <CountriesToShow
        filterCountries={filterCountries}
        setCountries={setCountries}
        search={search}
      />
    </div>
  );
};

export default App;
