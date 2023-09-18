import React, { useState, useEffect } from "react";
import axios from "axios";
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
  console.log(search);

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
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
    // setSelectedCountry(null);
  };

  const filterCountries = countries.filter((country) =>
    country.name.common.toLowerCase().startsWith(search.toLowerCase())
  );

  const countryLang = (country) => {
    const langArr = Object.values(country.languages);
    return langArr.map((language, index) => <li key={index}>{language}</li>);
  };

// Add country flag  
//   const countryFlag = country => {
//     const flagUrl = Object.values(country)
//   }

  const CountriesToShow = () => {
    if (search !== "") {
      if (filterCountries.length > 10) {
        return <div>Too many countries to show, please be more specific</div>;
      } else if (filterCountries.length === 1) {
        const country = filterCountries[0];
        return (
          <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} Km2</p>
            <h2>Languages:</h2>
            <ul>{countryLang(country)}</ul>
          </div>
        );
      } else {
        return filterCountries.map((country) => (
          <div key={country.cca3}>{country.name.common}</div>
        ));
      }
    }
  };

  console.log(CountriesToShow([...filterCountries]));

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
