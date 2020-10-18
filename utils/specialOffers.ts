export enum CartItemType {
  Bread = 'Bread',
  Milk = 'Milk',
  Cheese = 'Cheese',
  Soup = 'Soup',
  Butter = 'Butter',
}

export type ICartItem = {
  type: CartItemType
  amount: number
  price: number
}

export type IDiscount = {
  discountedPrice: number
  amountSaved: number
}

const invalidateCartItems = (
  expectedCartItem: CartItemType,
  actualCartItem: CartItemType,
): boolean => expectedCartItem !== actualCartItem

const invalidatePositiveNumber = (n: number): boolean => n < 0

// TODO - could use Intl to convert to correct currency, but for MVP using toFixed(2) to get the 2dp for GBP pence.
const parseBackToCurrencyNumber = (n: number): number => parseFloat(n.toFixed(2))

const makeBuyOneGetOneFreeOffer = (expectedItemToDiscount: CartItemType) => (
  itemToDiscount: ICartItem,
): IDiscount => {
  if (invalidateCartItems(expectedItemToDiscount, itemToDiscount.type)) {
    throw new TypeError(
      `Invalid Arguments, expected items to discount are not the same: expectedItemToDiscount ${expectedItemToDiscount}; itemToDiscount ${itemToDiscount.type}`,
    )
  }

  const { amount, price: originalPrice } = itemToDiscount
  if (amount < 0 || originalPrice < 0) {
    throw new TypeError(
      `Invalid Arguments, amount and originalPrice must be a positive numbers. Amount: ${amount}; originalPrice: ${originalPrice}`,
    )
  }

  // Get number of pairs (we only apply discount on pairs)
  const numberOfPairs = Math.floor(amount / 2)

  const amountSaved = numberOfPairs * originalPrice
  const discountedPrice = parseBackToCurrencyNumber(amount * originalPrice - amountSaved)

  return { discountedPrice, amountSaved }
}

// Buy a cheese, get second cheese for free!
export const buyCheeseGetOneFreeOffer = makeBuyOneGetOneFreeOffer(CartItemType.Cheese)

// When you buy a soup, bread is half price (1 to 1)
const makeHalfPriceOffer = (
  expectedItemToPurchase: CartItemType,
  expectedItemToDiscount: CartItemType,
) => (itemToPurchase: ICartItem, itemToDiscount: ICartItem): IDiscount => {
  if (invalidateCartItems(expectedItemToPurchase, itemToPurchase.type)) {
    throw new TypeError(
      `Invalid Arguments, expected items to purchase are not the same: expectedItemToPurchase ${expectedItemToPurchase}; itemToPurchase ${itemToPurchase.type}`,
    )
  }

  if (invalidateCartItems(expectedItemToDiscount, itemToDiscount.type)) {
    throw new TypeError(
      `Invalid Arguments, expected items to discount: expectedItemToPurchase ${expectedItemToDiscount}; itemToDiscount ${itemToDiscount.type}`,
    )
  }

  if (
    invalidatePositiveNumber(itemToDiscount.price) ||
    invalidatePositiveNumber(itemToDiscount.amount)
  ) {
    throw new TypeError(
      `Invalid Arguments, discount item price or amount must be positive numbers. itemToDiscount.price ${itemToDiscount.price}; itemToDiscount.amount ${itemToDiscount.amount}`,
    )
  }

  if (
    invalidatePositiveNumber(itemToPurchase.price) ||
    invalidatePositiveNumber(itemToPurchase.amount)
  ) {
    throw new TypeError(
      `Invalid Arguments, purchase item price or amount must be positive numbers. itemToPurchase.price ${itemToPurchase.price}; itemToPurchase.amount ${itemToPurchase.amount}`,
    )
  }

  const numberOfItemsToDiscount = Math.min(itemToPurchase.amount, itemToDiscount.amount)

  const totalPrice = itemToDiscount.price * itemToDiscount.amount

  // 1/2 price off - round to 2dp (coins)
  const discountedItemsPrice =
    parseBackToCurrencyNumber(itemToDiscount.price / 2) * numberOfItemsToDiscount

  // items that were not discounted
  const nonDiscountedItemsPrice =
    itemToDiscount.price * (itemToDiscount.amount - numberOfItemsToDiscount)

  const discountedPrice = parseBackToCurrencyNumber(discountedItemsPrice + nonDiscountedItemsPrice)
  const amountSaved = parseBackToCurrencyNumber(totalPrice - discountedPrice)

  return { discountedPrice, amountSaved }
}

export const buySoupHalfPriceBreadOffer = makeHalfPriceOffer(CartItemType.Soup, CartItemType.Bread)

const makeOneThirdOffOffer = (expectedItemToDiscount: CartItemType) => (
  itemToDiscount: ICartItem,
): IDiscount => {
  if (invalidateCartItems(expectedItemToDiscount, itemToDiscount.type)) {
    throw new TypeError(
      `Invalid Arguments, expected items to discount are not the same: expectedItemToDiscount ${expectedItemToDiscount}; itemToDiscount ${itemToDiscount.type}`,
    )
  }

  const { amount, price: originalPrice } = itemToDiscount
  if (
    invalidatePositiveNumber(itemToDiscount.amount) ||
    invalidatePositiveNumber(itemToDiscount.price)
  ) {
    throw new TypeError(
      `Invalid Arguments, amount and price must be a positive numbers. Amount: ${amount}; price: ${originalPrice}`,
    )
  }

  const amountSaved = parseBackToCurrencyNumber(originalPrice / 3) * amount
  const discountedPrice = parseBackToCurrencyNumber(amount * originalPrice - amountSaved)

  return { discountedPrice, amountSaved }
}

export const oneThirdOffButterOffer = makeOneThirdOffOffer(CartItemType.Butter)
