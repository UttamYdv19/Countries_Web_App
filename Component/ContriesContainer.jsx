import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountryListShimmer from "./CountryListShimmer";
// import countriesData from "./countriesData";
export default function ContriesContainer({ query }) {
  const [countriesData, setcountriesData] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setcountriesData(data);
      });
  }, []);

  const filteredCountry = countriesData.filter(
    (country) =>
      country.name.common.toLowerCase().includes(query) ||
      country.region.toLowerCase().includes(query)
  );
  if (countriesData.length === 0) {
    return <CountryListShimmer />;
  }
  return (
    <>
      <div className="contries-container">
        {filteredCountry.map((country) => {
          return (
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              flag={country.flags.svg}
              population={country.population.toLocaleString("en-IN")}
              region={country.region}
              capital={country.capital?.[0]}
              data={country}
            />
          );
        })}
      </div>
    </>
  );
}
