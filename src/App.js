import Home from "./pages/Home.page";
import Search from "./pages/Search.page";
import React from 'react';
import { JobView } from "./pages/Job.page";
import MainMenu from "./components/MainMenu/MainMenu.component";
import Apply from "./pages/Apply.page";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Footer from "./components/Footer/Footer.component";

class App extends React.Component {

  render() {

    return (

      <Router>
        <MainMenu />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/search" component={Search}></Route>
          <Route path="/search/job=:searchQuery*+location=:location" component={Search}></Route>
          <Route exact path="/jobs/:jobId" component={JobView}></Route>
          <Route path="/jobs/:jobId/apply" component={Apply}></Route>
        </Switch>
        <Footer />
      </Router>
    );
  }

}

export default App;
