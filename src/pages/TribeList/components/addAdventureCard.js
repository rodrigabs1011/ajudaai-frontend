import React, { Component, Fragment } from "react";

export default class AddAdventureCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
    };
  }

  handleChange = (e) => {
    const name = e.target["name"];
    const value = e.target["value"];
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      description: this.state.description,
    };
    this.setState({ description: "", name: "" });
    this.props.createAdventure(data);
  };

  render() {
    const { description } = this.state;
    const { name } = this.state;

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="name"
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="description"
            value={description}
            placeholder="description"
            onChange={this.handleChange}
          />
          <button>add</button>
        </form>
      </Fragment>
    );
  }
}
