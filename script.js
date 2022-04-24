import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';;
const { Observable, fromEvent, subscribe } = rxjs;
const { mergeMap,tap,map } = rxjs.operators;

import createTicker from './00-ticker-bundle/TickerAndItem.js'
import CoinServiceRx from './00-ticker-bundle/CoinServiceRx.js'
// import createTicker from './TickerAndItem.js'

const ticker$ = createTicker(new CoinServiceRx().fetch());
ticker$.subscribe();


// const createTicker = (data$) => {
//   ham.DOM.removeAllChildren(ham.DOM.qs('.ticker'))
//   data$.pipe(
//     tap(x => console.log('x', x)),
//     map(data =>Ticker(data)))
//   // data$.pipe(map(data =>Ticker('.ticker-wrap',data)))
//     .subscribe();
// }
// const ticker$ = createTicker(new CoinServiceRx().fetch());
// ticker$.subscribe();

// // createTicker(new CoinServiceRx().fetch())
