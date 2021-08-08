import { mapTo, map, delay,filter } from 'rxjs/operators';
import {  Epic, ofType, StateObservable } from 'redux-observable';
import {  mergeMap, Observable } from 'rxjs';
import { Action } from 'redux';
import { FETCH_USER, FETCH_USER_FULFILLED} from './actionTypes'
import { todo } from '../reducers/mainReducer';
import { AppState } from '../reducers/rootReducer';
import { ajax } from 'rxjs/ajax';


type fetchUserType ={
  type : typeof FETCH_USER_FULFILLED,
  payload : any
}

type fetchUserFulfilledType ={
  type : typeof FETCH_USER,
  payload : todo
}

export const fetchUser  = () => ({
  type : FETCH_USER,
})

const fetchUserFulfilled = (payload : any) => ({ 
  type: FETCH_USER_FULFILLED,
  payload
});


export const fetchUserEpic: Epic<Action> = (action$: Observable<Action>, state$:StateObservable<AppState>) => action$.pipe(
  ofType(FETCH_USER),
  mergeMap(action =>
    ajax({url:'http://localhost:5000/auth/me',withCredentials:true}).pipe(
      map(({response}) => fetchUserFulfilled(response))
    )
  )
);


export type ActionsTypes = fetchUserType | fetchUserFulfilledType