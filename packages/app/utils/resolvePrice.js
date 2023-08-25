import { numberWithCommas } from './index';

/**
 * This function takes in two parameters, a currency object and a price (defaults to 1 if no price is provided).
 * It then uses a switch statement to determine the currency name and returns the currency symbol plus the price in local currency
 * If no currency is provided, it will return the price with a '$' symbol.
 *
 * @param { object } currency - usercurrency object
 * @param { number } price - value to covert
 *
 * @returns { string } - currency symbol + priceInLocalCurrency
 */
export function resolvePriceInLocalCurrency(currency, price) {
  switch (currency.name) {
    case 'NGN':
      return price <= 0
        ? `${currency.symbol}0.00`
        : `${currency.symbol}${numberWithCommas(
            currency.rateInfo.rateFromUsdToNaira.rate * price
          )}`;
    case 'GBP':
      return price <= 0
        ? `${currency.symbol}0.00`
        : `${currency.symbol}${numberWithCommas(currency.rateInfo.rateFromUSDToGBP.rate * price)}`;
    default:
      return price <= 0 ? `$0.00` : `$${numberWithCommas(price)}`;
  }
}

export function resolvePrice(currencyName, price) {
  switch (currencyName) {
    case 'NGN':
      return price <= 0 ? `₦0.00` : `₦${numberWithCommas(price)}`;
    case 'GBP':
      return price <= 0 ? `£0.00` : `£${numberWithCommas(price)}`;
    default:
      return price <= 0 ? `$0.00` : `$${numberWithCommas(price)}`;
  }
}

export function resolveProcessorFee(currencyName = 'NGN', rateInfo, processorFee) {
  switch (currencyName) {
    case 'NGN':
      return processorFee;
    case 'GBP':
      return processorFee / rateInfo?.rateFromGBPToNaira?.rate;
    default:
      return processorFee / rateInfo?.rateFromUsdToNaira?.rate;
  }
}
