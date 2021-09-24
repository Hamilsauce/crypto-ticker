import CoinService from './CoinService.js'
import searchInput$ from './search-input.js'
const { interval, fromEvent, merge, empty } = rxjs;
const { switchMap, scan, takeWhile, startWith, map, mapTo } = rxjs.operators;
const COUNTDOWN_SECONDS = 10;

const app = document.querySelector('.app');
const coinService = new CoinService();
// console.log('coinService', coinService)

searchInput$.pipe(
  map(({ data }) => {
    app.querySelector('.name-output').textContent = data.name;
    app.querySelector('.price-output').textContent = data.ohlc.c;
    return data
  })
).subscribe();

app.addEventListener('dataloaded', ({ detail }) => {
  const nameEl = app.querySelector('.name-output');
  const priceEl = app.querySelector('.price-output');
  // nameEl.textContent = Object.values(detail.data)[0].name
  // priceEl.textContent = Object.values(detail.data)[0].change.value;
  // nameEl.textContent = detail.data.sym.value
});

coinService.fetchCoin('', app)


// Homemade Recusrive timer
let count = 9;
const timer1 = (n) => {
  if (n <= 0) return n;
  else {
    console.log(n);
    setTimeout(() => timer1(--n), 500)
  }
};
timer1(count)

/*

const remainingLabel = document.getElementById('remaining');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');

// streams
const interval$ = interval(1000)
  .pipe(mapTo(-1));

const pause$ = fromEvent(pauseButton, 'click')
  .pipe(mapTo(false));

const resume$ = fromEvent(resumeButton, 'click')
  .pipe(mapTo(true));

const timer$ = merge(pause$, resume$)
  .pipe(
    startWith(true),
    switchMap(val => (val ? interval$ : empty())),
    scan((acc, curr) => (curr ? curr + acc : acc), COUNTDOWN_SECONDS),
    takeWhile(v => v >= 0)
  )
  .subscribe((val) => (remainingLabel.innerHTML = val));
  
  */