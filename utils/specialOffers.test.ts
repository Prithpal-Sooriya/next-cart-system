import {
  BUTTER_SPECIAL_OFFER,
  buyCheeseGetOneFreeOffer,
  buySoupHalfPriceBreadOffer,
  CartItemType,
  CHEESE_SPECIAL_OFFER,
  ICartItem,
  oneThirdOffButterOffer,
  SOUP_SPECIAL_OFFER,
} from './specialOffers'

const itemPrice = 1.0

const soupCartItem: ICartItem = {
  amount: 1,
  price: 1.0,
  type: CartItemType.Soup,
}

const breadCartItem: ICartItem = {
  amount: 1,
  price: 1.0,
  type: CartItemType.Bread,
}

const cheeseCartItem: ICartItem = {
  amount: 1,
  price: 1.0,
  type: CartItemType.Cheese,
}

const butterCartItem: ICartItem = {
  amount: 1,
  price: 1.0,
  type: CartItemType.Butter,
}

describe('specialOffers - Cheese BOGOF tests', () => {
  const buildCheeseItem = (amount: number, price: number) => ({ ...cheeseCartItem, amount, price })
  it('throws error when cart item provided is not correct', () => {
    const callWithInvalidItemTypeFn = () =>
      buyCheeseGetOneFreeOffer({ ...cheeseCartItem, type: CartItemType.Bread })
    expect(callWithInvalidItemTypeFn).toThrow(TypeError)
  })
  it('throws error when price or amount are negative', () => {
    const itemAmount = 2
    const negativeItemPrice = -1
    const callWithInvalidItemPriceFn = () =>
      buyCheeseGetOneFreeOffer(buildCheeseItem(itemAmount, negativeItemPrice))
    expect(callWithInvalidItemPriceFn).toThrow(TypeError)

    const negativeItemAmount = -1
    const callWithInvalidItemAmountFn2 = () =>
      buyCheeseGetOneFreeOffer(buildCheeseItem(negativeItemAmount, itemPrice))
    expect(callWithInvalidItemAmountFn2).toThrow(TypeError)
  })
  it('returns the correct special offer name', () => {
    const expectedName = CHEESE_SPECIAL_OFFER
    const { discountName } = buyCheeseGetOneFreeOffer(cheeseCartItem)
    expect(discountName).toEqual(expectedName)
  })
  it('is not applied to 1 item', () => {
    const itemAmount = 1

    const { amountSaved, discountedPrice } = buyCheeseGetOneFreeOffer(
      buildCheeseItem(itemAmount, itemPrice),
    )
    expect(amountSaved).toBe(0)
    expect(discountedPrice).toBe(itemPrice)
  })
  it('is applied to 2 items, paying for 1 item, 1 item free', () => {
    const itemAmount = 2

    const { amountSaved, discountedPrice } = buyCheeseGetOneFreeOffer(
      buildCheeseItem(itemAmount, itemPrice),
    )
    expect(amountSaved).toBe(itemPrice * 1)
    expect(discountedPrice).toBe(itemPrice * 1)
  })
  // Scenario Test
  it('is applied to 3 items, paying for 2 items, 1 items free', () => {
    const itemAmount = 3

    const { amountSaved, discountedPrice } = buyCheeseGetOneFreeOffer(
      buildCheeseItem(itemAmount, itemPrice),
    )
    expect(amountSaved).toBe(itemPrice * 1)
    expect(discountedPrice).toBe(itemPrice * 2)
  })
  // Scenario Test
  it('is applied to 4 items, paying for 2 items, 2 items free', () => {
    const itemAmount = 4

    const { amountSaved, discountedPrice } = buyCheeseGetOneFreeOffer(
      buildCheeseItem(itemAmount, itemPrice),
    )
    expect(amountSaved).toBe(itemPrice * 2)
    expect(discountedPrice).toBe(itemPrice * 2)
  })
  it('is applied to 0 items, no savings applied', () => {
    const itemAmount = 0

    const { amountSaved, discountedPrice } = buyCheeseGetOneFreeOffer(
      buildCheeseItem(itemAmount, itemPrice),
    )
    expect(amountSaved).toBe(0)
    expect(discountedPrice).toBe(0)
  })
  it('is applied to 2 items where price is 0, no savings applied', () => {
    const itemAmount = 2
    const newItemPrice = 0

    const { amountSaved, discountedPrice } = buyCheeseGetOneFreeOffer(
      buildCheeseItem(itemAmount, newItemPrice),
    )
    expect(amountSaved).toBe(0)
    expect(discountedPrice).toBe(0)
  })
})

describe('specialOffers - Buy Soup and get bread 1/2 price', () => {
  const buildSoupAmount = (amount: number) => ({ ...soupCartItem, amount })
  const buildBreadAmount = (amount: number) => ({ ...breadCartItem, amount })
  it('throws error if item to purchase or item to discount are not correct', () => {
    const callWithInvalidPurchaseItem = () =>
      buySoupHalfPriceBreadOffer({ ...soupCartItem, type: CartItemType.Butter }, breadCartItem)
    expect(callWithInvalidPurchaseItem).toThrow(TypeError)

    const callWithInvalidDiscountItem = () =>
      buySoupHalfPriceBreadOffer(soupCartItem, { ...breadCartItem, type: CartItemType.Butter })
    expect(callWithInvalidDiscountItem).toThrow(TypeError)
  })
  it('throws error if items provided use negative numbers', () => {
    const callWithInvalidPurchaseItemPrice = () =>
      buySoupHalfPriceBreadOffer({ ...soupCartItem, price: -1 }, breadCartItem)

    const callWithInvalidPurchaseItemAmount = () =>
      buySoupHalfPriceBreadOffer({ ...soupCartItem, amount: -1 }, breadCartItem)

    const callWithInvalidDiscountItemPrice = () =>
      buySoupHalfPriceBreadOffer(soupCartItem, { ...breadCartItem, price: -1 })

    const callWithInvalidDiscountItemAmount = () =>
      buySoupHalfPriceBreadOffer(soupCartItem, { ...breadCartItem, amount: -1 })

    expect(callWithInvalidPurchaseItemPrice).toThrow(TypeError)
    expect(callWithInvalidPurchaseItemAmount).toThrow(TypeError)
    expect(callWithInvalidDiscountItemPrice).toThrow(TypeError)
    expect(callWithInvalidDiscountItemAmount).toThrow(TypeError)
  })
  it('returns the correct special offer name', () => {
    const expectedName = SOUP_SPECIAL_OFFER
    const { discountName } = buySoupHalfPriceBreadOffer(soupCartItem, breadCartItem)
    expect(discountName).toEqual(expectedName)
  })
  it('produces 0 discount it has soup but no bread', () => {
    const soupAmount = 1
    const breadAmount = 0
    const { amountSaved, discountedPrice } = buySoupHalfPriceBreadOffer(
      buildSoupAmount(soupAmount),
      buildBreadAmount(breadAmount),
    )

    const expectedAmountSaved = 0
    const expectedDiscountedPrice = 0
    expect(amountSaved).toBe(expectedAmountSaved)
    expect(discountedPrice).toBe(expectedDiscountedPrice)
  })
  it('produces 0 discount if no soup but has bread', () => {
    const soupAmount = 0
    const breadAmount = 1
    const { amountSaved, discountedPrice } = buySoupHalfPriceBreadOffer(
      buildSoupAmount(soupAmount),
      buildBreadAmount(breadAmount),
    )

    const expectedAmountSaved = 0
    const expectedDiscountedPrice = 1.0 // bread price (1) * amount (1)
    expect(amountSaved).toBe(expectedAmountSaved)
    expect(discountedPrice).toBe(expectedDiscountedPrice)
  })
  it('produces a discount on all bread items when equal number of bread and soup items', () => {
    let soupAmount = 1
    let breadAmount = 1
    const { amountSaved, discountedPrice } = buySoupHalfPriceBreadOffer(
      buildSoupAmount(soupAmount),
      buildBreadAmount(breadAmount),
    )

    const expectedAmountSaved = 0.5 // bread price (1/2) * amount
    const expectedDiscountedPrice = 0.5 // discount (0.5) + remainder not discounted (0)
    expect(amountSaved).toBe(expectedAmountSaved)
    expect(discountedPrice).toBe(expectedDiscountedPrice)

    soupAmount = 2
    breadAmount = 2
    const {
      amountSaved: amountSavedWithTwoBread,
      discountedPrice: discountedPriceWithTwoBread,
    } = buySoupHalfPriceBreadOffer(buildSoupAmount(soupAmount), buildBreadAmount(breadAmount))
    expect(amountSavedWithTwoBread).toBe((breadCartItem.price * breadAmount) / 2)
    expect(discountedPriceWithTwoBread).toBe((breadCartItem.price * breadAmount) / 2)
  })
  // Scenario Test
  it('only discounts the same number of soups and breads (1 soup = 1 bread that is discounted)', () => {
    const soupAmount = 1
    const breadAmount = 2
    const { amountSaved, discountedPrice } = buySoupHalfPriceBreadOffer(
      buildSoupAmount(soupAmount),
      buildBreadAmount(breadAmount),
    )

    const expectedAmountSaved = 0.5 // bread price (1/2) * amount can be discounted (1)
    const expectedDiscountedPrice = 1.5 // discount (0.5) + remainder not discounted (1 * price (1))
    expect(amountSaved).toBe(expectedAmountSaved)
    expect(discountedPrice).toBe(expectedDiscountedPrice)
  })
  it('all bread items are discounted where there are more soups than bread', () => {
    const soupAmount = 3
    const breadAmount = 2
    const { amountSaved, discountedPrice } = buySoupHalfPriceBreadOffer(
      buildSoupAmount(soupAmount),
      buildBreadAmount(breadAmount),
    )

    const expectedAmountSaved = 1 // bread price (1/2) * amount can be discounted (2)
    const expectedDiscountedPrice = 1 // discount (1) + remainder not discounted (0)
    expect(amountSaved).toBe(expectedAmountSaved)
    expect(discountedPrice).toBe(expectedDiscountedPrice)
  })
})

describe('specialOffers - One Third off butter', () => {
  const buildButterCartItem = (amount: number, price: number) => ({
    ...butterCartItem,
    amount,
    price,
  })

  it('throws error if the cart item type is invalid (I cant believe its not butter)', () => {
    const callWithInvalidItemType = () =>
      oneThirdOffButterOffer({ ...butterCartItem, type: CartItemType.Bread })
    expect(callWithInvalidItemType).toThrow(TypeError)
  })
  it('throws error if the amount or price is negative', () => {
    const callWithInvalidAmount = () => oneThirdOffButterOffer({ ...butterCartItem, amount: -1 })
    const callWithInvalidPrice = () => oneThirdOffButterOffer({ ...butterCartItem, price: -1 })
    expect(callWithInvalidAmount).toThrow(TypeError)
    expect(callWithInvalidPrice).toThrow(TypeError)
  })
  it('returns the correct special offer name', () => {
    const expectedName = BUTTER_SPECIAL_OFFER
    const { discountName } = oneThirdOffButterOffer(butterCartItem)
    expect(discountName).toEqual(expectedName)
  })
  it('produces 0 discount if the amount is 0, or price is 0', () => {
    let amount = 0
    let price = 1

    const { amountSaved, discountedPrice } = oneThirdOffButterOffer(
      buildButterCartItem(amount, price),
    )
    expect(amountSaved).toBe(0)
    expect(discountedPrice).toBe(0)

    amount = 1
    price = 0
    const { amountSaved: amountSaved2, discountedPrice: discountedPrice2 } = oneThirdOffButterOffer(
      buildButterCartItem(amount, price),
    )
    expect(amountSaved2).toBe(0)
    expect(discountedPrice2).toBe(0)
  })
  it('is 1/3 off price when given 1 item', () => {
    const amount = 1
    const price = 1.2
    const { amountSaved, discountedPrice } = oneThirdOffButterOffer(
      buildButterCartItem(amount, price),
    )

    const expectedAmountSaved = 0.4 // 1/3 price (1.20) * amount (1) = 0.4
    const expectedDiscountedPrice = 0.8 // orig price (1.20) * amount (1) - amount saved (0.4)
    expect(amountSaved).toBe(expectedAmountSaved)
    expect(discountedPrice).toBe(expectedDiscountedPrice)
  })
  it('is 1/3 off price when given 2 items', () => {
    const amount = 2
    const price = 1.2
    const { amountSaved, discountedPrice } = oneThirdOffButterOffer(
      buildButterCartItem(amount, price),
    )

    const expectedAmountSaved = 0.8 // 1/3 price (1.20) * amount (2) = 0.8
    const expectedDiscountedPrice = 1.6 // orig price (1.20) * amount (2) - amount saved (0.8)
    expect(amountSaved).toBe(expectedAmountSaved)
    expect(discountedPrice).toBe(expectedDiscountedPrice)
  })
})
