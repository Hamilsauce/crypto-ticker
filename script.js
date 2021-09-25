// import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';;
const { Observable, fromEvent, subscribe } = rxjs;
const { map } = rxjs.operators;

import Ticker from './TickerAndItem.js'
import CoinServiceRx from './00-ticker-bundle/CoinServiceRx.js'

const createTicker = (data$) => {
  data$.pipe(map(data => new Ticker('.ticker-wrap', data)))
    .subscribe(x => console.log('subscribrd', x))
}

createTicker(new CoinServiceRx().fetch())