import CountryInfo from "./CountryInfo";

const CountriesToShow = ({ filterCountries, setCountries, search }) => {
    const countrySelected = (country) => {
      setCountries([country]);
    };

  if (search !== "") {
    if (filterCountries.length === 1) {
      const country = filterCountries[0];
      return <CountryInfo country={country} />;
    }
    if (filterCountries.length > 10) {
      return <div>Too many countries to show, please be more specific</div>;
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

export default CountriesToShow;
