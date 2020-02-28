import React, { Component } from "react";
import configureStore from "./store/configure_store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import withMuiTheme from "./with_mui_theme";
import Demo from "./pages/demo/demo_main";
import Main from "./pages/main/main";
import NotFindPage from "./pages/not_found_page";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename="/">
          <Switch>
            <Route exact={true} path="/" component={Main} />
            <Route exact={true} path="/demo" component={Demo} />
            <Route component={NotFindPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default withMuiTheme(App);
