import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { fetchUser } from './redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from "./redux/reducers/rootReducer";
import { Switch, Route, Redirect} from 'react-router-dom'
import EntryPage from "./Containers/entryPage/EntryPage";
import RoomsPage from "./Containers/roomsPage/roomsPage";
import ActionPage from "./Containers/actionPage/ActionPage";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={EntryPage}/>
        <PrivateRoute location='/' path="/action" component={ActionPage}/>
        <PrivateRoute location='/' path="/rooms" component={RoomsPage}/>
      </Switch>
    </div>
  );
}

export default App;