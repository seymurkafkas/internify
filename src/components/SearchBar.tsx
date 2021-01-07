import React from "react";
import { InputGroup, Button } from "@blueprintjs/core";

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
    return (
      <div className="flex flex-col space-y-2 mb-8">
        <h2 className="text-3xl font-bold">Search</h2>
        <div className="flex space-x-4">
          <InputGroup
            onChange={this.handleChange}
            className="rounded-lg w-96"
            defaultValue={this.state.searchText}
            placeholder="Search for a term"
          />
          <Button onClick={this.handleClick}>Find a job</Button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
