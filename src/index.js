"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var operators_1 = require("rxjs/operators");
var redux_observable_1 = require("redux-observable");
var epicMiddleware = redux_observable_1.createEpicMiddleware();
var PING = 'PING';
var PONG = 'PONG';
var ping = function () { return ({ type: PING }); };
var pong = function () { return ({ type: PONG }); };
var pingEpic = function (action$) { return action$.pipe(redux_observable_1.ofType(PING), operators_1.delay(1000), operators_1.mapTo(pong())); };
var pingReducer = function (state, action) {
    if (state === void 0) { state = { isPinging: false }; }
    switch (action.type) {
        case 'PING':
            return { isPinging: true };
        case 'PONG':
            return { isPinging: false };
        default:
            return false;
    }
};
var store = redux_1.createStore(pingReducer, redux_1.applyMiddleware(epicMiddleware));
console.log(store.getState());
epicMiddleware.run(pingEpic);
store.dispatch(ping());
console.log(store.getState());
//# sourceMappingURL=index.js.map