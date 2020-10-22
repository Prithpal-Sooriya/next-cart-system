import styles from './Receipt.module.css'
import {
  buyCheeseGetOneFreeOffer,
  buySoupHalfPriceBreadOffer,
  CartItemType,
  getCartItemName,
  ICartItem,
  IDiscount,
  oneThirdOffButterOffer,
} from '../../utils/specialOffers'
import { useShoppingCartState } from '../../context/ShoppingCartContext'

type IRecieptContainerProps = {
  className?: string
}

type IRecieptListItem = {
  name?: string
  price: number
}

type IRecieptListProps = {
  className?: string
  items: ReadonlyArray<IRecieptListItem>
}

type IRecieptListSubTotalAndDiscountsProps = {
  subTotal: number
  discounts?: ReadonlyArray<Pick<IDiscount, 'discountName' | 'amountSaved'>>
}

type IReceiptFinalAmountProps = {
  finalAmount: number
}

function combineClassNames(...classnames: Array<string | undefined>): string {
  return classnames.filter(Boolean).join(' ')
}

function isDefined<T>(t?: T): t is T {
  return t !== undefined
}

const filterInvalidBasketItems = (basketItem: ICartItem): boolean => basketItem.amount > 0

const calculateCartItemTotalPrice = ({
  amount,
  price,
}: Pick<ICartItem, 'amount' | 'price'>): number => amount * price

const calculateSubTotal = (arr: ReadonlyArray<number>): number =>
  arr.reduce((subTotal, itemAmount) => subTotal + itemAmount, 0)

const calculateFinalAmount = (subTotal: number, discounts: Array<number>): number =>
  Math.max(
    0,
    discounts.reduce((remainder, discount) => remainder - discount, subTotal),
  )

const toValidCurrency = (n: number): string => (n < 0 ? '- ' : '') + `£${Math.abs(n).toFixed(2)}`

const useDiscounts = (): ReadonlyArray<IDiscount> => {
  const { cartItems } = useShoppingCartState()
  const cheeseItem = cartItems.get(CartItemType.Cheese)
  const soupItem = cartItems.get(CartItemType.Soup)
  const breadItem = cartItems.get(CartItemType.Bread)
  const butterItem = cartItems.get(CartItemType.Butter)
  return [
    cheeseItem && buyCheeseGetOneFreeOffer(cheeseItem),
    soupItem && breadItem && buySoupHalfPriceBreadOffer(soupItem, breadItem),
    butterItem && oneThirdOffButterOffer(butterItem),
  ]
    .filter(isDefined)
    .filter((d) => d.amountSaved > 0)
}

const useFilteredCartItems = (): ReadonlyArray<ICartItem> => {
  const { cartItems } = useShoppingCartState()

  return Array.from(cartItems.values()).filter(filterInvalidBasketItems)
}

export const Receipt: React.FC = () => {
  const filteredCartItems: ReadonlyArray<ICartItem> = useFilteredCartItems()
  const discounts: ReadonlyArray<IDiscount> = useDiscounts()

  const basketItemsList: ReadonlyArray<IRecieptListItem> = filteredCartItems.map((b) => ({
    name: `${getCartItemName(b.type)} x${b.amount}`,
    price: calculateCartItemTotalPrice(b),
  }))

  const subTotal = calculateSubTotal(basketItemsList.map((b) => b.price))

  const finalAmount = calculateFinalAmount(
    subTotal,
    discounts.map((d) => d.amountSaved),
  )

  return (
    <Receipt__Container>
      <Receipt__List items={basketItemsList} />
      <hr />
      <Receipt__SubTotalAndDiscounts subTotal={subTotal} discounts={discounts} />
      <hr />
      <Receipt_FinalAmount finalAmount={finalAmount} />
    </Receipt__Container>
  )
}

export const Receipt__Container: React.FC<IRecieptContainerProps> = ({ className, children }) => (
  <div className={combineClassNames(className, styles.receiptContainer)}>
    <h2 className={styles.receiptHeader}>Receipt</h2>
    <div>{children}</div>
  </div>
)

export const Receipt__List: React.FC<IRecieptListProps> = ({ className, items }) => (
  <ul className={combineClassNames(className, styles.receiptListContainer)}>
    {items.map(({ name = '', price }, idx) => (
      <li key={idx} className={styles.receiptListItem}>
        <span className={styles.receiptListItemName}>{name}</span>
        <span className={styles.receiptListItemPrice}>{toValidCurrency(price)}</span>
      </li>
    ))}
  </ul>
)

export const Receipt__SubTotalAndDiscounts: React.FC<IRecieptListSubTotalAndDiscountsProps> = ({
  subTotal,
  discounts = [],
}) => {
  const subTotalStrikeThroughClassName =
    discounts.length > 0 ? styles['receiptListContainer--subtotalWithDiscounts'] : ''

  const subTotalItem: IRecieptListItem = { name: 'Sub Total:', price: subTotal }
  const discountItems: ReadonlyArray<IRecieptListItem> = discounts.map((d) => ({
    name: d.discountName,
    price: -d.amountSaved,
  }))
  return (
    <Receipt__List
      items={[subTotalItem, ...discountItems]}
      className={subTotalStrikeThroughClassName}
    />
  )
}

export const Receipt_FinalAmount: React.FC<IReceiptFinalAmountProps> = ({ finalAmount }) => (
  <Receipt__List
    items={[{ name: `Final:`, price: finalAmount }]}
    className={styles['receiptListContainer--finalAmount']}
  />
)

export default Receipt
