import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import {useTheme} from "../hooks/useTheme";
import "./CountryDetail.css";
import CountryDetailShimmer from "./CountryDetailShimmer";

export default function CountryDetailscopy() {
  const param = useParams();
  const CountryName = param.Country;
  const [CountryData, setCountryData] = useState(null);
  const [notFound, setnotFound] = useState(false);
  const { state } = useLocation();
  const [IsDark] = useTheme();

  console.log(state);
  function updateCountriesDetails(data) {
    setCountryData({
      key: data.name.common,
      name: data.name.common,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital?.join(", "),
      flag: data.flags.svg,
      domain: data.tld.join(", "),
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(", "),
      language: Object.values(data.languages || {}).join(", "),
      borders: [],
    });

    if (!data.borders) {
      data.borders = [];
    }

    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common);
      })
    ).then((borders) => {
      setTimeout(() =>
        setCountryData((prevState) => ({ ...prevState, borders }))
      );
    });
  }

  useEffect(() => {
    if (state) {
      updateCountriesDetails(state);
    }

    fetch(`https://restcountries.com/v3.1/name/${CountryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountriesDetails(data);
      })
      .catch((err) => {
        setnotFound(true);
      });
  }, [CountryName]);

  if (notFound) {
    return <div>Country Not Found!!!</div>;
  } else {
    return CountryData === null ? (
      <>
        "loading...."
        <CountryDetailShimmer />
      </>
    ) : (
      <>
        <main className={`${IsDark ? "dark" : ""}`}>
          <div className="country-details-container">
            <span
              className="back-button"
              onClick={() => {
                history.back();
              }}
            >
              <i className="fa-solid fa-arrow-left"></i>&nbsp;&nbsp; Back
            </span>
            {CountryData === null ? (
              <CountryDetailShimmer />
            ) : (
              <div className="country-details">
                <img src={CountryData.flag} alt={CountryData.name} />
                <div className="details-text-container">
                  <h1>{CountryData.name}</h1>
                  <div className="details-text">
                    <p>
                      <b>Native Name :</b>{" "}
                      <span className="native-name">
                        &nbsp;&nbsp;{CountryData.nativeName || CountryData.name}
                      </span>
                    </p>
                    <p>
                      <b>Population :</b>
                      <span className="Population">
                        &nbsp;&nbsp;
                        {CountryData.population.toLocaleString("en-IN")}
                      </span>
                    </p>
                    <p>
                      <b>Region :</b>{" "}
                      <span className="region">
                        &nbsp;&nbsp;{CountryData.region}
                      </span>
                    </p>
                    <p>
                      <b>Sub Region :</b>{" "}
                      <span className="sub-region">
                        &nbsp;&nbsp;{CountryData.subregion}
                      </span>
                    </p>
                    <p>
                      <b>Capital :</b>{" "}
                      <span className="Capital">
                        &nbsp;&nbsp;{CountryData.capital}
                      </span>
                    </p>
                    <p>
                      <b>Top Level Domain :</b>
                      <span className="Domain">
                        &nbsp;&nbsp;{CountryData.domain}
                      </span>
                    </p>
                    <p>
                      <b>Currencies :</b>
                      <span className="Currencies">
                        &nbsp;&nbsp; {CountryData.currencies}
                      </span>
                    </p>
                    <p>
                      <b>Language :</b>
                      <span className="Language">
                        &nbsp;&nbsp; {CountryData.language}
                      </span>
                    </p>
                  </div>
                  {CountryData.borders.length !== 0 && (
                    <div className="border-country">
                      <p>
                        <b>Border Countries:</b>&nbsp;
                        {CountryData.borders.map((border) => (
                          <Link key={border} to={`/${border}`}>
                            {border}
                          </Link>
                        ))}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </>
    );
  }
}
