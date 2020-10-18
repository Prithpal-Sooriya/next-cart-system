import styles from './CartItem.module.css'
import Counter from '../counter/Counter'
import { useState } from 'react'

type ICartItemLabel = {
  title: string
  specialOffer?: string
}

type ICartItemPrice = {
  price: number
}

type ICartItem = {
  title: string
  specialOffer?: string
  itemPrice: number
}

export const CartItem: React.FC<ICartItem> = ({ title, specialOffer, itemPrice }) => {
  const [numberOfItems, setNumberOfItems] = useState(0)
  const totalPrice = numberOfItems * itemPrice
  return (
    <div className={styles.cartItemContainer}>
      <CartItem__Label {...{ title, specialOffer }} />
      <Counter value={numberOfItems} onChange={setNumberOfItems} />
      <CartItem__Price price={totalPrice} />
    </div>
  )
}

export const CartItem__Label: React.FC<ICartItemLabel> = ({ title, specialOffer }) => (
  <div>
    <span className={styles.cartItemTitle}>{title}</span>
    <span className={styles.cartItemSubTitle}>{specialOffer}</span>
  </div>
)

export const CartItem__Price: React.FC<ICartItemPrice> = ({ price }) => (
  <div className={styles.cartItemPrice}>
    <sup className={styles.cartItemPrice__CurrencyIcon}>£</sup>
    <span>{price.toFixed(2)}</span>
  </div>
)

export default CartItem
