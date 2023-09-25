// const CountryInfo = ({name, capital, area, languages}) => {
//     return (
//         <div>
//             <h1>{name}</h1>
//             <p>Capital: {capital}</p>
//             <p>Area: {area}Km2</p>
//             <h2>Languages:</h2>
//             <ul>
//                 {languages.map((language, index) => (
//                   <li key={index}>{language.name}</li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

const CountryInfo = function ({ country }) {
  const countryLang = (country) => {
    const langArr = Object.values(country.languages);
    return langArr.map((language, index) => <li key={index}>{language}</li>);
  };
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} Km2</p>
      <h2>Languages:</h2>
      <ul>{countryLang(country)}</ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

export default CountryInfo;
