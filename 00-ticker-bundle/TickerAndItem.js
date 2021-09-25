import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
// import TickerItem from './TickerItem.js';
import CoinServiceRx from '../CoinServiceRx.js'
const coinServiceRx = new CoinServiceRx();
ham.help()


// TickerItem
class TickerItem {
  constructor(data) {
    this.element = document.createElement('div');
    this.data = data;
    this._isActive = false;
    this.currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  }

  get isActive() {
    return this._isActive
  }
  set isActive(newValue) {
    this._isActive = newValue
  }

  render() {
    this.element.innerHTML = this.template()
    this.element.addEventListener('dataloaded', e => {
      this.tickerItems = e.detail.data.data;
      e.stopImmediatePropagation()
    });

    this.element.addEventListener('click', e => {
      this.activeItem = e.detail.target
      e.stopImmediatePropagation()
    });

    this.element.classList.add('ticker__item');
    return this.element
  }

  template() {
    return `
    <div class="marquee__item">
      <a class="marquee__item__currency-name--link" href="/price/${this.data.iso}/">
       <span class="marquee__item__currency-name--text">${this.data.iso}</span>
      </a>
      <div class="price-wrapper ${String(this.data.change.percent).startsWith('-') ? 'negative' : 'positive'}-price-change">
       <span class="marquee__item__text-container--price">${this.currencyFormatter.format(this.data.ohlc.c)}</span>
       <span class="marquee__item__text-container--percent">${this.data.change.percent.toFixed(2)}%</span>
      </div>
    </div>
  `;
  }
}

// Ticker
export default class {
  constructor(selector = '.ticker-wrap', coinData) {
    this.element = document.querySelector(selector).firstElementChild;
    this._data;
    this.data = coinData
    this._activeItem;
    this._tickerItems;
    this.element.addEventListener('dataloaded', this.handleDataLoaded.bind(this));
    // this.coinServiceRx = new CoinServiceRx();
    this.render();
  console.log('ticker data', this.data);
  }

  get data() {
    return this._data
  }
  set data(newValue) {
    this._data = Object.entries(newValue).reduce((acc, [key, value]) => [...acc, { ...value }], [])
    console.log('this._data', this._data);
  }

  get activeItem() {
    return this._activeItem
  }
  set activeItem(newValue) {
    this._activeItem = newValue
  }

  get tickerItems() {
    return this._tickerItems
  }
  set tickerItems(newValue) {
    this._tickerItems = newValue
  }

  render() {
    const parent = this.element.parentElement
    // this.element.parentElement.removeChild(this.element);
    // this.element.classList.remove('ticker');

    // ham.DOM.removeAllChildren(this.element)

    this.data.forEach((coin, i) => {
      this.element.appendChild(new TickerItem(coin).render())
    });

    this.element.addEventListener('click', e => {
      this.activeItem = e.detail.target
      e.stopImmediatePropagation()
    });

    parent.classList.toggle('ticker-wrapper')
    parent.appendChild(this.element);
    this.element.classList.add('ticker');
    parent.classList.toggle('ticker-wrapper')
    return this.element;
  }

  handleDataLoaded(e) {
    this.data = e.detail.data
  }

  template() {
    return `
 
      <div class="ticker" data-loaded=${true}></div>
    `;
  }
}