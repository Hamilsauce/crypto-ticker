const { of , iif, fromEvent, merge, empty, from, timer } = rxjs;
const { fromFetch } = rxjs.fetch;
const { switchMap, scan, take, mergeMap, takeWhile, map, tap, startWith, takeUntil, filter, mapTo } = rxjs.operators;
import CoinServiceRx from '../00-ticker-bundle/CoinServiceRx.js'
import syms from './coin-symbols.js'

const searchInput = document.querySelector('.input-group--search');
const coinServiceRx = new CoinServiceRx();

const symbols$ = of (syms)
const input$ = fromEvent(searchInput, 'input')
const fetchCoin$ = val => fromFetch(coinService.getCoinUrl(val))

export default input$.pipe(
  map(({ target }) => target.value.toUpperCase()),
  filter(value => value.length >= 3),
  switchMap(val => {
    return symbols$.pipe(
      map(symbols => symbols.map(_ => _.toUpperCase()).includes(val.toUpperCase())),
      takeWhile(res => res === true),
      switchMap(() => coinServiceRx.fetch(val)
        .pipe(
          map(x => {
            console.log('Object.values(x)', Object.values(x)[0])
            return Object.values(x)[0]
          })
        )
      )
    )
  })
);