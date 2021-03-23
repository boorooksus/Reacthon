import React from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage.js";

function App() {
  return (
<div style={{ paddingTop: '20px'}}>
  <Switch>
    <Route exact path="/" component={LandingPage} />

  </Switch>
</div>
  );
}

export default App;
