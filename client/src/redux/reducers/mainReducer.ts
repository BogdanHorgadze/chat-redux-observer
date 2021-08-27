import { ActionsTypes } from "../actions/actions"
import { USER_ACTION_TYPES} from "../actions/actionTypes";

export type todo = {
  value : string
}

export interface IMain {
  todos : Array<todo>
  user : any
}

const initialState : IMain = {
  todos : [],
  user : '' 
}

export default function mainReducer(state: IMain = initialState, action: ActionsTypes) {
  switch (action.type) {
      case USER_ACTION_TYPES.FETCH_USER_FULFILLED:
        return {...state, user : action.payload}
      break;
    default:
      return state;
  }
}