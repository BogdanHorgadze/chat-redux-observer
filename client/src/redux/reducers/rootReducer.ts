import { combineEpics } from 'redux-observable';
import {combineReducers} from 'redux'
import mainReducer from './mainReducer'
import { pingEpic } from '../actions/actions';

export const rootEpic = combineEpics(
  pingEpic,
);

export const rootReducer = combineReducers({
    mainReducer
})

export type AppState = ReturnType<typeof rootReducer>
