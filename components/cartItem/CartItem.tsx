import styles from './CartItem.module.css'
import { Counter } from '../counter/Counter'
import { useCartItemAmountState, useShoppingCartItem } from '../../context/ShoppingCartContext'
import {
  CartItemType,
  getCartItemName,
  getSpecialOfferName,
  ICartItem,
} from '../../utils/specialOffers'

type ICartItemLabelProps = {
  title: string
  specialOffer?: string
}

type ICartItemPriceProps = {
  price: number
}

export type ICartItemProps = {
  title: string
  specialOffer?: string
  itemPrice: number
  amount: number
  setAmount: (a: number) => void
}

export type IConnectedCartItemProps = {
  type: CartItemType
}

export default function ConnectedCartItem({ type }: IConnectedCartItemProps): JSX.Element | null {
  const cartItem: ICartItem | undefined = useShoppingCartItem(type)
  const [, setAmount] = useCartItemAmountState(type)

  if (cartItem === undefined) {
    return null
  }

  return (
    <CartItem
      title={getCartItemName(cartItem.type)}
      specialOffer={getSpecialOfferName(cartItem.type)}
      itemPrice={cartItem.price}
      amount={cartItem.amount}
      setAmount={setAmount}
    />
  )
}

export const CartItem: React.FC<ICartItemProps> = ({
  title,
  specialOffer,
  itemPrice,
  amount,
  setAmount,
}) => {
  const totalPrice = amount * itemPrice
  return (
    <div className={styles.cartItemContainer} data-testid="cartItemContainer">
      <CartItem__Label {...{ title, specialOffer }} />
      <Counter value={amount} onChange={setAmount} />
      <CartItem__Price price={totalPrice} />
    </div>
  )
}

export const CartItem__Label: React.FC<ICartItemLabelProps> = ({ title, specialOffer }) => (
  <div className={styles.cartItemTitleContainer}>
    <span className={styles.cartItemTitle} data-testid="cartItemTitle">
      {title}
    </span>
    <span className={styles.cartItemSubTitle} data-testid="cartItemSubTitle">
      {specialOffer}
    </span>
  </div>
)

export const CartItem__Price: React.FC<ICartItemPriceProps> = ({ price }) => (
  <div className={styles.cartItemPrice} data-testid="cartItemPrice">
    <sup className={styles.cartItemPrice__CurrencyIcon}>£</sup>
    <span data-testid="price">{price.toFixed(2)}</span>
  </div>
)
