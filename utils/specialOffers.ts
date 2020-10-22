export enum CartItemType {
  Bread = '#Bread#',
  Milk = '#Milk#',
  Cheese = '#Cheese#',
  Soup = '#Soup#',
  Butter = '#Butter#',
}

export type ICartItem = {
  readonly type: CartItemType
  readonly price: number
  amount: number
}

export type IDiscount = {
  discountedPrice: number
  amountSaved: number
  discountName: string
}

export const CHEESE_SPECIAL_OFFER = `Buy a cheese, get second cheese for free!`
export const SOUP_SPECIAL_OFFER = `Buy a soup, get a half price bread!`
export const BUTTER_SPECIAL_OFFER = `Get 1/3 off Butter!`

export function getSpecialOfferName(type: CartItemType): string {
  if (type === CartItemType.Cheese) {
    return CHEESE_SPECIAL_OFFER
  }

  if (type === CartItemType.Soup) {
    return SOUP_SPECIAL_OFFER
  }

  if (type === CartItemType.Butter) {
    return BUTTER_SPECIAL_OFFER
  }

  return ''
}

export function getCartItemName(type: CartItemType): string {
  switch (type) {
    case CartItemType.Bread:
      return 'Bread'
    case CartItemType.Milk:
      return 'Milk'
    case CartItemType.Cheese:
      return 'Cheese'
    case CartItemType.Soup:
      return 'Soup'
    case CartItemType.Butter:
      return 'Butter'
    default:
      return ''
  }
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

  return { discountedPrice, amountSaved, discountName: getSpecialOfferName(expectedItemToDiscount) }
}

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

  return { discountedPrice, amountSaved, discountName: getSpecialOfferName(expectedItemToPurchase) }
}

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

  return { discountedPrice, amountSaved, discountName: getSpecialOfferName(expectedItemToDiscount) }
}

export const buyCheeseGetOneFreeOffer = makeBuyOneGetOneFreeOffer(CartItemType.Cheese)

export const buySoupHalfPriceBreadOffer = makeHalfPriceOffer(CartItemType.Soup, CartItemType.Bread)

export const oneThirdOffButterOffer = makeOneThirdOffOffer(CartItemType.Butter)
