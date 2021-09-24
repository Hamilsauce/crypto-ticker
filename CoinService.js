import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';;

// ham.help('CoinService.js, line 3')

const { Observable, merge, finalize, timer, from, of , range, interval, fromEvent, subscribe } = rxjs;
const { bufferWhen, takeUntil, switchMap, mapTo, mergeMap, filter, map, tap, take } = rxjs.operators;

const BASE_URL = `https://production.api.coindesk.com/v2/tb/price/ticker?assets=`;
const CRYPTO_SYMBOL = `BTC`;
const CRYPTO_URL = `${BASE_URL}${CRYPTO_SYMBOL}`;

let pollingActive = false;

const fetchCoin = async (symbol) => {
  const resp = await fetch(`${BASE_URL}${symbol}`)
  const result = await resp.json();
  return result
};

const createStopPollingObservable = (targetEl = document.querySelector('.button')) => {
  return fromEvent(targetEl, 'click');
};

function mapCrypto(response) {
  const numberFormatter = Intl.NumberFormat('en-US');
  const parsedData = numberFormatter.format(response.data.BTC.circulatingSupply.toFixed(2));
  return of(parsedData ? parsedData : '');
};

let requestCategory = 'crypto';
let pollingSub$;

const toggleButton = document.getElementById('toggle-button');
const cryptoClick$ = fromEvent(toggleButton, 'click').pipe(mapTo('crypto'));


const categoryMap = new Map(
  [
    ['crypto', { url: CRYPTO_URL, mapper: mapCrypto }]
  ])

/**
 * requestData() will make an AJAX 
 * request to the given Url, map the 
 * parsed repsonse with provided mapper 
 * and emit the result onto the returned observable.
 */
function requestData(url, mapFunc) {
  return from(fetchCoin('BTC'))
    .pipe(
      switchMap((data) => mapFunc(data)),
      tap((data) => console.log('Request result: ', data))
    );
}

/**
 * startPolling() will begin our 
 * polling for the given state, and
 * on the provided interval (d: RequestCategoryefaulting : numberto 5 seconds)
 */
function startPolling(category, interval = 2000) {
  const mapData = categoryMap.get(category);
  return timer(0, interval)
    .pipe(switchMap(_ => requestData(mapData.url, mapData.mapper)));
}


let stopPolling$ = createStopPollingObservable(toggleButton);
let pollingActive$ = of (pollingActive).pipe(
  map(x => x)).subscribe(x => console.log('pollingActive$ subscriber', x));

function updateDom(result) {
  if (requestCategory === 'crypto') document.querySelector('#output').innerHTML = `BTC Circulation: ${result}`;
}

function watchForData(category) { // Start  new Poll
  return startPolling(category, 2000).pipe(
    tap(updateDom),
    takeUntil(
      merge( // stop polling on either button click or change of categories
        stopPolling$,
        merge(cryptoClick$)
        .pipe(filter(c => c !== category))
      )
    ),
    // for demo purposes only
    finalize(() => document.querySelector('#polling-status').innerHTML = 'Stopped')
  )
}

// Handle Form Updates
cryptoClick$.pipe(map(x => {}))
  .subscribe((category) => {
    document.querySelector('#output').style.display = 'block';
  });

// merge(cryptoClick$, pollingActive$).subscribe()

// Start Polling
fromEvent(toggleButton, 'click')
  .pipe(
    // switchMap(),
    map(x => {
      pollingActive = !pollingActive;
      if (!pollingActive) {}
    }),
    tap(_ => document.querySelector('#polling-status').innerHTML = 'Started'),
    mergeMap(_ => watchForData(requestCategory))
  )
  .subscribe();

/*
  
  // Gather our DOM Elements to wire up events
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const text = document.getElementById('text');
const pollingStatus = document.getElementById('polling-status');
const catsRadio = document.getElementById('catsCheckbox');
const meatsRadio = document.getElementById('meatsCheckbox');
const cryptoRadio = document.getElementById('cryptoCheckbox');
const catsClick$ = fromEvent(catsRadio, 'click').pipe(mapTo('cats'));
const meatsClick$ = fromEvent(meatsRadio, 'click').pipe(mapTo('meats'));
const catImage = document.getElementById('cat');

  
  */