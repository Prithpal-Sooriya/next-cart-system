import { CartItemType } from '../utils/specialOffers'
import { setCartItemAmount, shoppingCartReducer, buildInitialContext } from './ShoppingCartContext'

describe('Reducer Tests', () => {
  it('updates the amount for the cart item given', () => {
    const initialState = buildInitialContext()
    const cartItemUsed: CartItemType = CartItemType.Bread

    const expectedCartItemAmount = 2
    const action = setCartItemAmount(cartItemUsed, 2)
    const { cartItems } = shoppingCartReducer(initialState, action)
    const actualCartItem = cartItems.get(cartItemUsed)

    expect(expectedCartItemAmount).toStrictEqual(actualCartItem?.amount)
    expect(initialState.cartItems.get(cartItemUsed)?.type).toStrictEqual(actualCartItem?.type)
    expect(initialState.cartItems.get(cartItemUsed)?.price).toStrictEqual(actualCartItem?.price)
  })
})
