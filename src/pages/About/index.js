import React, { Component } from "react";

import NavBar from "../../components/Navbar";

export default class About extends Component {
  render() {
    return (
      <>
        <NavBar />
        <main className="container color-gray-700">
          <h2>Sobre</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, sequi error ipsam beatae explicabo natus fugit voluptate. Nam beatae reiciendis, vel eum, quaerat sunt veritatis officiis consectetur ipsam repellat dignissimos.</p>
        </main>
      </>
    );
  }
}
