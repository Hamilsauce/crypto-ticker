import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { map } = rxjs.operators;
const { help  } = ham;
// help.help()
// TickerItem
class TickerItem {
  constructor(data) {
    this.data = data;
    this.currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    this._isActive = false;

    this.element = ham.DOM.newElement('div', {
      classList: ['ticker__item']
    }, [], this.template());
    
    this.element.addEventListener('click', this.handleClick.bind(this))
  }

  get isActive() { return this._isActive }
  set isActive(newValue) { this._isActive = newValue }

  handleClick(e) {
    // this.t = e.target
    // e.currentTarget.style.position = 'absolute'
    // console.log('te.detail.target', this)
    // e.stopImmediatePropagation()
    // });
    // this.element.classList.add('ticker__item');
    // return this.element
  }

  templater(strings, ...tags) {
    return strings.reduce((output, str, i) => {
      return [...output, str, tags[i]].join('')
    }, '')
  }

  template() {
    return this.templater `
      <div class="marquee__item">
        <a class="marquee__item__currency-name--link" href="https://www.coindesk.com/price/${this.data.slug}/">
         <span class="marquee__item__currency-name--text">${this.data.iso}</span>
        </a>
        <div class="price-wrapper ${String(this.data.change.percent).startsWith('-') ? 'negative' : 'positive'}-price-change">
         <span class="marquee__item__text-container--price">${this.currencyFormatter.format(this.data.ohlc.c)}</span>
         <span class="marquee__item__text-container--percent">${this.data.change.percent.toFixed(2)}%</span>
        </div>
      </div>`;
  }
}

// Ticker
class Ticker {
  constructor(selector = '.ticker-wrap', coinData) {
    this.element = document.querySelector(selector).firstElementChild;
    this._data;
    this.data = coinData
    this._activeItem;
    this._tickerItems;

    this.render();
    this.element.classList.add('animate')
  }

  get data() { return this._data }
  set data(newValue) { this._data = ham.arrayFromObjectProperties(newValue) }

  get activeItem() { return this._activeItem }
  set activeItem(newValue) { this._activeItem = newValue }

  get tickerItems() { return this._tickerItems }
  set tickerItems(newValue) { this._tickerItems = newValue }

  render() {

    const wrapper = this.element.parentElement
    ham.DOM.removeAllChildren(this.element)
    this.data.forEach(coin => {
      this.element.appendChild(new TickerItem(coin).element)
    });

    this.element.addEventListener('click', e => {
      this.element.classList.toggle('animate')
      this.activeItem = e.detail.target
      // e.stopImmediatePropagation()
    console.log('    this.element.classList.ad', this.element)
    });
    return this.element;
  }
}

export default (data$) => { return data$.pipe(map(data => new Ticker('.ticker-wrap', data))) }
