import React, { useState } from "react";
import { InputGroup, Button } from "@blueprintjs/core";
import styles from "./styles.module.css";

function SearchBar(props: any) {
  const [searchText, setSearchText] = useState("");

  return (
    <div className={[styles.searchBar, "mb32"].join(" ")}>
      <h2 className={[styles.titleLarge, styles.mb16].join(" ")}>Search</h2>
      <div className={["flex"].join(" ")}>
        <InputGroup
          onChange={(text) => setSearchText(text)}
          className={["mr32", "bp3-large", "bp3-round"].join(" ")}
          defaultValue={searchText}
        />
        <Button onClick={(text) => props.onSearchClick(text)}>Find a job</Button>
      </div>
    </div>
  );
}

export default SearchBar;
