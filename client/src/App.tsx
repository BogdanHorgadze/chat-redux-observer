import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {fetchUser} from './redux/actions/actions'
import {useDispatch,useSelector} from 'react-redux'
import { AppState } from "./redux/reducers/rootReducer";

function App() {
  const dispatch = useDispatch()
  const me = useSelector((state:AppState) => state.mainReducer.user)

  useEffect(() => {
    dispatch(fetchUser())
    },[])
    console.log(1)

  return (
    <div className="App">
      <a href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle&client_id=971332111731-lq881vh0ti7g0rdjeaa5nuvt8nlbmmib.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email">
        LOGIN WITH GOOGLE
      </a>
      <h1>{JSON.stringify(me)}</h1>
    </div>
  );
}

export default App;