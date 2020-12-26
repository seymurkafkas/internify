import React from "react";
import { InputGroup, Button } from "@blueprintjs/core";
import styles from "./styles.module.css";

class SearchBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      searchText: props.searchText,
    };
  }

  handleClick() {
    this.props.onSearchClick(this.state.searchText);
    // alert(this.state.searchText);
  }
  handleChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  render() {
    console.log(this.props);
    return (
      <div className={[styles.searchBar, "mb32"].join(" ")}>
        <h2 className={[styles.titleLarge, styles.mb16].join(" ")}>Search</h2>
        <div className={["flex"].join(" ")}>
          <InputGroup
            onChange={this.handleChange}
            className={["mr32", "bp3-large", "bp3-round"].join(" ")}
            defaultValue={this.state.searchText}
          />
          <Button onClick={this.handleClick}>Find a job</Button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
