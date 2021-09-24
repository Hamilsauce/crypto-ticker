const { of , iif, fromEvent, merge, empty, from, timer } = rxjs;
const { fromFetch } = rxjs.fetch;
const { switchMap, scan, take, mergeMap, takeWhile, map, tap, startWith, takeUntil, filter, mapTo } = rxjs.operators;

// const searchInput = document.querySelector('.input-group--search');
// const coinService = new CoinService();

const symbols$ = of ([
  'BTC', 'ETH', 'XRP', 'BCH', 'ADA', 'XLM', 'NEO', 'LTC',
  'EOS', 'XEM', 'IOTA', 'DASH', 'XMR', 'TRX', 'ICX', 'ETC',
  'QTUM', 'BTG', 'LSK', 'USDT', 'OMG', 'ZEC', 'SC', 'ZRX',
  'REP', 'WAVES', 'MKR', 'DCR', 'BAT', 'LRC', 'KNC', 'BNT',
  'LINK', 'CVC', 'STORJ', 'ANT', 'SNGLS', 'MANA', 'MLN', 'DNT',
  'NMR', 'DOT', 'DAI', 'UNI', 'ATOM', 'GRT', 'XTZ', 'FIL', 'NANO',
  'WBTC', 'BSV', 'DOGE', 'USDC', 'OXT', 'ALGO', 'BAND', 'BTT', 'FET', 'KAVA',
  'PAX', 'PAXG', 'REN', 'AAVE', 'YFI', 'NU', 'MATIC'
]);

// const input$ = fromEvent(searchInput, 'input')

// const fetchCoin$ = val => fromFetch(coinService.getCoinUrl(val))
// export const inputRx = input$.pipe(
//   map(({ target }) => target.value.toUpperCase()),
//   filter(value => value.length >= 3),
//   switchMap(val => {
//     return symbols$.pipe(
//       map(symbols => symbols.map(_ => _.toUpperCase()).includes(val.toUpperCase())),
//       takeWhile(res => res === true),
//       switchMap(() => fetchCoin$(val)
//         .pipe(
//           mergeMap((response) => response.json()),
//           map(x => { return { symbol: x.data[val].iso, data: x.data[val] } })
//         )
//       )
//     )
//   })
// );

export default class {
  constructor(...listeners) {
    this.BASE_URL = `https://production.api.coindesk.com/v2/tb/price/ticker?assets=`;
    this.ALL_ASSETS_URL   = `https://production.api.coindesk.com/v2/tb/price/ticker?assets=all`;
  }

  fetch(val) {
    return fromFetch(this.getCoinUrl(val ? val : 'all'))
      .pipe(
        mergeMap((response) => response.json()),
        map(x => x.data)
      )
  }

  subscribe() {
    this.listeners.forEach(l => l.addEventListener('dataloaded', ))
  }

  getCoinUrl(sym) { return `https://production.api.coindesk.com/v2/tb/price/ticker?assets=${sym}` }

  fetchACoin(sym) {
    const url = this.getCoinUrl(sym);

  }

  fetchAllCoins() {}

  async fetchCoin(symbol = '', ...listeners) {
    let sym = symbol.length === 0 ? 'BTC' : symbol;
    let url = `${this.BASE_URL}${sym}`;

    const filteredListeners = listeners
      .filter(l => l instanceof Element);

    const res = await fetch(url);
    const data = await res.json();
    const coinData = data.data;

    // console.log('coindata.data', coinData);

    filteredListeners.forEach(l => this.emitNotesLoaded(l, coinData));
    return coinData;
  }

  emitNotesLoaded(target, data) { target.dispatchEvent(new CustomEvent('dataloaded', { bubbles: true, detail: { data } })) };
}