import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import Home from "./routes/Home";
import Search from "./routes/Search";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/search/:keyword">
          <Search />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
