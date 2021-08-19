import { mapTo, map, delay,filter } from 'rxjs/operators';
import {  Epic, ofType, StateObservable } from 'redux-observable';
import {  mergeMap, Observable } from 'rxjs';
import { Action } from 'redux';
import { USER_ACTION_TYPES} from './actionTypes'
import { todo } from '../reducers/mainReducer';
import { AppState } from '../reducers/rootReducer';
import { ajax } from 'rxjs/ajax';


type fetchUserType ={
  type : USER_ACTION_TYPES.FETCH_USER_FULFILLED,
  payload : any
}

type fetchUserFulfilledType ={
  type : USER_ACTION_TYPES.FETCH_USER,
  payload : todo
}

export const fetchUser  = () => ({
  type : USER_ACTION_TYPES.FETCH_USER
}) 

const fetchUserFulfilled = (payload : any) => ({ 
  type: USER_ACTION_TYPES.FETCH_USER_FULFILLED,
  payload
});


export const fetchUserEpic: Epic<Action> = (action$: Observable<Action>, state$:StateObservable<AppState>) => action$.pipe(
  ofType(USER_ACTION_TYPES.FETCH_USER),
  mergeMap(action =>
    ajax({url:'http://localhost:5000/api/auth/me',withCredentials:true}).pipe(
      map(({response}) => fetchUserFulfilled(response))
    )
  )
);


export type ActionsTypes = fetchUserType | fetchUserFulfilledType