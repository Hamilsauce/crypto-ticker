const { of , iif, fromEvent, merge, empty, from, timer } = rxjs;
const { fromFetch } = rxjs.fetch;
const { switchMap, scan, take, mergeMap, takeWhile, map, tap, startWith, takeUntil, filter, mapTo } = rxjs.operators;

const symbols$ = of ([
  'BTC', 'ETH', 'XRP', 'BCH', 'ADA', 'XLM', 'NEO', 'LTC', 'EOS', 'XEM', 'IOTA', 'DASH', 'XMR', 'TRX', 'ICX', 'ETC',
  'QTUM', 'BTG', 'LSK', 'USDT', 'OMG', 'ZEC', 'SC', 'ZRX', 'REP', 'WAVES', 'MKR', 'DCR', 'BAT', 'LRC', 'KNC', 'BNT',
  'LINK', 'CVC', 'STORJ', 'ANT', 'SNGLS', 'MANA', 'MLN', 'DNT', 'NMR', 'DOT', 'DAI', 'UNI', 'ATOM', 'GRT', 'XTZ', 'FIL',
  'NANO', 'WBTC', 'BSV', 'DOGE', 'USDC', 'OXT', 'ALGO', 'BAND', 'BTT', 'FET', 'KAVA', 'PAX', 'PAXG', 'REN', 'AAVE', 'YFI', 'NU', 'MATIC'
]);

export default class {
  constructor() {
    this.BASE_URL = `https://production.api.coindesk.com/v2/tb/price/ticker?assets=`;
    this.ALL_ASSETS_URL = `https://production.api.coindesk.com/v2/tb/price/ticker?assets=all`;
  }

  // TODO NEW
  fetch(val) {
    return fromFetch(this.getCoinUrl(val ? val : 'all')).pipe(
      mergeMap((response) => response.json()),
      map(x => x.data)
    )
  }

  // TODO OLD
  async fetchCoin(symbol = '', ...listeners) {
    const filteredListeners = listeners.filter(l => l instanceof Element);
    const res = await fetch(`${this.BASE_URL}${symbol.length === 0 ? 'BTC' : symbol}`);
    const data = await res.json();
    filteredListeners.forEach(l => this.emitNotesLoaded(l, data.data));
    return data.data;
  }

  getCoinUrl(sym) { return `https://production.api.coindesk.com/v2/tb/price/ticker?assets=${sym}` }

  emitNotesLoaded(target, data) { target.dispatchEvent(new CustomEvent('dataloaded', { bubbles: true, detail: { data } })) };
}