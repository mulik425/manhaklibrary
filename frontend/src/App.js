import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import Home from "./routes/Home";
import Search from "./routes/Search";
import Community from "./routes/com_main";
import Post from "./routes/post";
import PostInfo from "./routes/postInfo";
import ProgramDetailRoute from "./routes/apply";
import UserInfo from "./routes/userInfo";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/apply/:id/form">
          <UserInfo />
        </Route>
        <Route path="/apply/:id">
          <ProgramDetailRoute />
        </Route>
       <Route path="/apply/:id">
          <UserInfo />
        </Route>
        <Route path="/search/:keyword">
          <Search />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/community">
          <Community />
        </Route>
        <Route path="/post">
          <Post />
        </Route>
        <Route path="/postInfo">
          <PostInfo />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
