import { mapTo, map, delay, filter } from 'rxjs/operators';
import { Epic, ofType, StateObservable } from 'redux-observable';
import { mergeMap, Observable } from 'rxjs';
import { USER_ACTION_TYPES } from './actionTypes'
import { IMain, todo } from '../reducers/mainReducer';
import { AppState } from '../reducers/rootReducer';
import { ajax } from 'rxjs/ajax';

function inferLiteralFromString<T extends string>(arg: T): T {
  return arg
}

export const fetchUser = () => ({
  type: inferLiteralFromString(USER_ACTION_TYPES.FETCH_USER),
})

const fetchUserFulfilled = (payload: any) => ({
  type: inferLiteralFromString(USER_ACTION_TYPES.FETCH_USER_FULFILLED),
  payload
});

export const loginUser = (payload: any) => ({
  type: inferLiteralFromString(USER_ACTION_TYPES.LOGIN_USER),
  payload
})

interface Action<T = any, P = any> {
  type: T
  payload?: P
}

export const loginUserEpic: Epic<ActionsTypes> = (action$: Observable<Action>, state$: StateObservable<AppState>): Observable<Action> => action$.pipe(
  ofType(USER_ACTION_TYPES.LOGIN_USER),
  mergeMap((action) =>
    ajax.post('http://localhost:5000/api/auth/login', action.payload).pipe(
      map(({ response }) => {
        console.log(response)
        return fetchUserFulfilled(response)
      }
      )
    )
  )
);

export const fetchUserEpic: Epic<ActionsTypes> = (action$: Observable<Action>, state$: StateObservable<AppState>) => action$.pipe(
  ofType(USER_ACTION_TYPES.FETCH_USER),
  mergeMap(action =>
    ajax({ url: 'http://localhost:5000/api/auth/me', withCredentials: true }).pipe(
      map(({ response }) => fetchUserFulfilled(response))
    )
  )
);


export type ActionsTypes = ReturnType<typeof fetchUser> | ReturnType<typeof fetchUserFulfilled> | ReturnType<typeof loginUser>