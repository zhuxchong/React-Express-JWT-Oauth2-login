import React from "react";
import Login from "./Login";
import Register from "./Register";
import Detail from "./Detail";
import Welcome from "./Welcome";
import Auth from "./Auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlobalState from "./store/GlobalState";
function App() {
  return (
    <GlobalState>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/detail" component={Detail} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
