import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { fetchUser } from './redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from "./redux/reducers/rootReducer";
import { Switch, Route, Redirect} from 'react-router-dom'
import EntryPage from "./Containers/entryPage/EntryPage";
import ActionPage from "./Containers/actionPage/ActionPage";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
  // const dispatch = useDispatch()
  // const me = useSelector((state: AppState) => state.mainReducer.user)

  // useEffect(() => {
  //   dispatch(fetchUser())
  // }, [])



  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={EntryPage}/>
        <PrivateRoute location='/' path="/actionPage" component={ActionPage}/>
      </Switch>
    </div>
  );
}

export default App;