import { combineEpics } from 'redux-observable';
import {combineReducers} from 'redux'
import mainReducer from './mainReducer'
import { fetchUserEpic,loginUserEpic,registerUserEpic } from '../actions/actions';

export const rootEpic = combineEpics(
  fetchUserEpic,
  loginUserEpic,
  registerUserEpic
);

export const rootReducer = combineReducers({
    mainReducer
})

export type AppState = ReturnType<typeof rootReducer>
export type EpicState = ReturnType<typeof rootEpic>