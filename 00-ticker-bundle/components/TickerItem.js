// TickerItem

export default class {
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