import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { fetchUser } from './redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from "./redux/reducers/rootReducer";
import { Switch, Route, Redirect} from 'react-router-dom'
import EntryPage from "./Containers/entryPage/EntryPage";

function App() {
  const dispatch = useDispatch()
  const me = useSelector((state: AppState) => state.mainReducer.user)

  useEffect(() => {
    dispatch(fetchUser())
  }, [])


  return (
    <div className="App">
      <Switch>
        <Route path="/" component={EntryPage}/>
      </Switch>
    </div>
  );
}

export default App;