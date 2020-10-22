### Default Component

```tsx
import Receipt from './Receipt'
import ShoppingCartProvider, { useCartItemAmountState } from 'root/context/ShoppingCartContext'
import { CartItemType } from 'root/utils/specialOffers'
// Test Purposes = Dummy component that updates the context
const DummyComponent = () => {
  const [butter, setButter] = useCartItemAmountState(CartItemType.Butter)
  React.useEffect(() => setButter(5), [])
  return null
}
;<ShoppingCartProvider>
  <DummyComponent />
  <Receipt />
</ShoppingCartProvider>
```

### Receipt Container

```tsx
import { Receipt__Container } from './Receipt'
;<Receipt__Container children={<div style={{ width: '100px', height: '100px' }} />} />
```

### Receipt With Prices

```tsx
import { Receipt__Container, Receipt__List } from './Receipt'

const items = [
  { name: 'Positive Number', price: 5.2 },
  { name: 'Negative Number', price: -3.2 },
]

;<Receipt__Container>
  <Receipt__List items={items} />
</Receipt__Container>
```

### Receipt SubTotal; Discounts; Final amount

```tsx
import {
  Receipt__Container,
  Receipt__SubTotalAndDiscounts,
  Receipt__Divider,
  Receipt_FinalAmount,
} from './Receipt'
const subTotal = 10.6
const discounts = [{ discountName: 'Test Discount', amountSaved: 0.5 }]
const finalAmount = subTotal - 0.5
;<Receipt__Container>
  <Receipt__SubTotalAndDiscounts subTotal={subTotal} discounts={discounts} />
  <hr />
  <Receipt_FinalAmount finalAmount={finalAmount} />
</Receipt__Container>
```
