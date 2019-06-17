import React, { Component } from "react";
import Context from "./context";
class GlobalState extends Component {
  state = {
    state: null
  };
  changeState = string => {
    this.setState({ state: string });
  };

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state.state,
          changeState: this.changeState
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
export default GlobalState;
