import { createContext, useCallback, useContext, useReducer } from 'react'
import { CartItemType, ICartItem } from '../utils/specialOffers'

type IShoppingCartStateContext = {
  cartItems: ReadonlyMap<CartItemType, ICartItem>
}

type IShoppingCartActions = ReturnType<typeof setCartItemAmount>

type IShoppingCartDispatchContext = (action: IShoppingCartActions) => void

/* State Setup */
export function buildInitialContext(): IShoppingCartStateContext {
  const initialCartItems = new Map<CartItemType, ICartItem>()
  const uniqueProps: Array<Pick<ICartItem, 'type' | 'price'>> = [
    { type: CartItemType.Bread, price: 1.1 },
    { type: CartItemType.Milk, price: 0.5 },
    { type: CartItemType.Cheese, price: 0.9 },
    { type: CartItemType.Soup, price: 0.6 },
    { type: CartItemType.Butter, price: 1.2 },
  ]

  uniqueProps.forEach((p) => initialCartItems.set(p.type, { ...p, amount: 0 }))

  return {
    cartItems: initialCartItems,
  }
}

const initialCartItemContext: IShoppingCartStateContext = buildInitialContext()

/* Reducer Setup & Action Creators */
const SET_CART_ITEM_AMOUNT = '[SHOPPING_CART_CONTEXT] - SET_CART_ITEM_AMOUNT'

export const setCartItemAmount = (key: CartItemType, amount: number) =>
  ({
    type: SET_CART_ITEM_AMOUNT,
    key,
    amount,
  } as const)

function processSetCartItemAmount(
  state: IShoppingCartStateContext,
  key: CartItemType,
  amount: number,
): IShoppingCartStateContext {
  const updatedCartItems = new Map(state.cartItems)
  const cartItem: ICartItem | undefined = updatedCartItems.get(key)
  if (cartItem !== undefined) {
    updatedCartItems.set(key, { ...cartItem, amount })
  }
  return { ...state, cartItems: updatedCartItems }
}

export function shoppingCartReducer(
  state: IShoppingCartStateContext,
  action: IShoppingCartActions,
): IShoppingCartStateContext {
  switch (action.type) {
    case SET_CART_ITEM_AMOUNT:
      return processSetCartItemAmount(state, action.key, action.amount)
    default:
      return state
  }
}

/* Context Setup */
// Kent C Dodds separation of State & Dispatch (better flexibility when building more advanced hooks)
const ShoppingCartStateContext = createContext<IShoppingCartStateContext | undefined>(undefined)
const ShoppingCartDispatchContext = createContext<IShoppingCartDispatchContext | undefined>(
  undefined,
)

function assertDispatch(
  dispatch: IShoppingCartDispatchContext | undefined,
): asserts dispatch is IShoppingCartDispatchContext {
  if (dispatch === undefined) {
    throw new Error(`ShoppingCartDispatchContext must be used within a ShoppingCartProvider`)
  }
}

function assertState(
  state: IShoppingCartStateContext | undefined,
): asserts state is IShoppingCartStateContext {
  if (state === undefined) {
    throw new Error(`IShoppingCartStateContext must be used within a ShoppingCartProvider`)
  }
}

const ShoppingCartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingCartReducer, initialCartItemContext)
  return (
    <ShoppingCartStateContext.Provider value={state}>
      <ShoppingCartDispatchContext.Provider value={dispatch}>
        {children}
      </ShoppingCartDispatchContext.Provider>
    </ShoppingCartStateContext.Provider>
  )
}

/* Hooks */

export function useShoppingCartState(): IShoppingCartStateContext {
  const state: IShoppingCartStateContext | undefined = useContext(ShoppingCartStateContext)
  assertState(state)

  return state
}

export function useShoppingCartDispatch(): IShoppingCartDispatchContext {
  const dispatch: IShoppingCartDispatchContext | undefined = useContext(ShoppingCartDispatchContext)
  assertDispatch(dispatch)

  return dispatch
}

export function useShoppingCartItem(key: CartItemType): ICartItem | undefined {
  const state = useShoppingCartState()

  return state.cartItems.get(key)
}

export function useCartItemAmountState(
  key: CartItemType,
): readonly [number | undefined, (amount: number) => void] {
  const state = useShoppingCartState()
  const dispatch = useShoppingCartDispatch()

  const cartItem = state.cartItems.get(key)
  const onChange = useCallback(
    (amount: number) => {
      dispatch(setCartItemAmount(key, amount))
    },
    [dispatch, key],
  )

  return [cartItem?.amount, onChange] as const
}

export default ShoppingCartProvider
