import React, { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import SelectMenu from "./SelectMenu";
import ContriesContainer from "./ContriesContainer";
import {useTheme} from "../hooks/useTheme";

export default function Home() {
  const [query, setQuery] = useState("");
  const [IsDark] = useTheme();
  return (
    <>
      <main className={`${IsDark ? "dark" : ""}`}>
        <div className="search-filter-container ">
          <SearchBar setQuery={setQuery} />
          <SelectMenu setQuery={setQuery} />
        </div>
        <ContriesContainer query={query} />
      </main>
    </>
  );
}
