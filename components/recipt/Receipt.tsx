import styles from './Receipt.module.css'

type IRecieptContainer = {
  className?: string
}

type IRecieptList = {
  className?: string
  items: Array<string>
}

type IRecieptListSubTotalAndDiscounts = {
  subTotal: string
  discounts?: Array<string>
}

type IReceiptFnalAmount = {
  finalAmount: string
}

type IBasketItem = {
  type: string
  amount: number
  price: number
}

type ISpecialOffer = {
  name: string
  overallDiscount: number
}

type IReceipt = {
  basketItems: Array<IBasketItem>
  specialOffers: Array<ISpecialOffer>
}

function combineClassNames(...classnames: Array<string | undefined>): string {
  return classnames.filter(Boolean).join(' ')
}

function filterInvalidBasketItems(basketItem: IBasketItem): boolean {
  if (basketItem.amount <= 0) {
    return false
  }

  return true
}

const calculateBasketPrice = (amount: number, price: number): number => amount * price

const calculateSubTotal = (arr: Array<IBasketItem>): number =>
  arr
    .filter(filterInvalidBasketItems)
    .map((b) => calculateBasketPrice(b.amount, b.price))
    .reduce((subTotal, itemAmount) => subTotal + itemAmount)

const calculateFinalAmount = (subTotal: number, discounts: Array<number>): number =>
  Math.max(
    0,
    discounts.reduce((remainder, discount) => remainder - discount, subTotal),
  )

const toValidCurrency = (n: number): string => `£${Math.abs(n).toFixed(2)}`

export const Receipt: React.FC<IReceipt> = ({ basketItems, specialOffers }) => {
  const filteredBasketItems: Array<IBasketItem> = basketItems.filter(filterInvalidBasketItems)
  const filteredSpecialOffers: Array<ISpecialOffer> = specialOffers.filter(
    (s) => s.overallDiscount > 0,
  )

  const subTotal: number = calculateSubTotal(basketItems)
  const finalAmount: number = calculateFinalAmount(
    subTotal,
    filteredSpecialOffers.map((s) => s.overallDiscount),
  )

  const basketItemsString: Array<string> = filteredBasketItems.map(
    (b) => `${b.amount}x ${b.type}: ${toValidCurrency(calculateBasketPrice(b.amount, b.price))}`,
  )
  const subTotalStr = `Sub Total: ${toValidCurrency(subTotal)}`
  const specialOffersStr = filteredSpecialOffers.map(
    (s) => `${s.name} -${toValidCurrency(s.overallDiscount)}`,
  )
  const finalAmountStr = `Final: ${toValidCurrency(finalAmount)}`

  return (
    <Receipt__Container>
      <Receipt__List items={basketItemsString} />
      <Receipt__Divider />
      <Receipt__SubTotalAndDiscounts subTotal={subTotalStr} discounts={specialOffersStr} />
      <Receipt__Divider />
      <Receipt_FinalAmount finalAmount={finalAmountStr} />
    </Receipt__Container>
  )
}

export const Receipt__Container: React.FC<IRecieptContainer> = ({ className, children }) => (
  <div className={combineClassNames(className, styles.receiptContainer)}>
    <h2 className={styles.receiptHeader}>Receipt</h2>
    {children}
  </div>
)

export const Receipt__List: React.FC<IRecieptList> = ({ className, items }) => (
  <ul className={combineClassNames(className, styles.receiptListContainer)}>
    {items.map((item, idx) => (
      <li key={idx} className={styles.receiptListItem}>
        {item}
      </li>
    ))}
  </ul>
)

export const Receipt__Divider: React.FC = () => <hr />

export const Receipt__SubTotalAndDiscounts: React.FC<IRecieptListSubTotalAndDiscounts> = ({
  subTotal,
  discounts = [],
}) => {
  const subTotalStrikeThroughClassName =
    discounts.length > 0 ? styles['receiptListContainer--subtotalWithDiscounts'] : ''

  return (
    <Receipt__List items={[subTotal, ...discounts]} className={subTotalStrikeThroughClassName} />
  )
}

export const Receipt_FinalAmount: React.FC<IReceiptFnalAmount> = ({ finalAmount }) => (
  <Receipt__List items={[finalAmount]} className={styles['receiptListContainer--finalAmount']} />
)

export default Receipt
