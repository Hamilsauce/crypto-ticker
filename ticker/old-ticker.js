// TickerItem

export default class {
  constructor(coinData) {
    this.priceTrend = coinData.priceTrend || ''; // or - or +
    this.currencyName  = coinData.currencyName || ''; ; //btc
    this.priceMovementPercent = coinData.priceMovementPercent || ''; ; // % change
  }
  
  render() {
    return this.template();
  }
  
  
  template() {
    return `
      <div class="ticker__item">
       <div class="marquee__item ${this.priceChangeSentiment}-price-change">
         <a class="marquee__item__currency-name--link" href="/price/${this.currencyName}/">
           <span class="marquee__item__currency-name--text">Bitcoin</span></a>
         <div class="price-wrapper">
           <span class="marquee__item__text-container--price">${this.currentPrice}</span>
           <span class="marquee__item__text-container--percent">${this.priceMovement}</span>
         </div>
       </div>
      </div>
    `;
    
  }
}