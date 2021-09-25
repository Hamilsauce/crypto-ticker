import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';;
const { Observable, fromEvent, subscribe } = rxjs;
const { map } = rxjs.operators;

import Ticker from './00-ticker-bundle/TickerAndItem.js'
import CoinServiceRx from './00-ticker-bundle/CoinServiceRx.js'

const createTicker = (data$) => {
  ham.DOM.removeAllChildren(ham.DOM.qs('.ticker'))
  data$.pipe(map(data => new Ticker('.ticker-wrap', data)))
    .subscribe();
}

createTicker(new CoinServiceRx().fetch())