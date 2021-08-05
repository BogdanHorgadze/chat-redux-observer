import { useState, useEffect } from "react";
import axios from "axios";
import {ping} from './redux/actions/actions'
import {useDispatch,useSelector} from 'react-redux'
import { AppState } from "./redux/reducers/rootReducer";
function App() {
  const dispatch = useDispatch()
  const isPinging = useSelector((state:AppState) => state.mainReducer.isPinging)
  // const [me, setMe] = useState(null);

  // useEffect(() => {
  //   async function getMe() {
  //     await axios
  //       .get("http://localhost:5000/auth/me", {
  //         withCredentials: true,
  //       })
  //       .then((res) => setMe(res.data));
  //   }

  //   getMe();
  // }, []);

  // if (me) {
  //   return <p>hi {JSON.stringify(me)}</p>;
  // }

  return (
    <div className="App">
      {/* <a href="https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle&client_id=971332111731-lq881vh0ti7g0rdjeaa5nuvt8nlbmmib.apps.googleusercontent.com&access_type=offline&response_type=code&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email">
        LOGIN WITH GOOGLE
      </a> */}
      <h1>{JSON.stringify(isPinging)}</h1>
      <button onClick={() => dispatch(ping())}>add</button>
    </div>
  );
}

export default App;