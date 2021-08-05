import { ActionsTypes } from "../actions/actions"

interface IMain {
  isPinging : boolean
}

const initialState = {
  isPinging : false
}

export default function mainReducer(state: IMain = initialState, action: ActionsTypes) {
  switch (action.type) {
    case 'PING':
      return { isPinging: true };

    case 'PONG':
      return { isPinging: false };

    default:
      return state;
  }
}