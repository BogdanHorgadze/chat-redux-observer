import { ActionsTypes } from "../actions/actions"
import { FETCH_USER_FULFILLED} from "../actions/actionTypes";

export type todo = {
  value : string
}

interface IMain {
  todos : Array<todo>
  user : any
}

const initialState : IMain = {
  todos : [],
  user : '' 
}

export default function mainReducer(state: IMain = initialState, action: ActionsTypes) {
  switch (action.type) {
      case FETCH_USER_FULFILLED:
        return {...state, user : action.payload}
      break;
    default:
      return state;
  }
}