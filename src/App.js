import { Route, Switch } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import NavbarMenu from './components/NavbarMenu';
import Weather from './components/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import Contact from './components/Contact';
import NoMatch from './components/NoMatch'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <NavbarMenu />
          <Home />
        </Route>
        <Route path="/about">
          <NavbarMenu />
          <About />
        </Route>
        <Route path="/weather">
          <NavbarMenu />
          <Weather />
        </Route>
        <Route path="/contact">
          <NavbarMenu />
          <Contact />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
