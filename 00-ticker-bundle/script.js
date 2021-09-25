import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
/*
  must include following script tag in index.html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/7.3.0/rxjs.umd.min.js" integrity="sha512-y3JTS47nnpKORJX8Jn1Rlm+QgRIIZHtu3hWxal0e81avPrqUH48yk+aCi+gprT0RMAcpYa0WCkapxe+bpBHD6g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
*/
const { fromEvent, subscribe } = rxjs;
const { map } = rxjs.operators;

import Ticker from './TickerAndItem.js'
import CoinServiceRx from './CoinServiceRx.js'

const createTicker = (data$) => {
  ham.DOM.removeAllChildren(ham.DOM.qs('.ticker'))
  data$.pipe(map(data => new Ticker('.ticker-wrap', data)))
    .subscribe();
}

createTicker(new CoinServiceRx().fetch())