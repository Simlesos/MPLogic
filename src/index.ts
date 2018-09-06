import { createStore, applyMiddleware } from 'redux'
import { mapTo, delay } from 'rxjs/operators'
import { ofType, createEpicMiddleware } from 'redux-observable'

const epicMiddleware = createEpicMiddleware();

const PING = 'PING';
const PONG = 'PONG';
const ping = () => ({ type: PING });
const pong = () => ({ type: PONG });

const pingEpic = action$ => action$.pipe(
    ofType(PING),
    delay(1000),
    mapTo(pong())
);

const pongEpic = action$ => action$.pipe(
    ofType(PONG),
    delay(1000),
    mapTo(ping())
);

const pingReducer = (state = { isPinging: false }, action) => {
    switch (action.type) {
        case 'PING':
            return { isPinging: true };
        case 'PONG':
            return { isPinging: false };
        default:
            return false;
    }
};

const store = createStore(pingReducer,  applyMiddleware(epicMiddleware));

console.log(store.getState());

epicMiddleware.run(pingEpic);
store.dispatch(ping());
store.dispatch(pong());
console.log(store.getState());








