import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryInfo from "./components/CountryInfo";
// import SearchBar from "./components/SearchBar";

// get all countries from API
//filter values according while typing
// if there are more than 10 countries, propmt user to make query more selective
// if less than 10 countries match the seach, display mathching countries
// if only one country matches the search: display country name, capital, area, languaages and flag
// if only one language, subtitle === 'language' : 'languages'

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  // const [selectedCountry, setSelectedCountry] = useState();

  useEffect(() => {
    console.log("effect");
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
        console.log(`the set country is ${setCountries}`);
      })
      .catch((error) => {
        console.log("Error fetching country data:", error);
      });
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    // setSelectedCountry(null);
  };

  const CountriesToShow = () => {
    let filterCountries = countries.filter((country) =>
      country.name.common.toLowerCase().startsWith(search.toLowerCase())
    );

    const countrySelected = (country) => {
      setCountries([country]);
      //setSelected(setCountries([country])) // creating a separte state is not working when button is clicked
      // setSeach("") // this would blog the if statement below
    };

    if (search !== "") {
      if (filterCountries.length > 10) {
        return <div>Too many countries to show, please be more specific</div>;
      } else if (filterCountries.length === 1) {
        const country = filterCountries[0];
        return <CountryInfo country={country} />;
      } else {
        return filterCountries.map((country) => (
          <div key={country.cca3}>
            <span>
              {country.name.common}
              <button onClick={() => countrySelected(country)}>show</button>
            </span>
          </div>
        ));
      }
    }
  };

  return (
    <div>
      Find Countries: <input onChange={handleChange} value={search} />
      <CountriesToShow />
    </div>
  );
};

export default App;

//   countriesToShow([...filterCountries]).length === 1 &&
//     selectedCountry(countriesToShow([...filterCountries]));

/* <div>
Find Countries: <input onChange={handleChange} value={search} />
{selectedCountry
  ? selectedCountry.map((country) => (
      <div key={country.name.common}>{country.name.common}</div>
    ))
  : countriesToShow([...filterCountries]).map((country) => (
      <div key={country.name.common}>{country.name.common}</div>
    ))}
</div> */
