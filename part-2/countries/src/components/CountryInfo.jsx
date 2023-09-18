const CountryInfo = ({name, capital, area, languages}) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Area: {area}Km2</p>
            <h2>Languages:</h2>
            <ul>
                {languages.map((language, index) => (
                  <li key={index}>{language.name}</li>  
                ))}
            </ul>
        </div>
    )
}

export default CountryInfo