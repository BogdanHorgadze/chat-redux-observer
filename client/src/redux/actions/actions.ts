import { Dispatch } from 'react'
import { AppState } from '../reducers/rootReducer'
import { mapTo, map, delay } from 'rxjs/operators';
import {  ofType } from 'redux-observable';

type dispatchType = Dispatch<ActionsTypes>

const PING = 'PING';
const PONG = 'PONG';

interface PingAction {
  type: typeof PING
}

interface PongAction {
  type: typeof PONG,
  payload: number
}

export const ping = (): PingAction => ({ type: PING });
export const pong = (counter: number): PongAction => ({ type: PONG, payload: counter });

export const pingEpic = (action$ : any) => action$.pipe(
  ofType('PING'),
  delay(1000),
  mapTo({ type: 'PONG' })
);


export type ActionsTypes = PingAction | PongAction;